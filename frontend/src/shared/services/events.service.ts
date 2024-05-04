import {
    IMedEvent,
    ICriminalEvent,
    EventRecordType,
    EventType
} from '../../models/events';
import { useUserService } from './user.service';
import { useDispatch, useSelector } from 'react-redux';
import {
    IGoal,
    IMeta,
    IPrivateRecord,
    IRelation,
    MetaTypes,
    UserRecordTypes
} from '../../models/user';
import { v4 } from 'uuid';
import { useApiService } from './api.service';
import { useNotificationsService } from './notifications.service';
import { useIntl } from 'react-intl';
import {
    addEvent,
    addRecord,
    updateEvent,
    updateRecord
} from '../../store/events.slice';
import {
    selectRelations,
    selectMeta,
    selectPrivateRecords,
    selectGoals,
    selectCriminalEvents,
    selectMedicalEvents
} from '../../store/events.selectors';

export const useEventsService = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const { api } = useApiService();
    const { displayToast } = useNotificationsService();
    const { currentUser } = useUserService();
    const relations = useSelector(selectRelations);
    const metas = useSelector(selectMeta);
    const privateRecords = useSelector(selectPrivateRecords);
    const goals = useSelector(selectGoals);
    const criminalEvents = useSelector(selectCriminalEvents);
    const medicalEvents = useSelector(selectMedicalEvents);

    function updateUserEvent(
        eventId: string,
        type: EventRecordType,
        updateData: Partial<EventType>
    ): void {
        if (!currentUser) {
            throw new Error('User not found');
        }

        const url =
            type === EventRecordType.MEDICAL
                ? `User/${currentUser?.id}/medicalEvents`
                : `User/${currentUser?.id}/criminalEvents`;
        const event = getEventRecordForUser(type).find(
            (ev) => ev.id === eventId
        );

        if (!event === undefined) {
            throw new Error('entry not found');
        }

        api.url(url)
            .patch({ ...event, updateData })
            .res()
            .then(() => dispatch(updateEvent({ type, eventId, updateData })))
            .catch(() =>
                displayToast(intl.formatMessage({ id: 'ERROR_EVENT_UPDATE' }))
            );
    }

    const addUserEvent: (
        event: IMedEvent | ICriminalEvent,
        type: EventRecordType
    ) => void = async (event, type) => {
        if (!currentUser) {
            throw new Error('User not found');
        }

        const url =
            type === EventRecordType.MEDICAL
                ? `User/${currentUser?.id}/medicalEvents`
                : `User/${currentUser?.id}/criminalEvents`;

        api.url(url)
            .put(event)
            .res()
            .then(() => dispatch(addEvent({ event, type })))
            .catch(() =>
                displayToast(intl.formatMessage({ id: 'ERROR_EVENT_CREATION' }))
            );
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
            throw new Error('Event not found');
        }

        eventRecord.splice(eventIndex, 1);
        api.url(
            `User/${currentUser.id}/${type === EventRecordType.CRIMINAL ? 'criminalEvents' : 'medicalEvents'}/${eventId}`
        ).delete();
    };

    const addRelation = (relationToId: string, description: string): void => {
        const record: IRelation = {
            id: v4(),
            relationTo: relationToId,
            description,
            recordType: UserRecordTypes.RELATION
        };
        api.url(`User/${currentUser?.id}/relations`)
            .put(record)
            .res()
            .then(() => {
                dispatch(addRecord({ type: record.recordType, record }));
            });
    };

    const addPrivateRecord = (title: string, description: string): void => {
        const record: IPrivateRecord = {
            id: v4(),
            title,
            description,
            recordType: UserRecordTypes.PRIVATE_RECORD
        };
        api.url(`User/${currentUser?.id}/privateRecords`)
            .put(record)
            .res()
            .then(() => {
                dispatch(addRecord({ type: record.recordType, record }));
            });
    };

    const addMeta = (type: MetaTypes, description: string): void => {
        const record: IMeta = {
            id: v4(),
            type,
            description,
            recordType: UserRecordTypes.META
        };

        api.url(`User/${currentUser?.id}/metas`)
            .put(record)
            .res()
            .then(() => {
                dispatch(addRecord({ type: record.recordType, record }));
            });
    };

    const addGoal = (title: string, description: string): void => {
        const record: IGoal = {
            id: v4(),
            title,
            description,
            recordType: UserRecordTypes.GOAL
        };
        api.url(`User/${currentUser?.id}/goals`)
            .put(record)
            .res()
            .then(() => {
                dispatch(addRecord({ type: record.recordType, record }));
            });
    };

    const getEventRecordForUser = (type: EventRecordType): EventType[] => {
        const revealCodes = currentUser?.revealCodes;
        let record: EventType[] = [];
        if (!currentUser) {
            throw new Error('User not found');
        }

        if (type === EventRecordType.MEDICAL) {
            record = medicalEvents;
        }

        if (type === EventRecordType.CRIMINAL) {
            record = criminalEvents;
        }

        return record?.filter((entry) => {
            if (!entry.revealCode) return true;
            return revealCodes?.includes(entry.revealCode);
        });
    };

    const updateRelation = (
        relationId: string,
        relationTo: string,
        description: string
    ): void => {
        const relation = {
            ...relations.find((record) => record.id === relationId),
            relationTo: relationTo,
            description: description
        } as IRelation;

        if (!relation) {
            throw new Error('Relation not found');
        }

        api.url(`User/${currentUser?.id}/relations`)
            .patch(relation)
            .error(500, () =>
                displayToast(intl.formatMessage({ id: 'ERROR_UPDATE' }))
            )
            .res()
            .then(() => {
                updateRecord({
                    type: UserRecordTypes.RELATION,
                    recordId: relationId,
                    updateData: relation
                });
            });
    };

    const updateMeta = (
        metaId: string,
        metaType: MetaTypes,
        description: string
    ): void => {
        const meta = {
            ...metas.find((entry) => entry.id === metaId),
            type: metaType,
            description: description
        } as IMeta;

        if (!meta) {
            throw new Error('Meta entry not found');
        }

        api.url(`User/${currentUser?.id}/metas`)
            .patch(meta)
            .error(500, () =>
                displayToast(intl.formatMessage({ id: 'ERROR_UPDATE' }))
            )
            .res()
            .then(() => {
                updateRecord({
                    type: UserRecordTypes.RELATION,
                    recordId: metaId,
                    updateData: meta
                });
            });
    };

    const updateGoal = (
        goalId: string,
        title: string,
        description: string
    ): void => {
        const goal = {
            ...goals?.find((entry) => entry.id === goalId),
            title,
            description
        } as IGoal;

        if (!goal) {
            throw new Error('Goal not found');
        }

        api.url(`User/${currentUser?.id}/goals`)
            .patch(goal)
            .error(500, () =>
                displayToast(intl.formatMessage({ id: 'ERROR_UPDATE' }))
            )
            .res()
            .then(() => {
                updateRecord({
                    type: UserRecordTypes.RELATION,
                    recordId: goalId,
                    updateData: goal
                });
            });
    };

    const updatePrivateRecord = (
        recordId: string,
        title: string,
        description: string
    ): void => {
        const record = {
            ...privateRecords.find((entry) => entry.id === recordId),
            title,
            description
        } as IPrivateRecord;

        if (!record) {
            throw new Error('Goal not found');
        }

        api.url(`User/${currentUser?.id}/privateRecords`)
            .patch(privateRecords)
            .error(500, () =>
                displayToast(intl.formatMessage({ id: 'ERROR_UPDATE' }))
            )
            .res()
            .then(() => {
                updateRecord({
                    type: UserRecordTypes.RELATION,
                    recordId,
                    updateData: record
                });
            });
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
