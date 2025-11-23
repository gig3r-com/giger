import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

export type InputProps = Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'onBlur'
> & {
    name: string;
};

/**
 * Simple MUI TextField bound to Formik.
 * Works with MUI v5 and Formik v2.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    function FormikTextField({ name, ...props }, ref) {
        const [field, meta] = useField(name);
        const isError = Boolean(meta.touched && meta.error);

        return (
            <TextField
                {...field}
                fullWidth
                size="small"
                {...props}
                inputRef={ref}
                id={props.id ?? name}
                error={isError}
                helperText={isError ? meta.error ?? `` : props.helperText ?? ``}
                value={field.value as string ?? ''}
            />
        );
    }
);

export default Input;
