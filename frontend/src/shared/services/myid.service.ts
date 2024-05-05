import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../../store/users.slice';
import { RootState } from '../../store/store';
import { MyIdUncoverableSections } from '../../apps/myId/myid.model';
import {
    selectRelations,
    selectMeta,
    selectPrivateRecords,
    selectGoals,
    selectCriminalEvents,
    selectMedicalEvents
} from '../../store/events.selectors';
import { useApiService } from './api.service';

export function useMyIdService() {
    const dispatch = useDispatch();
    const { api } = useApiService();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const relations = useSelector(selectRelations);
    const metas = useSelector(selectMeta);
    const privateRecords = useSelector(selectPrivateRecords);
    const goals = useSelector(selectGoals);
    const criminalEvents = useSelector(selectCriminalEvents);
    const medicalEvents = useSelector(selectMedicalEvents);

    const enterRevealCode = (code: string): Promise<'success' | 'wrongCode'> =>
        new Promise((resolve) => {
            const currentRevealCodes = currentUser?.revealCodes ?? [];

            api.url('Reveal/code')
                .query({ revealCode: code })
                .patch()
                .res()
                .then(() => {
                    dispatch(
                        updateCurrentUser({
                            revealCodes: [...currentRevealCodes, code]
                        })
                    );
                    resolve('success');
                })
                .catch(() => resolve('wrongCode'));
        });

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
    };

    return {
        enterRevealCode,
        hasNewEntries
    };
}
