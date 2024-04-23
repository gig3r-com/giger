import { FC } from 'react';
import { IMeta, MetaTypes } from '../../../../models/user';
import { FieldTypes } from '../../../../shared/components/admin-editable-field/admin-editable-field.model';
import { AdminEditableField } from '../../../../shared/components/admin-editable-field/admin-editable-field';
import { useEventsService } from '../../../../shared/services/events.service';

export const MetaEntry: FC<{ meta: IMeta }> = ({ meta }) => {
    const { updateMeta } = useEventsService();

    const onTypeChange = (metaType: MetaTypes) => {
        updateMeta(meta.id, metaType, meta.description);
    };

    const onDescriptionChange = (description: string) => {
        updateMeta(meta.id, meta.type, description);
    };

    const metaOptions = Object.values(MetaTypes);

    return (
        <div className="meta-entry record">
            <div className="meta-entry__title record__title">
                <AdminEditableField
                    type={FieldTypes.SELECT}
                    value={meta.type}
                    onChange={(val) => onTypeChange(val as MetaTypes)}
                    options={metaOptions}
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
