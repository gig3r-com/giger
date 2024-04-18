import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useUserService } from '../../../shared/services/user.service';
import {
    CriminalEventType,
    EventType,
    MedicalEventType
} from '../../../models/events';
import { criminalLists, medicalLists } from './event-lists';
import { NewEntry } from './new-entry/new-entry';
import { useEventsService } from '../../../shared/services/events.service';
import { EventRecordType, EventStatus } from '../../../models/events';
import { EventEntry } from './entry/event-entry';

import './event-record.scss';

/**
 * A component that displays the event history of the user.
 * Supports both medical and criminal events.
 * Allows editing in admin mode
 */
export const EventRecord: FC<{ type: EventRecordType }> = ({ type }) => {
    const intl = useIntl();
    const { getEventRecordForUser, addEvent } = useEventsService();
    const { currentUser, isGod } = useUserService();

    const onAddEntry = (
        name: string,
        year: number,
        entryType: MedicalEventType | CriminalEventType
    ) => {
        if (!currentUser) return;

        const newEntry: EventType = {
            id: v4(),
            timestamp: dayjs().set('year', year).toISOString(),
            name,
            status: EventStatus.HISTORICAL,
            type: entryType,
            eventDescription: ''
        };

        addEvent(newEntry, type);
    };

    const getEventList = () => {
        return type === 'medical' ? medicalLists : criminalLists;
    };

    const eventRecord = useMemo(() => {
        return currentUser && getEventRecordForUser(type);
    }, [currentUser]);

    return (
        <motion.div
            key="event-record"
            className="event-record"
        >
            {getEventList().map((section) => (
                <section className="event-record__section" key={section.name}>
                    <span className="event-record__header">
                        {intl.formatMessage({ id: section.msgId })}:
                    </span>
                    <ol className="event-record__list">
                        {eventRecord &&
                            eventRecord
                                .filter((event) => event.type === section.name)
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
                                    onAdd={(name, year) =>
                                        onAddEntry(name, year, section.name)
                                    }
                                />
                            </li>
                        )}
                    </ol>
                </section>
            ))}
        </motion.div>
    );
};
