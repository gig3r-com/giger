import { FC } from 'react';
import { IGoal } from '../../../../models/user';
import { FieldTypes } from '../../../../shared/components/admin-editable-field/admin-editable-field.model';
import { AdminEditableField } from '../../../../shared/components/admin-editable-field/admin-editable-field';
import { useEventsService } from '../../../../shared/services/events.service';

export const GoalEntry: FC<{ goal: IGoal }> = ({ goal }) => {
    const { updateGoal } = useEventsService();

    const onTitleChange = (title: string) => {
        updateGoal(goal.id, title, goal.description);
    };

    const onDescriptionChange = (description: string) => {
        updateGoal(goal.id, goal.title, description);
    };

    return (
        <div className="goal-entry record">
            <div className="goal-entry__title record__title">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={goal.title}
                    onChange={(val) => onTitleChange(val)}
                />
            </div>
            <div className="goal-entry__description record__description">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={goal.description}
                    onChange={(val) => onDescriptionChange(val)}
                />
            </div>
        </div>
    );
};
