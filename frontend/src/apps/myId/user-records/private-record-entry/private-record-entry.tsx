import { FC } from 'react';
import { IPrivateRecord } from '../../../../models/user';
import { FieldTypes } from '../../../../shared/components/admin-editable-field/admin-editable-field.model';
import { AdminEditableField } from '../../../../shared/components/admin-editable-field/admin-editable-field';
import { useEventsService } from '../../../../shared/services/events.service';

export const PrivateRecordEntry: FC<{ privateRecord: IPrivateRecord }> = ({
    privateRecord
}) => {
    const { updatePrivateRecord } = useEventsService();

    const onTitleChange = (title: string) => {
        updatePrivateRecord(privateRecord.id, title, privateRecord.description);
    };

    const onDescriptionChange = (description: string) => {
        updatePrivateRecord(privateRecord.id, privateRecord.title, description);
    };

    return (
        <div className="private-record-entry record">
            <div className="private-record__entry" key={privateRecord.id}>
                <div className="private-record-entry__title record__title">
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        value={privateRecord.title}
                        onChange={(val) => onTitleChange(val)}
                    />
                </div>
                <div className="private-record-entry__description record__description">
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        value={privateRecord.description}
                        onChange={(val) => onDescriptionChange(val)}
                    />
                </div>
            </div>
        </div>
    );
};
