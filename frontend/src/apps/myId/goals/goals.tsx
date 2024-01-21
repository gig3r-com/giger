import { FC } from 'react';
import { cloneDeep } from 'lodash-es';
import { useUserService } from '../../../shared/services/user.service';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';

import './goals.scss';

export const Goals: FC = () => {
    const { currentUser, updateUserData } = useUserService();
    const getUpdatedGoals = (description: string, index: number) => {
        const updatedGoals = cloneDeep([...currentUser!.goals]);
        updatedGoals[index].description = description;
        return updatedGoals;
    };

    return (
        <section className="goals">
            {currentUser?.goals.map((goal, index) => (
                <div className="goals__entry" key={goal.id}>
                    <div className="goals__title">{goal.title}</div>
                    <div className="goals__description">
                        <AdminEditableField
                            type={FieldTypes.TEXT}
                            value={goal.description}
                            onChange={(val) =>
                                updateUserData(currentUser.id, {
                                    goals: getUpdatedGoals(val, index)
                                })
                            }
                        />
                    </div>
                </div>
            ))}
        </section>
    );
};
