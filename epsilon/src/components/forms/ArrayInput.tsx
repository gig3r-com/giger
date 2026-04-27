import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import { useField } from 'formik';

export type ArrayInputProps = Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'onBlur'
> & {
    name: string;
};

const ArrayInput = React.forwardRef<HTMLInputElement, ArrayInputProps>(
    function ArrayInput({ name, helperText, InputProps, ...props }, ref) {
        const [field, meta, helpers] = useField<string[]>(name);
        const [input, setInput] = React.useState('');
        const isError = Boolean(meta.touched && meta.error);

        const values = Array.isArray(field.value) ? field.value : [];

        const addValue = () => {
            const trimmed = input.trim();
            if (!trimmed) return;

            helpers.setValue([...values, trimmed]);
            setInput('');
            helpers.setTouched(true, false);
        };

        const removeValue = (index: number) => {
            const next = values.filter((_, i) => i !== index);
            helpers.setValue(next);
            helpers.setTouched(true, false);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addValue();
            }
        };

        return (
            <Box>
                <TextField
                    fullWidth
                    size="small"
                    {...props}
                    name={name}
                    id={props.id ?? name}
                    inputRef={ref}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => helpers.setTouched(true)}
                    error={isError}
                    helperText={isError ? meta.error : helperText}
                    InputProps={{
                        ...InputProps,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={addValue} edge="end">
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {values.length > 0 && (
                    <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                        {values.map((value, index) => (
                            <Chip
                                key={`${value}-${index}`}
                                label={value}
                                size="small"
                                onDelete={() => removeValue(index)}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        );
    }
);

export default ArrayInput;
