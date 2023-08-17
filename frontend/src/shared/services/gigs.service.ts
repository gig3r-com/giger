import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GigStatus, IDraftGig, IGig } from '../../models/gig';
import { setGigs } from '../../store/gigs.slice';
import { RootState } from '../../store/store';
import { mockGigs } from '../../mocks/gigs';
import { useAuthenticationService } from './authentication.service';
import { useMessagesService } from './messages.service';

/**
 * TODO: connect it to the backend.
 */
export function useGigsService() {
    const dispatch = useDispatch();
    const { currentUser } = useAuthenticationService();
    const { createConvo, createMessage } = useMessagesService();
    const currentGigs = useSelector((state: RootState) => state.gigs.gigs);
    const [fetchingGigs, setFetchingGigs] = useState(false);

    const constructGig: (draftGig: IDraftGig) => IGig = (draftGig) => ({
        title: draftGig.title,
        category: draftGig.category,
        description: draftGig.description,
        payout: draftGig.payout,
        convo: createConvo(createMessage(draftGig.message), currentUser().id, [currentUser()]),
        id: uuidv4(),
        author: currentUser(),
        status: GigStatus.PENDING
    })

    const addNewGig = (gig: IDraftGig) => {
        dispatch(setGigs([...currentGigs, constructGig(gig)]));
    };

    const updateGig = (updatedGig: IGig) => {
        const updatedGigs = currentGigs.filter(gig => gig.id !== updatedGig.id);
        updatedGigs.push(updatedGig);
        dispatch(setGigs(updatedGigs));
    }

    const fetchGigs = () => {
        setFetchingGigs(true);
        dispatch(setGigs(mockGigs));
        setFetchingGigs(false);
    };

    return { addNewGig, updateGig, fetchGigs, fetchingGigs };
}
