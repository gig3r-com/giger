import { FC, useState } from 'react';
import {
    FieldTypes,
    IAdminEditableFieldProps
} from './admin-editable-field.model';
import { useUserService } from '../../services/user.service';

import './admin-editable-field.scss';

export const AdminEditableField: FC<IAdminEditableFieldProps> = (props) => {
    const textInput = props.type === FieldTypes.TEXT;
    const numberInput = props.type === FieldTypes.NUMBER;
    const booleanInput = props.type === FieldTypes.BOOLEAN;
    const { isAdmin } = useUserService();
    const [value, setValue] = useState<string | number | boolean>(props.value);

    return (
        <>
            {isAdmin && textInput && (
                <div
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className={`${props.className} admin-editable-field admin-editable-field__text admin-editable-field__admin-mode`}
                    onBlur={() => {
                        console.log(value);
                        props.onChange(value as string);
                    }}
                    onInput={(event) =>
                        setValue(event.currentTarget.textContent ?? '')
                    }
                >
                    {props.value}
                </div>
            )}
            {isAdmin && numberInput && (
                <input
                    type="number"
                    className={`${props.className} admin-editable-field admin-editable-field__number admin-editable-field__admin-mode`}
                    value={value as number}
                    onBlur={() => {
                        console.log(value);
                        props.onChange(parseInt(value as string));
                    }}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />
            )}
            {isAdmin && booleanInput && (
                <select
                    className={`${props.className} admin-editable-field admin-editable-field__number admin-editable-field__admin-mode`}
                    value={`${value}`}
                    onBlur={() => props.onChange(value as boolean)}
                    onChange={(event) =>
                        setValue(event.target.value === 'true')
                    }
                >
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>
            )}
            {!isAdmin && (
                <span className={`admin-editable-field ${props.className}`}>
                    {props.value}
                </span>
            )}
        </>
    );
};
