import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import { useUserService } from '../../../shared/services/user.service';
import { EventRecordType } from '../../../models/events';
import { criminalLists, medicalLists } from './event-lists';
import { NewEntry } from './new-entry/new-entry';
import { useEventsService } from '../../../shared/services/events.service';
import { EventEntry } from './entry/event-entry';

import './event-record.scss';

/**
 * A component that displays the event history of the user.
 * Supports both medical and criminal events.
 * Allows editing in admin mode
 */
export const EventRecord: FC<{ type: EventRecordType }> = ({ type }) => {
    const intl = useIntl();
    const { getEventRecordForUser } = useEventsService();
    const { currentUser, isGod } = useUserService();

    const getEventList = () => {
        return type === 'medical' ? medicalLists : criminalLists;
    };

    const eventRecord = useMemo(() => {
        return currentUser && getEventRecordForUser(type);
    }, [currentUser]);

    return (
        <motion.div key="event-record" className="event-record">
            {getEventList().map((section) => (
                <section className="event-record__section" key={section.name}>
                    <span className="event-record__header">
                        {intl.formatMessage({ id: section.msgId })}:
                    </span>
                    <ol className="event-record__list">
                        {eventRecord
                            ?.filter((event) => event.type === section.name)
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
