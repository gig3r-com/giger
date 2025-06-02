import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useFormikContext } from 'formik';
import { AccountType } from '../../../../models/banking';
import { useHashService } from '../../../services/hash.service';
import { AccountPickerProps } from './models';

import './input.scss';

export const AccountPicker: FC<AccountPickerProps> = ({name}) => {
    const intl = useIntl();
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
            <select
                name={name}
                value={String(values[name])}
                onChange={handleChangeWithUrl}
                onBlur={handleBlur}
            >
                <option value={AccountType.PRIVATE}>
                    {intl.formatMessage({ id: 'PRIVATE' })}
                </option>
                <option value={AccountType.BUSINESS}>
                    {intl.formatMessage({ id: 'BUSINESS' })}
                </option>
            </select>
            <div className="error-msg">
                {errors[name]}
            </div>
        </div>
    );
}