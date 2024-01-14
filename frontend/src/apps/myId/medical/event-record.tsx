import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Controls } from '../../../shared/components/controls/controls';
import { useUserService } from '../../../shared/services/user.service';
import {
    CriminalEventType,
    EventType,
    IEventRecord,
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
    const [eventRecord, setEventRecord] =
        useState<IEventRecord<EventType> | null>(null);
    const { getEventRecordForUser, addEvent } = useEventsService();
    const { currentUser, isAdmin } = useUserService();

    const onAddEntry = (name: string, year: number) => {
        if (!currentUser || !eventRecord) return;

        const newEntry: EventType = {
            userId: currentUser.id,
            id: v4(),
            timestamp: dayjs().set('year', year).toISOString(),
            name,
            status: EventStatus.HISTORICAL,
            type:
                type === 'medical'
                    ? MedicalEventType.MEDICAL_PROCEDURE
                    : CriminalEventType.SUSPECT,
            eventDescription: ''
        };

        addEvent(currentUser.id, newEntry, type);
    };

    const getEventList = () => {
        return type === 'medical' ? medicalLists : criminalLists;
    };

    useEffect(
        function fetchEventRecord() {
            currentUser &&
                getEventRecordForUser(currentUser.id, type).then((res) => {
                    setEventRecord(res);
                });
        },
        [currentUser]
    );

    return (
        <>
            <Controls />
            <div className="event-record">
                {getEventList().map((section) => (
                    <section
                        className="event-record__section"
                        key={section.name}
                    >
                        <span className="event-record__header">
                            {intl.formatMessage({ id: section.msgId })}:
                        </span>
                        <ol className="event-record__list">
                            {eventRecord?.entries
                                .filter((event) => event.type === section.name)
                                .map((entry) => (
                                    <li
                                        className="event-record__entry"
                                        key={entry.id}
                                    >
                                        <EventEntry entry={entry} type={type} />
                                    </li>
                                ))}
                            {isAdmin && (
                                <li className="event-record__entry event-record__entry--new">
                                    <NewEntry
                                        onAdd={(name, year) =>
                                            onAddEntry(name, year)
                                        }
                                    />
                                </li>
                            )}
                        </ol>
                    </section>
                ))}
            </div>
        </>
    );
};
