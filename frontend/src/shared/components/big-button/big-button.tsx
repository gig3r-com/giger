import React from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { IBigButtonProps } from './big-button.model';
import { Loader } from '../loader/loader';

import './big-button.scss';

export const BigButton: React.FC<IBigButtonProps> = ({
    text,
    onClick,
    color,
    disabled,
    loading,
    className = '',
    type,
}) => {
    const formData = useFormikContext();
    const buttonClassNames = classNames('big-button', `big-button--${color}`, className);
    const disableButton = type === 'submit' ? !formData.isValid || formData.isSubmitting : disabled;

    return (
        <button
            disabled={!!disableButton}
            onClick={onClick}
            className={buttonClassNames}
            type={type}
        >
            <span className="big-button__text">{text}</span>
            {loading && <Loader />}
        </button>
    );
};
