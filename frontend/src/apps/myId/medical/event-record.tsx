import { FC, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useUserService } from '../../../shared/services/user.service';
import { EventRecordType } from '../../../models/events';
import { criminalLists, medicalLists } from './event-lists';
import { Controls } from '../../../shared/components/controls/controls';
import { SectionBody } from '../../../shared/components/section-body/section-body';
import { NewEntry } from './new-entry/new-entry';
import { EventEntry } from './entry/event-entry';
import { useEventRecordService } from './event-record.service';

import './event-record.scss';
import { LockedEntry } from '../../../shared/components/locked-entry/locked-entry';

/**
 * A component that displays the event history of the user.
 * Supports both medical and criminal events.
 * Allows editing in god mode
 */
export const EventRecord: FC<{ type: EventRecordType }> = ({ type }) => {
    const intl = useIntl();
    const { getEvents, fetchEvents } = useEventRecordService();
    const { isGod, currentUser } = useUserService();

    const getEventList = () => {
        return type === EventRecordType.MEDICAL ? medicalLists : criminalLists;
    };

    const events = useMemo(() => getEvents(type), [type, getEvents]);

    useEffect(function fetchData() {
        fetchEvents(type);
    }, [currentUser]);

    return (
        <SectionBody>
            <Controls leftSideOption="back" />
            <motion.div key="event-record" className="event-record">
                {getEventList().map((section) => (
                    <section className="event-record__section" key={section.name}>
                        <span className="event-record__header">
                            {intl.formatMessage({ id: section.msgId })}:
                        </span>
                        <ol className="event-record__list">
                            {events
                                .filter((event) => event.type === section.name)
                                .filter((event) => event.isRevealed)
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

                            {events
                                .filter((event) => event.type === section.name)
                                .filter((event) => !event.isRevealed)
                                .map(event => (
                                    <LockedEntry key={event.id}/>
                                ))}
                            {events.filter((event) => event.type === section.name)
                                .length === 0 && (
                                <span className="event-record__no-entry">
                                    <FormattedMessage id="NO_RECORDER_EVENTS" />
                                </span>
                            )}
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
        </SectionBody>
    );
};
