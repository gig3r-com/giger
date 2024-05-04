import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../../store/users.slice';
import { RootState } from '../../store/store';
import { MyIdUncoverableSections } from '../../apps/myId/myid.model';
import { selectRelations, selectMeta, selectPrivateRecords, selectGoals, selectCriminalEvents, selectMedicalEvents } from '../../store/events.selectors';

export function useMyIdService() {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const relations = useSelector(selectRelations);
    const metas = useSelector(selectMeta);
    const privateRecords = useSelector(selectPrivateRecords);
    const goals = useSelector(selectGoals);
    const criminalEvents = useSelector(selectCriminalEvents);
    const medicalEvents = useSelector(selectMedicalEvents);

    const enterRevealCode = async (code: string): Promise<'success' | 'wrongCode'> => {
        const currentRevealCodes = currentUser?.revealCodes ?? [];

        //! API CALL

        dispatch(
            updateCurrentUser({
                revealCodes: [...currentRevealCodes, code]
            })
        );
        console.log(`Reveal code: ${code}`);

        // !MOCK
        if (code === 'TEST') {
            return 'success';
        }
        return 'wrongCode';
    };

    const hasNewEntries = (sectionType: MyIdUncoverableSections): boolean => {        
        switch (sectionType) {
            case MyIdUncoverableSections.MEDICAL:
                return medicalEvents.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.CRIMINAL:
                return criminalEvents.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.META:
                return metas.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.RELATIONS:
                return relations.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.PRIVATE_RECORDS:
                return privateRecords.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.GOALS:
                return goals.some((entry) => !entry.seen) ?? false;
            default:
                return false;
        }
    } 

    return {
        enterRevealCode,
        hasNewEntries
    };
}
