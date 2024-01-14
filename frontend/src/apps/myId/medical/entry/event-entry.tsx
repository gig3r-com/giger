import dayjs from 'dayjs';
import { FC, useState } from 'react';
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
    const { isAdmin, currentUser } = useUserService();
    const { updateEvent } = useEventsService();

    const updateData = (
        propToUpdate: 'year' | 'name',
        val: string | number
    ) => {
        if (!currentUser) return;

        if (entry) {
            entry.name = propToUpdate === 'name' ? (val as string) : entry.name;
        }

        updateEvent(currentUser.id, entry!.id, type, entry!);
    };

    return (
        <>
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
                {isAdmin && (
                    <span className="event-entry__remove-entry material-icons">
                        delete
                    </span>
                )}
            </div>
            <div
                className={`event-entry__description ${
                    expanded && 'event-entry__description--expanded'
                }`}
            >
                {entry.eventDescription}
            </div>
        </>
    );
};
