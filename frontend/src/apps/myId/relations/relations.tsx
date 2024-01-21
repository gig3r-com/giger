import { FC } from 'react';
import { cloneDeep } from 'lodash-es';
import { useUserService } from '../../../shared/services/user.service';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';

import './relations.scss';

export const Relations: FC = () => {
    const { currentUser, getUserById, updateUserData } = useUserService();
    const getUpdatedRelations = (description: string, index: number) => {
        const updatedRelations = cloneDeep([...currentUser!.relations]);
        updatedRelations[index].description = description;
        return updatedRelations;
    };
    
    return (
        <div className="relations">
            {currentUser?.relations.map((relation, index) => (
                <div className="relations__entry" key={relation.relationTo}>
                    <div className="relations__name">
                        {getUserById(relation.relationTo)?.handle}
                    </div>
                    <div className="relations__description">
                        <AdminEditableField
                            type={FieldTypes.TEXT}
                            value={relation.description}
                            onChange={val => updateUserData(currentUser.id, { relations: getUpdatedRelations(val, index) })}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
