import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { alpha } from '@mui/material/styles';
import { colors } from '@/components/ThemeRegistry';
import { useEffect, useMemo, useRef, useState } from 'react';

type ColorName = keyof typeof colors;

type InputProps = {
    name: string;
    label: string;
    description?: string;
    labelWidth?: number;
    color?: ColorName;
    debounceMs?: number;
    sx?: object;
} & Omit<React.ComponentProps<typeof TextField>, 'name'>;

export function Input({
                          name,
                          label,
                          description,
                          labelWidth = 140,
                          color,
                          debounceMs = 300,
                          sx = {},
                          ...props
                      }: InputProps) {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    /** local state */
    const [localValue, setLocalValue] = useState(field.value);
    const timeoutRef = useRef<number | null>(null);

    /** keep local value in sync when Formik resets */
    useEffect(() => {
        setLocalValue(field.value);
    }, [field.value]);

    /** debounce write-back to Formik */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalValue(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setFieldValue(name, value, true);
        }, debounceMs);
    };

    const showError = meta.touched && Boolean(meta.error);
    const tooltipText = showError ? meta.error : description;
    const resolvedColor = color ? colors[color] : null;

    const colorStyles = useMemo(
        () =>
            resolvedColor
                ? {
                    fieldset: {
                        borderColor: alpha(resolvedColor, 0.4),
                    },
                    '& label.Mui-focused': {
                        color: resolvedColor,
                    },
                    '& .MuiOutlinedInput-root': {
                        background: `linear-gradient(135deg, ${alpha(
                            resolvedColor,
                            0.1
                        )}, ${alpha(resolvedColor, 0.01)})`,
                        '&:hover fieldset': {
                            borderColor: resolvedColor,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: resolvedColor,
                        },
                    },
                }
                : undefined,
        [resolvedColor]
    );

    const input = (
        <TextField
            {...props}
            id={name}
            value={localValue}
            onChange={handleChange}
            onBlur={field.onBlur}
            variant="outlined"
            size="small"
            error={showError}
            fullWidth
            sx={colorStyles}
            InputProps={{
                sx: {
                    fontSize: 13,
                    borderRadius: 1,
                    '& input': {
                        padding: '6px 8px',
                    },
                },
            }}
            FormHelperTextProps={{ sx: { display: 'none' } }}
        />
    );

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `${labelWidth}px 1fr`,
                columnGap: '8px',
                alignItems: 'center',
                ...sx,
            }}
        >
            <Typography
                component="label"
                htmlFor={name}
                sx={{
                    fontSize: 11,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    color: 'text.secondary',
                    userSelect: 'none',
                }}
            >
                {label}
            </Typography>

            {tooltipText ? (
                <Tooltip title={tooltipText} placement="top-start" arrow enterDelay={300}>
                    <span>{input}</span>
                </Tooltip>
            ) : (
                input
            )}
        </Box>
    );
}
