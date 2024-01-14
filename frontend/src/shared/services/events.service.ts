import { useSelector } from 'react-redux';
import { mockMedicalHistory } from '../../mocks/medical';
import {
    IMedEvent,
    ICriminalEvent,
    EventRecordType,
    EventType,
    IEventRecord
} from '../../models/events';
import { RootState } from '../../store/store';
import { mockCriminalRecord } from '../../mocks/criminal';

export const useEventsService = () => {
    const userList = useSelector((state: RootState) => state.users.users);
    const updateEvent: (
        userId: string,
        eventId: string,
        type: EventRecordType,
        updateData: Partial<EventType>
    ) => void = async (userId, eventId, type, updateData) => {
        const user = userList.find((user) => user.id === userId);

        if (!user) {
            throw new Error('User not found');
        }

        const eventRecord = await getEventRecordForUser(userId, type);
        const eventIndex = eventRecord.entries.findIndex(
            (event) => event.id === eventId
        );

        if (!eventIndex === undefined) {
            throw new Error('Medical entry not found');
        }

        eventRecord.entries.splice(eventIndex, 1, {
            ...eventRecord.entries[eventIndex],
            ...updateData
        });
    };

    const addEvent: (
        userId: string,
        event: IMedEvent | ICriminalEvent,
        type: EventRecordType
    ) => void = async (userId, event, type) => {
        const user = userList.find((user) => user.id === userId);
        const eventRecord = await getEventRecordForUser(userId, type);

        if (!user) {
            throw new Error('User not found');
        }

        eventRecord.entries.push(event);
    };

    const getEventRecordForUser: (
        userId: string,
        type: EventRecordType
    ) => Promise<IEventRecord<EventType>> = (
        userId: string,
        type: EventRecordType
    ) =>
        new Promise<IEventRecord<EventType>>((resolve, reject) => {
            const user = userList.find((user) => user.id === userId);

            if (!user) {
                reject('User not found');
            }

            if (type === EventRecordType.MEDICAL) {
                resolve(mockMedicalHistory(userId) as IEventRecord<IMedEvent>);
            }

            if (type === EventRecordType.CRIMINAL) {
                resolve(
                    mockCriminalRecord(userId) as IEventRecord<ICriminalEvent>
                );
            }

            reject('Invalid event record type');
        });

    return {
        getEventRecordForUser,
        updateEvent,
        addEvent
    };
};
