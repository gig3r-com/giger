import { useDispatch, useSelector } from 'react-redux';
import {
    EventRecordType,
    ICriminalEvent,
    IMedEvent
} from '../../../models/events';
import { useApiService } from '../../../shared/services/api.service';
import {
    selectCriminalEvents,
    selectMedicalEvents
} from '../../../store/events.selectors';
import { useUserService } from '../../../shared/services/user.service';
import { setEvents } from '../../../store/events.slice';
import { useCallback } from 'react';

export const useEventRecordService = () => {
    const dispatch = useDispatch();
    const { api } = useApiService();
    const { currentUser } = useUserService();
    const criminalEvents = useSelector(selectCriminalEvents);
    const medicalEvents = useSelector(selectMedicalEvents);

    const getEvents = useCallback((type: EventRecordType) => {
        switch (type) {
            case EventRecordType.CRIMINAL:
                return criminalEvents;
            case EventRecordType.MEDICAL:
                return medicalEvents;
            default:
                return [];
        }
    }, [criminalEvents, medicalEvents]);

    const fetchEvents = async (type: EventRecordType) => {
        if (!currentUser) return;

        switch (type) {
            case EventRecordType.CRIMINAL:
                api.get(`User/${currentUser.id}/criminalEvents`)
                    .json<ICriminalEvent[]>()
                    .then((events) => {
                        dispatch(setEvents({ type, events }));
                    });
                break;
            case EventRecordType.MEDICAL:
                api.get(`User/${currentUser.id}/medicalEvents`)
                    .json<IMedEvent[]>()
                    .then((events) => {
                        dispatch(setEvents({ type, events }));
                    });
                break;
        }
    };

    return {
        getEvents,
        fetchEvents
    };
};
