import { useSelector } from 'react-redux';
import { mockMedicalHistory } from '../../mocks/medical';
import { IMedEvent, IMedHistory } from '../../models/medical';
import { RootState } from '../../store/store';

export const useMedicalService = () => {
    const userList = useSelector((state: RootState) => state.users.users);
    const updateMedEvent = (
        userId: string,
        medEntryId: string,
        updateData: Partial<IMedEvent>
    ) => {
        const user = userList.find((user) => user.id === userId);

        if (!user) {
            throw new Error('User not found');
        }

        const medHistory = mockMedicalHistory(userId);
        const medEntryIndex = medHistory.medEvents.findIndex(
            (medEntry) => medEntry.id === medEntryId
        );

        if (!medEntryIndex === undefined) {
            throw new Error('Medical entry not found');
        }

        medHistory.medEvents.splice(medEntryIndex, 1,{
            ...medHistory.medEvents[medEntryIndex],
            ...updateData
        });
    };

    const addMedEvent = (userId: string, medEvent: IMedEvent) => {
        const user = userList.find((user) => user.id === userId);

        if (!user) {
            throw new Error('User not found');
        }

        const medHistory = mockMedicalHistory(userId);

        medHistory.medEvents.push(medEvent);
    };

    const getMedicalHistoryForUser = (userId: string) =>
        new Promise<IMedHistory>((resolve, reject) => {
            const user = userList.find((user) => user.id === userId);

            if (!user) {
                reject('User not found');
            }

            resolve(mockMedicalHistory(userId));
        });

    return {
        getMedicalHistoryForUser,
        updateMedEvent,
        addMedEvent
    };
};
