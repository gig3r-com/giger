import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';
import { GigStatus, IDraftGig, IGig } from '../../models/gig';
import { setGigs } from '../../store/gigs.slice';
import { RootState } from '../../store/store';
import { mockGigs } from '../../mocks/gigs';
import { useMessagesService } from './messages.service';
import { useNotificationsService } from './notifications.service';
import { useUserService } from './user.service';

/**
 * TODO: connect it to the backend.
 */
export function useGigsService() {
    const dispatch = useDispatch();
    const { currentUser } = useUserService();
    const { createConvo, createMessage } = useMessagesService();
    const currentGigs = useSelector((state: RootState) => state.gigs.gigs);
    const [fetchingGigs, setFetchingGigs] = useState(false);
    const intl = useIntl();
    const { displayToast } = useNotificationsService();

    const constructGig: (draftGig: IDraftGig) => IGig = (draftGig) => ({
        title: draftGig.title,
        category: draftGig.category,
        description: draftGig.description,
        payout: draftGig.payout,
        reputationRequired: draftGig.reputationRequired,
        convo: createConvo(
            [currentUser!],
            createMessage(draftGig.message),
            draftGig.id
        ),
        id: uuidv4(),
        author: currentUser!,
        status: GigStatus.PENDING
    });

    const addNewGig = (gig: IDraftGig) => {
        dispatch(setGigs([...currentGigs, constructGig(gig)]));
    };

    const updateGig = (updatedGig: IGig) => {
        const updatedGigs = currentGigs.filter(
            (gig) => gig.id !== updatedGig.id
        );
        updatedGigs.push(updatedGig);
        dispatch(setGigs(updatedGigs));
    };

    const fetchGigs = () => {
        setFetchingGigs(true);
        dispatch(setGigs(mockGigs));
        setFetchingGigs(false);
    };

    const deleteGig = (id: string) => {
        const updatedGigs = currentGigs.filter((gig) => gig.id !== id);
        dispatch(setGigs(updatedGigs));
        displayToast(intl.formatMessage({ id: 'GIG_DELETED' }));
    };

    /**
     * should be handled entirely server-side later on. Frontend should not edit gigs directly.
     * @param id
     */
    const acceptGig = (id: string) => {
        const gig = currentGigs.find((gig) => gig.id === id);
        const updatedGig: IGig = { ...gig!, status: GigStatus.IN_PROGRESS };
        updateGig(updatedGig);
    };

    return { addNewGig, updateGig, fetchGigs, fetchingGigs, acceptGig, deleteGig };
}
