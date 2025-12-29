import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useField } from 'formik';

interface Option {
    value: string;
    label: string;
}

export type SelectProps = Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'onBlur' | 'select' | 'children'
> & {
    name: string;
    options: Option[];
};

const Select = React.forwardRef<HTMLInputElement, SelectProps>(
    function FormikSelect({ name, options, ...props }, ref) {
        const [field, meta] = useField(name);
        const isError = Boolean(meta.touched && meta.error);

        return (
            <TextField
                select
                fullWidth
                size="small"
                {...field}
                {...props}
                inputRef={ref}
                id={props.id ?? name}
                error={isError}
                helperText={isError ? meta.error ?? ` ` : props.helperText ?? ` `}
                value={field.value as string ?? ''}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
);

export default Select;
