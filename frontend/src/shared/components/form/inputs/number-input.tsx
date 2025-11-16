import { FC } from 'react';
import { useFormikContext } from 'formik';
import { useHashService } from '../../../services/hash.service';
import { NumberInputProps } from './models';

import './input.scss';

export const NumberInput: FC<NumberInputProps> = ({name, placeholder}) => {
    const { setHash } = useHashService();
    const {
        values,
        errors,
        handleBlur,
        handleChange,
    } = useFormikContext();
    const handleChangeWithUrl = (e) => {
        e.target.value = Number.isNaN(e.target.value) ? null : e.target.value;
        setHash(e.target.name, e.target.value)
        handleChange(e);
    }

    return (
        <div className="input">
            <input
                type="number"
                name={name}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChangeWithUrl}
                onBlur={handleBlur}
            />
            <div className="error-msg">
                {errors[name]}
            </div>
        </div>
    );
}