import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    FieldTypes,
    IAdminEditableFieldProps
} from './admin-editable-field.model';
import { useUserService } from '../../services/user.service';
import { Slider } from '../slider/slider';

import './admin-editable-field.scss';

export const AdminEditableField: FC<IAdminEditableFieldProps> = (props) => {
    const textInput = props.type === FieldTypes.TEXT;
    const numberInput = props.type === FieldTypes.NUMBER;
    const booleanInput = props.type === FieldTypes.BOOLEAN;
    const selectInput = props.type === FieldTypes.SELECT;
    const sliderInput = props.type === FieldTypes.SLIDER;
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
            {isAdmin && selectInput && (
                <select
                    className={`${props.className} admin-editable-field admin-editable-field__select admin-editable-field__admin-mode`}
                    value={value as string}
                    onBlur={() => props.onChange(value as string)}
                    onChange={(event) => setValue(event.target.value)}
                >
                    {props.options?.map((option) => (
                        <option key={option} value={option}>
                            <FormattedMessage id={option} />
                        </option>
                    ))}
                </select>
            )}
            {sliderInput && (
                <Slider
                    className={`${props.className} admin-editable-field admin-editable-field__slider ${isAdmin && 'admin-editable-field__admin-mode'}`}
                    label={props.label}
                    label2={props.label2}
                    value={value as number}
                    showValue={props.showValue ?? true}
                    showMax={props.showMax ?? true}
                    showMin={props.showMin ?? true}
                    onChange={setValue}
                    min={props.min}
                    max={props.max}
                    disabled={!isAdmin}
                />
            )}
            {!isAdmin && !sliderInput && (
                <span
                    className={`admin-editable-field ${props.className}`}
                    onClick={props.onClick}
                >
                    {props.value}
                </span>
            )}
        </>
    );
};
