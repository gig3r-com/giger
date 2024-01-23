import { cloneDeep } from 'lodash-es';
import { useUserService } from '../../../shared/services/user.service';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { IUserRecordsProps, modeMap } from './user-records.model';
import {
    IRelation,
    IMeta,
    IPrivateRecord,
    IGoal,
    IUserRecord,
    UserRecordTypes,
    MetaTypes
} from '../../../models/user';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';

import './user-records.scss';

export function UserRecords<T extends IUserRecord>(
    props: IUserRecordsProps<T>
) {
    const { mode, entries, titleOptions } = props;
    const { currentUser, updateUserData, getUserById, getUserByHandle } =
        useUserService();
    const titleValue = (record: IUserRecord) => {
        switch (record.recordType) {
            case UserRecordTypes.GOAL:
                return (record as IGoal).title;
            case UserRecordTypes.META:
                return (record as IMeta).type;
            case UserRecordTypes.PRIVATE_RECORD:
                return (record as IPrivateRecord).title;
            case UserRecordTypes.RELATION:
                return getUserById((record as IRelation).relationTo)!.handle;
        }
    };
    const type = modeMap.get(mode)!.titleFieldType;
    const entriesProperty = modeMap.get(mode)!.entriesProperty;
    const getRecordsWithUpdatedTitle = (
        value: string,
        index: number
    ) => {
        const updatedRecords = cloneDeep([...currentUser![entriesProperty]]);

        if (mode === UserRecordTypes.RELATION) (updatedRecords[index] as IRelation).relationTo = getUserByHandle(value)!.id;
        if (mode === UserRecordTypes.META) (updatedRecords[index] as IMeta).type = value as MetaTypes;
        if (mode === UserRecordTypes.GOAL) (updatedRecords[index] as IGoal).title = value;
        if (mode === UserRecordTypes.PRIVATE_RECORD) (updatedRecords[index] as IPrivateRecord).title = value;
        
        return updatedRecords;
    };

    const getRecordsWithUpdatedDescription = (descrtiption: string, index: number) => {
        const updatedRecords = cloneDeep([...currentUser![entriesProperty]]);
        updatedRecords[index].description = descrtiption;
        return updatedRecords;
    }

    return (
        <section className="user-records">
            {entries.map((record, index) => (
                <div className="user-records__entry" key={record.id}>
                    <div className="user-records__title">
                        {type === FieldTypes.TEXT && (
                            <AdminEditableField
                                type={type}
                                value={titleValue(record)}
                                onChange={(val) =>
                                    updateUserData(currentUser!.id, {
                                        [entriesProperty]: getRecordsWithUpdatedTitle(
                                            val,
                                            index,
                                        )
                                    })
                                }
                            />
                        )}
                        {type === FieldTypes.SELECT && (
                            <AdminEditableField
                                type={type}
                                value={titleValue(record)}
                                onChange={(val) =>
                                    updateUserData(currentUser!.id, {
                                        [entriesProperty]: getRecordsWithUpdatedTitle(
                                            val,
                                            index
                                        )
                                    })
                                }
                                options={titleOptions!}
                            />
                        )}
                    </div>
                    <div className="user-records__description">
                        <AdminEditableField
                            type={FieldTypes.TEXT}
                            value={record.description}
                            onChange={(val) =>
                                updateUserData(currentUser!.id, {
                                    [entriesProperty]: getRecordsWithUpdatedDescription(
                                        val,
                                        index
                                    )
                                })
                            }
                        />
                    </div>
                </div>
            ))}
        </section>
    );
}
