import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../../store/users.slice';
import { RootState } from '../../store/store';
import { MyIdUncoverableSections } from '../../apps/myId/myid.model';

export function useMyIdService() {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

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
                return currentUser?.medicalEvents?.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.CRIMINAL:
                return currentUser?.criminalEvents?.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.META:
                return currentUser?.meta?.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.RELATIONS:
                return currentUser?.relations?.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.PRIVATE_RECORDS:
                return currentUser?.privateRecords?.some((entry) => !entry.seen) ?? false;
            case MyIdUncoverableSections.GOALS:
                return currentUser?.goals?.some((entry) => !entry.seen) ?? false;
            default:
                return false;
        }
    } 

    return {
        enterRevealCode,
        hasNewEntries
    };
}
