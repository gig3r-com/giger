import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';
import {
    GigModes,
    GigRepuationLevels,
    GigStatus,
    IDraftGig,
    IGig,
    reputationBrackets
} from '../../models/gig';
import { setFetchingGigs, setGigs } from '../../store/gigs.slice';
import { RootState } from '../../store/store';
import { useNotificationsService } from './notifications.service';
import { useUserService } from './user.service';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ActionId } from '../../apps/giger/gig/button-definitions';
import { useApiService } from './api.service';

/**
 * TODO: connect it to the backend.
 */
export function useGigsService() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { api } = useApiService();
    const { currentUser, updateUserData } = useUserService();
    const currentGigs = useSelector((state: RootState) => state.gigs.gigs);
    const selectedCategories = useSelector(
        (state: RootState) => state.gigs.selectedCategories
    );
    const selectedMode = useSelector(
        (state: RootState) => state.gigs.selectedMode
    );
    const intl = useIntl();
    const { displayToast } = useNotificationsService();
    const gigerCommission = 0.2;

    const constructGig: (draftGig: IDraftGig) => IGig = (draftGig) => ({
        ...draftGig,
        createdAt: dayjs().add(100, 'days').toISOString(),
        authorId: currentUser!.id,
        status: GigStatus.AVAILABLE
    });

    /**
     * Creates a gig. Requires the user to have the amount of money set as payout + 20% commission for social network.
     * Takes the money from the user's account.
     * @param gig basic data required to create a gig
     */
    const addNewGig = async (gig: IDraftGig) => {
        const newGig = constructGig(gig);
        await api
            .url('Gig/create')
            .query({ openingMessage: gig.message })
            .post(newGig)
            .res();
        dispatch(setGigs([...currentGigs, constructGig(gig)]));

        if (gig.anonymizedAuthor) {
            updateUserData(currentUser!.id, {
                aliasMap: {
                    ...currentUser!.aliasMap,
                    [gig!.id]: uuidv4().substring(0, 8)
                }
            });
        }
    };

    const updateGig = (updatedGig: IGig) => {
        const updatedGigs = currentGigs.filter(
            (gig) => gig.id !== updatedGig.id
        );
        updatedGigs.push(updatedGig);
        dispatch(setGigs(updatedGigs));
    };

    const fetchGigs = async () => {
        dispatch(setFetchingGigs(true));

        const gigs = await api.get('Gig/get/all').json<IGig[]>();
        dispatch(setGigs(gigs));
        setTimeout(() => setFetchingGigs(false), 25);
    };

    /**
     * Deletes a gig from the list of gigs. Refunds the money.
     * Only allowed for the user who posted the gig and only when the gig is available.
     * @param id gig id
     */
    const deleteGig = (id: string) => {
        const updatedGigs = currentGigs.filter((gig) => gig.id !== id);
        // ! API CALL REQUIRED
        dispatch(setGigs(updatedGigs));
        displayToast(intl.formatMessage({ id: 'GIG_DELETED' }));
    };

    /**
     * Accepts the gig and marks it as in progress.
     * @param id
     * @param asCompany - determines whether or not the user is accepting the gig as a company. in such case, payment originates or is routed to users' company account.
     */
    const acceptGig = (id: string, asCompany: boolean) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = {
            ...gig!,
            status: GigStatus.IN_PROGRESS,
            takenById: currentUser?.id,
            ...(asCompany && { takenByCompany: currentUser?.faction })
        };

        api.url('Gig/update')
            .put(updatedGig)
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                updateGig(updatedGig);
            });
    };

    const getReputationLevel = (creditValue: number): GigRepuationLevels => {
        reputationBrackets.forEach((value, key) => {
            if (creditValue >= value) {
                return key;
            }
        });

        return 5;
    };

    /**
     * Accept a gig as done from the perspective of the user who posted it.
     * Only available for the user who posted the gig, after the other party has marked it as done.
     * @param id gig id
     */
    const markAsDoneMine = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.COMPLETED };

        api.url(`Gig/${id}/complete`)
            .patch()
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                updateGig(updatedGig);
            });
    };

    /**
     * Mark a gig as done from the perspective of the user who took it.
     * Only available when the gig is in progress
     * @param id gig id
     */
    const markAsDoneTheirs = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = {
            ...gig!,
            status: GigStatus.PENDING_CONFIRMATION
        };

        setGigStatus(id, GigStatus.PENDING_CONFIRMATION)
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                updateGig(updatedGig);
            });
    };

    /**
     * Report a problem with a gig. Starts a dispute process the admins will have to solve
     * @param id gig id
     */
    const reportAProblem = (id: string) => {
        navigate(`report-problem/${id}`);
    };

    const sendComplaint = (gigId: string, complaint: string) => {
        const gig = currentGigs.find((gig) => gig.id === gigId);
        const updatedGig: IGig = {
            ...gig!,
            complaintReason: complaint,
            markedAsComplaintAt: dayjs().add(100, 'years').toISOString(),
            status: GigStatus.DISPUTE
        };

        // ! API CALL REQUIRED
        updateGig(updatedGig);
        navigate(`../${gigId}`);
    };

    /**
     * Marks the complaint as bullshit by giger admin and stops the dispute process.
     * Only available for admins.
     * @param id gig id
     */
    const markAsBullshit = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.COMPLETED };

        api.url(`Gig/${id}/resolve`)
            .query({ clerkAccountNo: currentUser?.id, isProviderRight: false })
            .patch()
            .res()
            .then(() => {
                updateGig(updatedGig);
            });
    };

    /**
     * Marks the complaint as valid by giger admin and stops the dispute process.
     * The admin is rewarded with 15% of the gig's payout.
     * @param id gig id
     */
    const markAsValid = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.COMPLETED };

        api.url(`Gig/${id}/resolve`)
            .query({ clerkAccountNo: currentUser?.id, isProviderRight: false })
            .patch()
            .res()
            .then(() => {
                updateGig(updatedGig);
            });
    };

    /**
     * Marks the gig as expired. only available to Game Masters in god mode.
     * Money is refunded.
     * @param id gig id
     */
    const setAsExpired = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.EXPIRED };

        setGigStatus(id, GigStatus.EXPIRED)
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                updateGig(updatedGig);
            });
    };

    const setGigStatus = async (id: string, status: GigStatus) => {
        await api.url(`Gig/${id}/status`).patch({ status }).res();
    };

    const joinGigConvo = (id: string) => {
        api.url(`Gig/${id}/coversation/join`)
            .query({ userName: currentUser?.handle })
            .patch();
    };

    const handleButtonAction = (id: string, actionId?: ActionId) => {
        switch (actionId) {
            case ActionId.MARK_AS_DONE_MINE:
                markAsDoneMine(id);
                break;
            case ActionId.MARK_AS_DONE_THEIRS:
                markAsDoneTheirs(id);
                break;
            case ActionId.REPORT_A_PROBLEM:
                reportAProblem(id);
                break;
            case ActionId.MARK_AS_BULLSHIT:
                markAsBullshit(id);
                break;
            case ActionId.MARK_AS_VALID:
                markAsValid(id);
                break;
            case ActionId.DELETE:
                deleteGig(id);
                break;
            case ActionId.ACCEPT:
                acceptGig(id, false);
                break;
            case ActionId.ACCEPT_AS_COMPANY:
                acceptGig(id, true);
                break;
            case ActionId.MARK_AS_EXPIRED:
                setAsExpired(id);
                break;
        }
    };

    const gigsVisibleToTheUser = useMemo(
        () =>
            currentGigs.filter((gig) => {
                const expiredButMine =
                    gig.status === GigStatus.EXPIRED &&
                    gig.authorId === currentUser?.id;
                const userIsSideInGig = [gig.authorId, gig.takenById].includes(
                    currentUser?.id
                );

                if (gig.status === GigStatus.AVAILABLE) {
                    return true;
                }

                if (expiredButMine) {
                    return true;
                }

                if (userIsSideInGig) {
                    return true;
                }

                return false;
            }),
        [currentGigs, currentUser]
    );

    /**
     * determines whether the user is a provider or a client in the gig
     * @param gig - gig to check
     * @returns GigMode
     */
    const userGigMode = useCallback(
        (gig: IGig): GigModes => {
            const userIsAuthor = gig.authorId === currentUser?.id;

            if (userIsAuthor) {
                return gig.modes;
            }

            return gig.modes === GigModes.CLIENT
                ? GigModes.PROVIDER
                : GigModes.CLIENT;
        },
        [currentUser?.id]
    );

    const filteredGigs = useMemo(() => {
        return gigsVisibleToTheUser.filter((gig) => {
            const categoryMatching =
                selectedCategories.includes(gig.category) ||
                selectedCategories.length === 0;
            const modeMatching =
                selectedMode === userGigMode(gig) || selectedMode === 'all';
            return categoryMatching && modeMatching;
        });
    }, [gigsVisibleToTheUser, selectedCategories, selectedMode, userGigMode]);

    return {
        addNewGig,
        updateGig,
        fetchGigs,
        acceptGig,
        deleteGig,
        getReputationLevel,
        handleButtonAction,
        gigerCommission,
        gigsVisibleToTheUser,
        sendComplaint,
        userGigMode,
        filteredGigs,
        joinGigConvo
    };
}
