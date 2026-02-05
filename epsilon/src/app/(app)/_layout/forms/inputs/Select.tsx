import { Box, MenuItem, TextField, Tooltip, Typography, } from '@mui/material';
import { useField } from 'formik';
import { alpha } from '@mui/material/styles';
import { colors } from '@/components/ThemeRegistry';

type Option = {
    label: string;
    value: string;
};

type ColorName = keyof typeof colors;

type SelectProps = {
    name: string;
    label: string;
    options: Option[];
    description?: string;
    labelWidth?: number;
    color?: ColorName;
    sx?: object;
};

export function Select({
                           name,
                           label,
                           options,
                           description,
                           labelWidth = 140,
                           color,
                           sx = {},
                           ...props
                       }: SelectProps) {
    const [field, meta] = useField(name);
    const showError = meta.touched && Boolean(meta.error);

    const tooltipText = showError ? meta.error : description;
    const resolvedColor = color ? colors[color] : null;

    const select = (
        <TextField
            { ...field }
            { ...props }
            id={ name }
            select
            variant="outlined"
            size="small"
            error={ showError }
            fullWidth
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
                    fontSize: 13,
                    borderRadius: 1,
                    '& .MuiSelect-select': {
                        padding: '6px 8px',
                    },
                },
            } }
            FormHelperTextProps={ { sx: { display: 'none' } } }
        >
            { options.map((option) => (
                <MenuItem
                    key={ option.value }
                    value={ option.value }
                    sx={ { fontSize: 13 } }
                >
                    { option.label }
                </MenuItem>
            )) }
        </TextField>
    );

    return (
        <Box
            sx={ {
                display: 'grid',
                gridTemplateColumns: `${ labelWidth }px 1fr`,
                columnGap: '8px',
                alignItems: 'center',
                ...sx,
            } }
        >
            {/* Label */ }
            <Typography
                component="label"
                htmlFor={ name }
                sx={ {
                    fontSize: 11,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    color: 'text.secondary',
                    userSelect: 'none',
                } }
            >
                { label }
            </Typography>

            { tooltipText ? (
                <Tooltip title={ tooltipText } placement="top-start" arrow enterDelay={ 300 }>
                    <span>{ select }</span>
                </Tooltip>
            ) : (
                select
            ) }
        </Box>
    );
}
