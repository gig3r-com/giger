import { FC } from 'react';
import { IRelation } from '../../../../models/user';
import { FieldTypes } from '../../../../shared/components/admin-editable-field/admin-editable-field.model';
import { AdminEditableField } from '../../../../shared/components/admin-editable-field/admin-editable-field';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useEventsService } from '../../../../shared/services/events.service';

export const RelationEntry: FC<{ relation: IRelation }> = ({ relation }) => {
    const userList = useSelector((state: RootState) => state.users.users);
    const { updateRelation } = useEventsService();

    const onUserChange = (userId: string) => {
        updateRelation(relation.id, userId, relation.description);
    };

    const onDescriptionChange = (description: string) => {
        updateRelation(relation.id, relation.userName, description);
    };

    const userOptions = userList.map((u) => u.handle);

    return (
        <div className="relation-entry record">
            <div className="relation-entry__title record__title">
                <AdminEditableField
                    type={FieldTypes.SELECT}
                    skipTranslation={true}
                    value={relation.userName}
                    onChange={(val) => onUserChange(val)}
                    options={userOptions}
                />
            </div>
            <div className="relation-entry__description record__description">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={relation.description}
                    onChange={(val) => onDescriptionChange(val)}
                />
            </div>
        </div>
    );
};
