import { FC } from 'react';
import { useFormikContext } from 'formik';
import { useHashService } from '../../../services/hash.service';
import { StringInputProps } from './models';

import './input.scss';

export const StringInput: FC<StringInputProps> = ({name, placeholder}) => {
    const { setHash } = useHashService();
    const {
        values,
        errors,
        handleBlur,
        handleChange,
    } = useFormikContext();
    const handleChangeWithUrl = (e) => {
        setHash(e.target.name, e.target.value)
        handleChange(e);
    }

    return (
        <div className="input">
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={String(values[name])}
                onChange={handleChangeWithUrl}
                onBlur={handleBlur}
            />
            <div className="error-msg">
            {errors[name]}
            </div>
        </div>
    );
}