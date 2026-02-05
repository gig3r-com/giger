import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { MenuItem, TextField, TextFieldProps, } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { colors } from '@/components/ThemeRegistry';

type ColorName = keyof typeof colors;

export interface DenseSelectOption {
    label: string;
    value: string;
}

export interface DenseSelectProps
    extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'select'> {
    name: string;
    options: DenseSelectOption[];
    color?: ColorName;
    debounceMs?: number;
}

export function DenseSelect({
                                name,
                                options,
                                color,
                                debounceMs = 500,
                                ...rest
                            }: DenseSelectProps) {
    const [field, , helpers] = useField(name);
    const [value, setValue] = useState<string>(field.value ?? '');
    const timerRef = useRef<number | null>(null);

    const resolvedColor = color ? colors[color] : null;

    useEffect(() => {
        setValue(field.value ?? '');
    }, [field.value]);

    const commitDebounced = useCallback(
        (v: string, shouldValidate: boolean) => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }

            timerRef.current = window.setTimeout(() => {
                helpers.setValue(v, shouldValidate);
            }, debounceMs);
        },
        [helpers, debounceMs]
    );

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            commitDebounced(e.target.value, false);
        },
        [commitDebounced]
    );

    const onBlur = useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        helpers.setValue(value, true);
        helpers.setTouched(true, true);
    }, [helpers, value]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <TextField
            fullWidth
            { ...rest }
            select
            name={ name }
            value={ value }
            variant="outlined"
            size="small"
            onChange={ onChange }
            onBlur={ onBlur }
            sx={
                resolvedColor
                    ? {
                        fieldset: {
                            borderColor: alpha(resolvedColor, 0.4),
                        },
                        '& label.Mui-focused': {
                            color: resolvedColor,
                        },
                        '& .MuiOutlinedInput-root': {
                            background: `linear-gradient(135deg, ${ alpha(
                                resolvedColor,
                                0.1
                            ) }, ${ alpha(resolvedColor, 0.01) })`,

                            '&:hover fieldset': {
                                borderColor: resolvedColor,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: resolvedColor,
                            },
                        },
                    }
                    : undefined
            }
            InputProps={ {
                sx: {
                    fontSize: 12,
                },
            } }
            InputLabelProps={ {
                sx: {
                    fontSize: 12,
                    top: -2,
                },
            } }
            FormHelperTextProps={ {
                sx: {
                    fontSize: 10,
                    margin: '2px 0 0',
                },
            } }
        >
            { options.map((option) => (
                <MenuItem
                    key={ option.value }
                    value={ option.value }
                    sx={ { fontSize: 12 } }
                >
                    { option.label }
                </MenuItem>
            )) }
        </TextField>
    );
}

DenseSelect.displayName = 'DenseSelect';

export default memo(DenseSelect);
