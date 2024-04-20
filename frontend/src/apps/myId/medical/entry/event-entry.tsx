import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminEditableField } from '../../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../../shared/components/admin-editable-field/admin-editable-field.model';
import { EventRecordType, EventType } from '../../../../models/events';
import { useUserService } from '../../../../shared/services/user.service';
import { useEventsService } from '../../../../shared/services/events.service';

import './event-entry.scss';

export const EventEntry: FC<{ entry: EventType; type: EventRecordType }> = ({
    entry,
    type
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const { isGod, currentUser } = useUserService();
    const { updateUserEvent, removeEvent } = useEventsService();

    const updateData = (
        propToUpdate: 'year' | 'name' | 'description',
        val: string | number
    ) => {
        if (!currentUser) return;
        const updatedEntry = { ...entry };

        updatedEntry.name = propToUpdate === 'name' ? (val as string) : entry.name;

        updateUserEvent(entry!.id, type, updatedEntry);
    };

    const removeEntry = () => {
        removeEvent(entry.id, type);
    };

    return (
        <motion.article className="event-entry">
            <div className="event-entry__summary">
                <AdminEditableField
                    type={FieldTypes.NUMBER}
                    value={dayjs(entry.timestamp).year()}
                    className="event-entry__year"
                    onClick={() => setExpanded(!expanded)}
                    onChange={(val) => updateData('year', val)}
                />
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={entry.name}
                    className="event-entry__info"
                    onClick={() => setExpanded(!expanded)}
                    onChange={(val) => updateData('name', val)}
                />
                <span
                    className="event-entry__expand material-icons"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'expand_less' : 'expand_more'}
                </span>
                {isGod && (
                    <span
                        className="event-entry__remove-entry material-icons"
                        onClick={removeEntry}
                    >
                        delete
                    </span>
                )}
            </div>
            <div
                className={`event-entry__description ${
                    expanded && 'event-entry__description--expanded'
                }`}
            >
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={entry.eventDescription}
                    onChange={(val) => updateData('description', val)}
                />
            </div>
        </motion.article>
    );
};
