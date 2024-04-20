import { cloneDeep } from 'lodash-es';
import {
    IMedEvent,
    ICriminalEvent,
    EventRecordType,
    EventType
} from '../../models/events';
import { useUserService } from './user.service';
import { useDispatch } from 'react-redux';
import {
    addEvent,
    addRecord,
    updateEvent} from '../../store/users.slice';
import {
    IGoal,
    IMeta,
    IPrivateRecord,
    IRelation,
    MetaTypes,
    UserRecordTypes
} from '../../models/user';
import { v4 } from 'uuid';

export const useEventsService = () => {
    const dispatch = useDispatch();
    const { currentUser } = useUserService();

    function updateUserEvent(
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

        dispatch(updateEvent({ type, eventId, updateData }));
    }

    const addUserEvent: (
        event: IMedEvent | ICriminalEvent,
        type: EventRecordType
    ) => void = async (event, type) => {

        if (!currentUser) {
            throw new Error('User not found');
        }

        //! API CALL
        dispatch(addEvent({ event, type }));
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
        //! API CALL
    };

    const addRelation = (relationToId: string, description: string): void => {
        const record: IRelation = {
            id: v4(),
            relationTo: relationToId,
            description,
            recordType: UserRecordTypes.RELATION
        };
        //! API CALL
        dispatch(addRecord({ type: UserRecordTypes.RELATION, record }));
    };

    const addPrivateRecord = (title: string, description: string): void => {
        const record: IPrivateRecord = {
            id: v4(),
            title,
            description,
            recordType: UserRecordTypes.PRIVATE_RECORD
        };
        //! API CALL
        dispatch(addRecord({ type: record.recordType, record }));
    }

    const addMeta = (type: MetaTypes, description: string): void => {
        const record: IMeta = {
            id: v4(),
            type,
            description,
            recordType: UserRecordTypes.META
        };
        //! API CALL
        dispatch(addRecord({ type: record.recordType, record }));
    }

    const addGoal = (title: string, description: string): void => {
        const record: IGoal = {
            id: v4(),
            title,
            description,
            recordType: UserRecordTypes.GOAL
        };
        //! API CALL
        dispatch(addRecord({ type: record.recordType, record }));
    }

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
        updateUserEvent,
        addUserEvent,
        removeEvent,
        addRelation,
        addPrivateRecord,
        addMeta,
        addGoal
    };
};
