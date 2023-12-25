import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { v4 } from 'uuid';
import { Controls } from '../../../shared/components/controls/controls';
import { useUserService } from '../../../shared/services/user.service';
import {
    IImplant,
    IMedHistory,
    IObscurableMedInfo
} from '../../../models/medical';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';
import { medicalLists } from './medical-lists';
import { NewEntry } from './new-entry/new-entry';

import './medical.scss';

/**
 * A component that displays the medical history of the user. 
 * Allows editing in admin mode
 */
export const Medical: FC = () => {
    const intl = useIntl();
    const [medHistory, setMedHistory] = useState<IMedHistory | null>(null);
    const { getMedicalHistoryForUser, currentUser, isAdmin, updateUserData } =
        useUserService();

    const updateData = (
        type: 'drugsPrescribed' | 'pastTreatments' | 'implants',
        propToUpdate: 'year' | 'name',
        id: string,
        val: string | number
    ) => {
        if (!currentUser || !medHistory) return;

        const newMedHistory = { ...medHistory };
        const entry = newMedHistory[type]?.find((entry) => entry.id === id);

        if (entry) {
            entry.year = propToUpdate === 'year' ? (val as number) : entry.year;
            entry.name = propToUpdate === 'name' ? (val as string) : entry.name;
        }

        setMedHistory(newMedHistory as IMedHistory);
        updateUserData(currentUser.id, {
            medical: newMedHistory as IMedHistory
        });
    };

    const onAddEntry = (
        type: 'drugsPrescribed' | 'pastTreatments' | 'implants',
        name: string,
        year: number
    ) => {
        if (!currentUser || !medHistory) return;

        const newMedHistory = { ...medHistory };
        const newEntry: IObscurableMedInfo = {
            id: v4(),
            year,
            name
        };

        const newImplantEntry: IImplant = {
            id: v4(),
            year,
            name,
            status: 'ok'
        };

        if (type === 'implants') {
            newMedHistory[type] = [
                ...newMedHistory[type]!,
                newEntry
            ] as IImplant[];
        } else {
            newMedHistory[type] = [
                ...newMedHistory[type]!,
                newImplantEntry
            ] as IObscurableMedInfo[];
        }

        updateUserData(currentUser.id, {
            medical: newMedHistory as IMedHistory
        });
        setMedHistory(null);
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
                            {medHistory?.[section.name].map((entry) => (
                                <li className="medical__entry" key={entry.id}>
                                    <AdminEditableField
                                        type={FieldTypes.NUMBER}
                                        value={entry.year}
                                        className="medical__year"
                                        onChange={(val) =>
                                            updateData(
                                                'pastTreatments',
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
                                                'pastTreatments',
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
                            <li className="medical__entry">
                                <NewEntry
                                    onAdd={(name, year) =>
                                        onAddEntry(section.name, name, year)
                                    }
                                />
                            </li>
                        </ol>
                    </section>
                ))}
            </div>
        </>
    );
};
