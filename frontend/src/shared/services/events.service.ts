import { cloneDeep } from 'lodash-es';
import {
    IMedEvent,
    ICriminalEvent,
    EventRecordType,
    EventType
} from '../../models/events';
import { useUserService } from './user.service';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../store/users.slice';
import { IUserPrivate } from '../../models/user';

export const useEventsService = () => {
    const dispatch = useDispatch();
    const { currentUser } = useUserService();

    function updateEvent(
        eventId: string,
        type: EventRecordType,
        updateData: Partial<EventType>
    ): void {
        if (!currentUser) {
            throw new Error('User not found');
        }

        const eventRecord = cloneDeep(getEventRecordForUser(type));
        const eventIndex = eventRecord.findIndex(
            (event) => event.id === eventId
        );

        if (!eventIndex === undefined) {
            throw new Error('entry not found');
        }

        eventRecord.splice(eventIndex, 1, {
            ...eventRecord[eventIndex],
            ...updateData
        });

        registerChanges(eventRecord, type);
    }

    const addEvent: (
        event: IMedEvent | ICriminalEvent,
        type: EventRecordType
    ) => void = async (event, type) => {
        const updatedRecord = cloneDeep(getEventRecordForUser(type));

        if (!currentUser) {
            throw new Error('User not found');
        }

        updatedRecord.push(event);
        registerChanges(updatedRecord, type);
    };

    const removeEvent: (
        eventId: string,
        type: EventRecordType
    ) => void = async (eventId, type) => {
        const eventRecord = await getEventRecordForUser(type);
        const eventIndex = eventRecord.findIndex(
            (event) => event.id === eventId
        );

        if (!currentUser) {
            throw new Error('User not found');
        }

        if (!eventIndex === undefined) {
            throw new Error('Medical entry not found');
        }

        eventRecord.splice(eventIndex, 1);
    };

    /**
     * registers the updated event record in redux as a change in current user data
     * @param updateData 
     * @param type 
     */
    const registerChanges = (
        updateData: EventType[],
        type: EventRecordType
    ): void => {
        let updatedRecord: Partial<
            Pick<IUserPrivate, 'medHistory' | 'criminalRecord'>
        >;
        if (type === EventRecordType.CRIMINAL) {
            updatedRecord = { criminalRecord: updateData as ICriminalEvent[] };
        }

        if (type === EventRecordType.MEDICAL) {
            updatedRecord = { medHistory: updateData as IMedEvent[] };
        }

        dispatch(updateCurrentUser(updatedRecord!));
    };

    const getEventRecordForUser = (type: EventRecordType): EventType[] => {
        if (!currentUser) {
            throw new Error('User not found');
        }

        if (type === EventRecordType.MEDICAL) {
            return currentUser?.medHistory as IMedEvent[];
        }

        if (type === EventRecordType.CRIMINAL) {
            return currentUser?.criminalRecord as ICriminalEvent[];
        }

        throw new Error('Invalid event record type');
    };

    return {
        getEventRecordForUser,
        updateEvent,
        addEvent,
        removeEvent
    };
};
