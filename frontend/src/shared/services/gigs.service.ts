import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';
import {
    GigRepuationLevels,
    GigStatus,
    IDraftGig,
    IGig,
    reputationBrackets
} from '../../models/gig';
import { setFetchingGigs, setGigs } from '../../store/gigs.slice';
import { RootState } from '../../store/store';
import { mockGigs } from '../../mocks/gigs';
import { useMessagesService } from './messages.service';
import { useNotificationsService } from './notifications.service';
import { useUserService } from './user.service';
import dayjs from 'dayjs';
import { useMemo } from 'react';

/**
 * TODO: connect it to the backend.
 */
export function useGigsService() {
    const dispatch = useDispatch();
    const { currentUser, updateUserData } = useUserService();
    const { createConvo, createMessage } = useMessagesService();
    const currentGigs = useSelector((state: RootState) => state.gigs.gigs);
    const intl = useIntl();
    const { displayToast } = useNotificationsService();
    const gigerCommission = 0.2;

    const constructGig: (draftGig: IDraftGig) => IGig = (draftGig) => ({
        ...draftGig,
        createdAt: dayjs().toISOString(),
        convo: createConvo(
            [currentUser!.id],
            createMessage(draftGig.message),
            draftGig.id
        ),
        authorId: currentUser!.id,
        status: GigStatus.AVAILABLE
    });

    /**
     * Creates a gig. Requires the user to have the amount of money set as payout + 20% commission for social network.
     * Takes the money from the user's account.
     * @param gig basic data required to create a gig
     */
    const addNewGig = (gig: IDraftGig) => {
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

    const fetchGigs = () => {
        dispatch(setFetchingGigs(true));
        dispatch(setGigs(mockGigs));
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
     */
    const acceptGig = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.IN_PROGRESS };

        // ! API CALL REQUIRED
        updateGig(updatedGig);
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

        // ! API CALL REQUIRED
        updateGig(updatedGig);
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

        // ! API CALL REQUIRED
        updateGig(updatedGig);
    };

    /**
     * Report a problem with a gig. Starts a dispute process the admins will have to solve
     * @param id gig id
     */
    const reportAProblem = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = {
            ...gig!,
            status: GigStatus.DISPUTE,
            markedAsComplaintAt: dayjs().toISOString()
        };

        // ! API CALL REQUIRED
        updateGig(updatedGig);
    };

    /**
     * Marks the complaint as bullshit by giger admin and stops the dispute process.
     * Only available for admins. 
     * @param id gig id
     */
    const markAsBullshit = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.COMPLETED };

        // ! API CALL REQUIRED
        updateGig(updatedGig);
    };

    /**
     * Marks the complaint as valid by giger admin and stops the dispute process.
     * The admin is rewarded with 15% of the gig's payout.
     * @param id gig id
     */
    const markAsValid = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.COMPLETED };

        // ! API CALL REQUIRED
        updateGig(updatedGig);
    };

    /**
     * Marks the gig as expired. only available to Game Masters in god mode.
     * Money is refunded.
     * @param id gig id
     */
    const setAsExpired = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.EXPIRED };

        // ! API CALL REQUIRED
        updateGig(updatedGig);
    };

    const handleButtonAction = (id: string, actionId?: string) => {
        switch (actionId) {
            case 'MARK_AS_DONE_MINE':
                markAsDoneMine(id);
                break;
            case 'MARK_AS_DONE_THEIRS':
                markAsDoneTheirs(id);
                break;
            case 'REPORT_A_PROBLEM':
                reportAProblem(id);
                break;
            case 'MARK_AS_BULLSHIT':
                markAsBullshit(id);
                break;
            case 'MARK_AS_VALID':
                markAsValid(id);
                break;
            case 'DELETE':
                deleteGig(id);
                break;
            case 'ACCEPT':
                acceptGig(id);
                break;
            case 'SET_AS_EXPIRED':
                setAsExpired(id);
                break;
        }
    };

    const gigsVisibleToTheUser = useMemo(() => currentGigs.filter((gig) => {
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
    }), [currentGigs, currentUser]);

    return {
        addNewGig,
        updateGig,
        fetchGigs,
        acceptGig,
        deleteGig,
        getReputationLevel,
        handleButtonAction,
        gigerCommission,
        gigsVisibleToTheUser
    };
}
