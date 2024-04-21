import { cloneDeep } from 'lodash-es';
import {
    IMedEvent,
    ICriminalEvent,
    EventRecordType,
    EventType
} from '../../models/events';
import { useUserService } from './user.service';
import { useDispatch } from 'react-redux';
import { addEvent, addRecord, updateEvent } from '../../store/users.slice';
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
    const { currentUser, updateUserData } = useUserService();

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
    };

    const addMeta = (type: MetaTypes, description: string): void => {
        const record: IMeta = {
            id: v4(),
            type,
            description,
            recordType: UserRecordTypes.META
        };
        //! API CALL
        dispatch(addRecord({ type: record.recordType, record }));
    };

    const addGoal = (title: string, description: string): void => {
        const record: IGoal = {
            id: v4(),
            title,
            description,
            recordType: UserRecordTypes.GOAL
        };
        //! API CALL
        dispatch(addRecord({ type: record.recordType, record }));
    };

    const getEventRecordForUser = (type: EventRecordType): EventType[] => {
        const revealCodes = currentUser?.revealCodes;
        let record: EventType[] = [];
        if (!currentUser) {
            throw new Error('User not found');
        }

        if (type === EventRecordType.MEDICAL) {
            record = currentUser?.medHistory as IMedEvent[];
        }

        if (type === EventRecordType.CRIMINAL) {
            record = currentUser?.criminalRecord as ICriminalEvent[];
        }

        return record.filter((entry) => {
            if (!entry.revealCode) return true;
            return revealCodes?.includes(entry.revealCode);
        });
    };

    const updateRelation = (
        relationId: string,
        relationTo: string,
        description: string
    ): void => {
        const relations = cloneDeep(currentUser?.relations);
        const relation = {
            ...relations?.find((record) => record.id === relationId)
        } as IRelation;

        if (!relation) {
            throw new Error('Relation not found');
        }

        relation.relationTo = relationTo;
        relation.description = description;

        //! API CALL
        updateUserData(currentUser!.id, { relations });
    };

    const updateMeta = (
        metaId: string,
        metaType: MetaTypes,
        description: string
    ): void => {
        const metas = cloneDeep(currentUser?.meta);
        const meta = {
            ...metas?.find((entry) => entry.id === metaId)
        } as IMeta;

        if (!meta) {
            throw new Error('Meta entry not found');
        }

        meta.type = metaType;
        meta.description = description;

        //! API CALL
        updateUserData(currentUser!.id, { meta: metas });
    };

    const updateGoal = (
        goalId: string,
        title: string,
        description: string
    ): void => {
        const goals = cloneDeep(currentUser?.goals);
        const goal = {
            ...goals?.find((entry) => entry.id === goalId)
        } as IGoal;

        if (!goal) {
            throw new Error('Goal not found');
        }

        goal.title = title;
        goal.description = description;

        //! API CALL
        updateUserData(currentUser!.id, { goals });
    };

    const updatePrivateRecord = (
        recordId: string,
        title: string,
        description: string
    ): void => {
        const records = cloneDeep(currentUser?.privateRecords);
        const record = {
            ...records?.find((entry) => entry.id === recordId)
        } as IGoal;

        if (!record) {
            throw new Error('Goal not found');
        }

        record.title = title;
        record.description = description;

        //! API CALL
        updateUserData(currentUser!.id, { privateRecords: records });
    };

    return {
        getEventRecordForUser,
        updateUserEvent,
        addUserEvent,
        removeEvent,
        addRelation,
        addPrivateRecord,
        addMeta,
        addGoal,
        updateRelation,
        updateMeta,
        updateGoal,
        updatePrivateRecord
    };
};
