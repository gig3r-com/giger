import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Controls } from '../../../shared/components/controls/controls';
import { useUserService } from '../../../shared/services/user.service';
import { IMedEvent, IMedHistory, MedicalEventStatus, MedicalEventType } from '../../../models/medical';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';
import { medicalLists } from './medical-lists';
import { NewEntry } from './new-entry/new-entry';
import { useMedicalService } from '../../../shared/services/medical.service';

import './medical.scss';

/**
 * A component that displays the medical history of the user.
 * Allows editing in admin mode
 */
export const Medical: FC = () => {
    const intl = useIntl();
    const [medHistory, setMedHistory] = useState<IMedHistory | null>(null);
    const { getMedicalHistoryForUser, updateMedEvent, addMedEvent } = useMedicalService();
    const { currentUser, isAdmin } = useUserService();

    const updateData = (
        propToUpdate: 'year' | 'name',
        id: string,
        val: string | number
    ) => {
        if (!currentUser || !medHistory) return;

        const newMedHistory = { ...medHistory };
        const entry = newMedHistory.medEvents.find((entry) => entry.id === id);

        if (entry) {
            entry.name = propToUpdate === 'name' ? (val as string) : entry.name;
        }

        setMedHistory(newMedHistory as IMedHistory);
        updateMedEvent(currentUser.id, entry!.id, entry!);
    };

    const onAddEntry = (
        name: string,
        year: number
    ) => {
        if (!currentUser || !medHistory) return;

        const newEntry: IMedEvent = {
            id: v4(),
            timestamp: dayjs().set('year', year).toISOString(),
            name,
            status: MedicalEventStatus.HISTORICAL,
            type: MedicalEventType.MEDICAL_PROCEDURE,
            description: ''
        };

        addMedEvent(currentUser.id, newEntry);
    };

    useEffect(
        function fetchMedHistory() {
            currentUser &&
                getMedicalHistoryForUser(currentUser.id).then((res) => {
                    setMedHistory(res);
                });
        },
        [currentUser]
    );

    return (
        <>
            <Controls />
            <div className="medical">
                {medicalLists.map((section) => (
                    <section className="medical__section" key={section.name}>
                        <span className="medical__header">
                            {intl.formatMessage({ id: section.msgId })}:
                        </span>
                        <ol className="medical__list">
                            {medHistory?.medEvents.filter(event => event.type === section.name).map((entry) => (
                                <li className="medical__entry" key={entry.id}>
                                    <AdminEditableField
                                        type={FieldTypes.NUMBER}
                                        value={dayjs(entry.timestamp).year()}
                                        className="medical__year"
                                        onChange={(val) =>
                                            updateData(
                                                'year',
                                                entry.id,
                                                val
                                            )
                                        }
                                    />
                                    <AdminEditableField
                                        type={FieldTypes.TEXT}
                                        value={entry.name}
                                        className="medical__info"
                                        onChange={(val) =>
                                            updateData(
                                                'name',
                                                entry.id,
                                                val
                                            )
                                        }
                                    />
                                    {isAdmin && (
                                        <span className="medical__remove-entry material-icons">
                                            delete
                                        </span>
                                    )}
                                </li>
                            ))}
                            {isAdmin && (
                                <li className="medical__entry">
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
