import { FC } from 'react';
import { IMeta } from '../../../../models/user';
import { FieldTypes } from '../../../../shared/components/admin-editable-field/admin-editable-field.model';
import { AdminEditableField } from '../../../../shared/components/admin-editable-field/admin-editable-field';
import { useEventsService } from '../../../../shared/services/events.service';

export const MetaEntry: FC<{ meta: IMeta }> = ({ meta }) => {
    const { updateMeta } = useEventsService();

    const onTitleChange = (title: string) => {
        updateMeta(meta.id, title, meta.description);
    };

    const onDescriptionChange = (description: string) => {
        updateMeta(meta.id, meta.title, description);
    };

    return (
        <div className="meta-entry record">
            <div className="meta-entry__title record__title">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={meta.title}
                    onChange={(val) => onTitleChange(val)}
                />
            </div>
            <div className="meta-entry__description record__description">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={meta.description}
                    onChange={(val) => onDescriptionChange(val)}
                />
            </div>
        </div>
    );
};
