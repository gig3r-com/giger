import { FC, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useUserService } from '../../../shared/services/user.service';
import { EventRecordType } from '../../../models/events';
import { criminalLists, medicalLists } from './event-lists';
import { NewEntry } from './new-entry/new-entry';
import { EventEntry } from './entry/event-entry';
import { useEventRecordService } from './event-record.service';

import './event-record.scss';

/**
 * A component that displays the event history of the user.
 * Supports both medical and criminal events.
 * Allows editing in god mode
 */
export const EventRecord: FC<{ type: EventRecordType }> = ({ type }) => {
    const intl = useIntl();
    const { getEvents, fetchEvents } = useEventRecordService();
    const { isGod } = useUserService();

    const getEventList = () => {
        return type === EventRecordType.MEDICAL ? medicalLists : criminalLists;
    };

    const events = useMemo(() => getEvents(type), [type, getEvents]);

    useEffect(function fetchData() {
        fetchEvents(type);
    }, []);

    return (
        <motion.div key="event-record" className="event-record">
            {getEventList().map((section) => (
                <section className="event-record__section" key={section.name}>
                    <span className="event-record__header">
                        {intl.formatMessage({ id: section.msgId })}:
                    </span>
                    <ol className="event-record__list">
                        {events
                            .filter((event) => event.type === section.name)
                            .sort((a, b) =>
                                dayjs(b.timeStamp).diff(a.timeStamp)
                            )
                            .map((entry) => (
                                <li
                                    className="event-record__entry"
                                    key={entry.id}
                                >
                                    <EventEntry entry={entry} type={type} />
                                </li>
                            ))}
                        {isGod && (
                            <li className="event-record__entry event-record__entry--new">
                                <NewEntry
                                    eventType={type}
                                    type={section.name}
                                />
                            </li>
                        )}
                    </ol>
                </section>
            ))}
        </motion.div>
    );
};
