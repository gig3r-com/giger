import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import { useField } from 'formik';

type Option = {
    value: string;
    label: string;
};

export type ArraySelectProps = Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'onBlur' | 'select' | 'children'
> & {
    name: string;
    options: Option[];
    allowDuplicates?: boolean;
};

const ArraySelect = React.forwardRef<HTMLInputElement, ArraySelectProps>(
    function ArraySelect(
        { name, options, helperText, allowDuplicates = false, InputProps, SelectProps, ...props },
        ref
    ) {
        const [field, meta, helpers] = useField<string[]>(name);
        const [selected, setSelected] = React.useState('');
        const isError = Boolean(meta.touched && meta.error);

        const values = Array.isArray(field.value) ? field.value : [];

        const addValue = () => {
            if (!selected) return;
            if (!allowDuplicates && values.includes(selected)) return;

            helpers.setValue([...values, selected]);
            setSelected('');
            helpers.setTouched(true, false);
        };

        const removeValue = (index: number) => {
            const next = values.filter((_, i) => i !== index);
            helpers.setValue(next);
            helpers.setTouched(true, false);
        };

        const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelected(e.target.value);
        };

        const mergedSelectSx = {
            '& .MuiSelect-select.MuiSelect-outlined': {
                pl: 0.5,
            },
            ...(SelectProps?.sx || {}),
        };

        return (
            <Box>
                <TextField
                    select
                    fullWidth
                    size="small"
                    {...props}
                    id={props.id ?? name}
                    inputRef={ref}
                    value={selected}
                    onChange={handleSelectChange}
                    onBlur={() => helpers.setTouched(true)}
                    error={isError}
                    helperText={isError ? meta.error : helperText}
                    InputProps={{
                        ...InputProps,
                        startAdornment: (
                            <InputAdornment position="start" sx={{ ml: 0.5 }}>
                                <IconButton
                                    size="small"
                                    onClick={addValue}
                                    edge="start"
                                    disabled={!selected}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    SelectProps={{
                        ...SelectProps,
                        sx: mergedSelectSx,
                    }}
                >
                    {options.map((option) => {
                        const disabled =
                            !allowDuplicates && values.includes(option.value);

                        return (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                disabled={disabled}
                            >
                                {option.label}
                            </MenuItem>
                        );
                    })}
                </TextField>

                {values.length > 0 && (
                    <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                        {values.map((value, index) => {
                            const option = options.find((o) => o.value === value);
                            const label = option?.label ?? value;

                            return (
                                <Chip
                                    key={`${value}-${index}`}
                                    label={label}
                                    size="small"
                                    onDelete={() => removeValue(index)}
                                />
                            );
                        })}
                    </Box>
                )}
            </Box>
        );
    }
);

export default ArraySelect;
