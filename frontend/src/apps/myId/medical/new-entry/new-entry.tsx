import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import {
    MedicalEventType,
    CriminalEventType,
    EventType,
    EventStatus,
    EventRecordType
} from '../../../../models/events';
import { useUserService } from '../../../../shared/services/user.service';
import { useEventsService } from '../../../../shared/services/events.service';

import './new-entry.scss';

/**
 * A small component handling displaying and adding new entries to the medical history
 * @param onAdd function to fire when adding a new entry
 */
export const NewEntry: FC<{
    eventType: EventRecordType;
    type: MedicalEventType | CriminalEventType;
}> = ({ type, eventType }) => {
    const { currentUser } = useUserService();
    const { addUserEvent } = useEventsService();
    const [year, setYear] = useState<number>(2124);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleAdd = () => {
        onAddEntry();
        setName('');
        setDescription('');
        setYear(2124);
    };

    const onAddEntry = () => {
        if (!currentUser) return;

        const newEntry: EventType = {
            id: v4(),
            timeStamp: dayjs().set('year', year).toISOString(),
            name,
            status: EventStatus.HISTORICAL,
            type,
            eventDescription: description
        };

        addUserEvent(newEntry, eventType);
    };

    return (
        <article className="new-entry">
            <div className="new-entry__inputs">
                <div className="new-entry__general">
                    <span className="new-entry__year">
                        <input
                            className="new-entry__input new-entry__year-input"
                            value={year}
                            onChange={(event) =>
                                setYear(parseInt(event.target.value))
                            }
                        />
                    </span>
                    <span className="new-entry__info">
                        <input
                            className="new-entry__input"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </span>
                </div>

                <textarea
                    className="new-entry__description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <button
                disabled={!name || !year}
                className="new-entry__add material-icons"
                onClick={handleAdd}
            >
                add
            </button>
        </article>
    );
};
