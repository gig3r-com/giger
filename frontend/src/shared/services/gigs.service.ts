import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import {
    GigModes,
    GigRepuationLevels,
    GigStatus,
    IDraftGig,
    IGig,
    reputationBrackets
} from '../../models/gig';
import { removeGig, setFetchingGigs, setGigs } from '../../store/gigs.slice';
import { RootState } from '../../store/store';
import { useToastService } from './toast.service';
import { useUserService } from './user.service';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ActionId } from '../../apps/giger/gig/button-definitions';
import { useApiService } from './api.service';
import { useBankingService } from './banking.service';
import { AccountType } from '../../models/banking';
import { selectStatusHashes } from '../../store/gigs.selectors';

export function useGigsService() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { api, logout } = useApiService();
    const { accounts } = useBankingService();
    const { currentUser } = useUserService();
    const currentGigs = useSelector((state: RootState) => state.gigs.gigs);
    const gigStatusHashes = useSelector(selectStatusHashes);
    const selectedCategories = useSelector(
        (state: RootState) => state.gigs.selectedCategories
    );
    const selectedMode = useSelector(
        (state: RootState) => state.gigs.selectedMode
    );
    const intl = useIntl();
    const { displayToast } = useToastService();
    const gigerCommission = 0.2;

    const constructGig: (draftGig: IDraftGig) => IGig = (draftGig) => {
        const accountNo =
            draftGig.fromAccount === AccountType.PRIVATE
                ? accounts.private?.accountNumber
                : accounts.business?.accountNumber;

        return {
            ...draftGig,
            ...(draftGig.mode === GigModes.PROVIDER
                ? { providerAccountNumber: accountNo }
                : {}),
            ...(draftGig.mode === GigModes.CLIENT
                ? { clientAccountNumber: accountNo }
                : {}),
            createdAt: dayjs().add(100, 'years').toISOString(),
            authorId: currentUser!.id,
            status: GigStatus.AVAILABLE,
            isRevealed: true,
            isRevealedByClient: true,
            conversationId: ''
        };
    };

    /**
     * Creates a gig. Requires the user to have the amount of money set as payout + 20% commission for social network.
     * Takes the money from the user's account.
     * @param gig basic data required to create a gig
     */
    const addNewGig = async (gig: IDraftGig) => {
        const newGig = constructGig(gig);
        await api.url('Gig/create').post(newGig).res();
        await fetchGigs();
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

        const gigs = await api
            .get('Gig/get/all')
            .unauthorized(() => logout(currentUser!.handle))
            .json<IGig[]>();
        if (gigs.length === 0) {
            logout(currentUser!.handle);
        }
        dispatch(setGigs(gigs));
        setTimeout(() => setFetchingGigs(false), 25);
    };

    /**
     * Deletes a gig from the list of gigs. Refunds the money.
     * Only allowed for the user who posted the gig and only when the gig is available.
     * @param id gig id
     */
    const deleteGig = async (id: string) => {
        api.delete(`Gig/${id}/remove`)
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_DELETE_GIG' })
                )
            )
            .then(() => {
                dispatch(removeGig(id));
                displayToast(intl.formatMessage({ id: 'GIG_DELETED' }));
            });
    };

    /**
     * Accepts the gig and marks it as in progress.
     * @param id
     * @param asCompany - determines whether or not the user is accepting the gig as a company. in such case, payment originates or is routed to users' company account.
     */
    const acceptGig = async (id: string, asCompany: boolean) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = {
            ...gig!,
            status: GigStatus.IN_PROGRESS,
            takenById: currentUser?.id,
            ...(asCompany && { takenByCompany: currentUser?.faction })
        };

        await api
            .query({
                accountNo: asCompany
                    ? accounts.business?.accountNumber
                    : accounts.private?.accountNumber
            })
            .url(`Gig/${id}/accept/${currentUser?.id}`)
            .patch(updatedGig)
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                fetchGigs();
            });
    };

    const getReputationLevel = (creditValue: number): GigRepuationLevels => {
        let level = 0;
        reputationBrackets.forEach((value, key) => {
            if (creditValue >= value) {
                level = key;
            }
        });

        return level as GigRepuationLevels;
    };

    const canAcceptGig = (gig: IGig): boolean => {
        const userReputation = currentUser!.gigReputation[gig.category];
        const gigReputation = gig.reputationRequired.level;

        return userReputation >= gigReputation;
    };

    /**
     * Accept a gig as done from the perspective of the user who posted it.
     * Only available for the user who posted the gig, after the other party has marked it as done.
     * @param id gig id
     */
    const markAsDoneMine = async (id: string) => {
        await api
            .url(`Gig/${id}/complete`)
            .patch()
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                fetchGigs();
            });
    };

    /**
     * Mark a gig as done from the perspective of the user who took it.
     * Only available when the gig is in progress
     * @param id gig id
     */
    const markAsDoneTheirs = async (id: string) => {
        await api
            .url(`Gig/${id}/pending`)
            .patch()
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => {
                fetchGigs();
            });
    };

    /**
     * Report a problem with a gig. Starts a dispute process the admins will have to solve
     * @param id gig id
     */
    const reportAProblem = (id: string) => {
        navigate(`${id}/report-problem`);
    };

    const sendComplaint = async (gigId: string, complaint: string) => {
        await api
            .url(`Gig/${gigId}/dispute`)
            .headers({ 'Content-Type': 'application/json' })
            .body(JSON.stringify({ text: complaint }))
            .patch()
            .res()
            .then(() => {
                fetchGigs();
                navigate(`../giger/${gigId}`);
            });
    };

    /**
     * Marks the complaint as bullshit by giger admin and stops the dispute process.
     * Only available for admins.
     * @param id gig id
     */
    const markAsBullshit = async (id: string) => {
        await api
            .url(`Gig/${id}/resolve`)
            .query({ clerkAccountNo: currentUser?.id, isClientRight: false })
            .patch()
            .res()
            .then(() => fetchGigs());
    };

    /**
     * Marks the complaint as valid by giger admin and stops the dispute process.
     * The admin is rewarded with 15% of the gig's payout.
     * @param id gig id
     */
    const markAsValid = async (id: string) => {
        await api
            .url(`Gig/${id}/resolve`)
            .query({ clerkAccountNo: currentUser?.id, isClientRight: true })
            .patch()
            .res()
            .then(() => fetchGigs());
    };

    /**
     * Marks the gig as expired. only available to Game Masters in god mode.
     * Money is refunded.
     * @param id gig id
     */
    const setAsExpired = async (id: string) => {
        await api
            .url(`Gig/${id}/expire`)
            .patch()
            .res()
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'ERROR_FAILED_TO_UPDATE_GIG' })
                )
            )
            .then(() => fetchGigs());
    };

    const complete = async (id: string) => {
        await api
            .url(`Gig/${id}/complete`)
            .patch()
            .res()
            .then(() => {
                fetchGigs();
            });
    };

    const joinGigConvo = (id: string) => {
        api.url(`Gig/${id}/coversation/join`)
            .query({ userName: currentUser?.handle })
            .patch();
    };

    const handleButtonAction = async (id: string, actionId?: ActionId) => {
        switch (actionId) {
            case ActionId.MARK_AS_DONE_MINE:
                await markAsDoneMine(id);
                return;
            case ActionId.MARK_AS_DONE_THEIRS:
                await markAsDoneTheirs(id);
                return;
            case ActionId.REPORT_A_PROBLEM:
                reportAProblem(id);
                return;
            case ActionId.MARK_AS_BULLSHIT:
                await markAsBullshit(id);
                return;
            case ActionId.MARK_AS_VALID:
                await markAsValid(id);
                return;
            case ActionId.DELETE:
                await deleteGig(id);
                return;
            case ActionId.ACCEPT:
                await acceptGig(id, false);
                return;
            case ActionId.ACCEPT_AS_COMPANY:
                await acceptGig(id, true);
                break;
            case ActionId.MARK_AS_EXPIRED:
                await setAsExpired(id);
                return;
            case ActionId.COMPLETE:
                await complete(id);
                return;
        }
    };

    /**
     * determines whether the user is a provider or a client in the gig
     * @param gig - gig to check
     * @returns GigMode
     */
    const userGigMode = useCallback(
        (gig: IGig): GigModes => {
            const userIsAuthor = gig.authorId === currentUser?.id;

            if (userIsAuthor) {
                return gig.mode;
            }

            return gig.mode === GigModes.CLIENT
                ? GigModes.PROVIDER
                : GigModes.CLIENT;
        },
        [currentUser?.id]
    );

    const filteredGigs = useMemo(() => {
        return currentGigs.filter((gig) => {
            const categoryMatching =
                selectedCategories.includes(gig.category) ||
                selectedCategories.length === 0;
            const modeMatching =
                selectedMode === userGigMode(gig) || selectedMode === 'all';
            return categoryMatching && modeMatching;
        });
    }, [selectedCategories, selectedMode, userGigMode]);

    const isLocked = (gig: IGig) => {
        const userIsAuthor = gig.authorId === currentUser?.id;
        return userIsAuthor ? !gig.isRevealed : !gig.isRevealedByClient;
    };

    const hasStatusUpdate = (gigId: string) => {
        return (
            gigStatusHashes[gigId]?.lastSeen !== gigStatusHashes[gigId]?.current
        );
    };

    return {
        addNewGig,
        updateGig,
        fetchGigs,
        acceptGig,
        deleteGig,
        canAcceptGig,
        getReputationLevel,
        handleButtonAction,
        gigerCommission,
        sendComplaint,
        userGigMode,
        filteredGigs,
        joinGigConvo,
        isLocked,
        hasStatusUpdate,
        currentGigs
    };
}
