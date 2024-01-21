import { cloneDeep } from 'lodash-es';
import { FC } from 'react';
import { useUserService } from '../../../shared/services/user.service';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';

import './meta.scss';

export const Meta: FC = () => {
    const { currentUser, updateUserData } = useUserService();
    const getUpdatedMeta = (description: string, index: number) => {
        const updatedGoals = cloneDeep([...currentUser!.meta]);
        updatedGoals[index].description = description;
        return updatedGoals;
    };

    return (
        <div className="meta">
            {currentUser?.meta.map((meta, index) => (
                <div className="meta__entry" key={meta.id}>
                    <div className="meta__type">{meta.type}</div>
                    <div className="meta__description">
                        <AdminEditableField
                            type={FieldTypes.TEXT}
                            value={meta.description}
                            onChange={(val) =>
                                updateUserData(currentUser.id, {
                                    meta: getUpdatedMeta(val, index)
                                })
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
