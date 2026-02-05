import {
    Box,
    Typography,
    Tooltip,
    Radio as MuiRadio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import { useField } from "formik"
import { colors } from "@/components/ThemeRegistry"

type Option = {
    label: string
    value: string
}

type ColorName = keyof typeof colors

type RadioProps = {
    name: string
    label: string
    options: Option[]
    description?: string
    labelWidth?: number
    row?: boolean
    color?: ColorName
    sx?: object
}

export function Radio({
                          name,
                          label,
                          options,
                          description,
                          labelWidth = 140,
                          row = true,
                          color,
    sx =  {},
                      }: RadioProps) {
    const [field, meta] = useField(name)
    const showError = meta.touched && Boolean(meta.error)

    const tooltipText = showError ? meta.error : description
    const resolvedColor = color ? colors[color] : null

    const radios = (
        <Box
            sx={(theme) => ({
                minHeight: 30,
                display: "flex",
                alignItems: "center",
                backgroundColor: resolvedColor
                    ? alpha(resolvedColor, 0.06)
                    : alpha(theme.palette.primary.main, 0.04),
                borderRadius: 1,
                padding: "2px 6px",
                ...(showError && {
                    outline: "1px solid",
                    outlineColor: theme.palette.error.main,
                }),
            })}
        >
            <RadioGroup
                {...field}
                row={row}
                sx={{
                    gap: 1,
                }}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <MuiRadio
                                size="small"
                                sx={{
                                    padding: "2px",
                                    ...(resolvedColor && {
                                        color: alpha(resolvedColor, 0.6),
                                        "&.Mui-checked": {
                                            color: resolvedColor,
                                        },
                                    }),
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: 12 }}>
                                {option.label}
                            </Typography>
                        }
                        sx={{
                            margin: 0,
                        }}
                    />
                ))}
            </RadioGroup>
        </Box>
    )

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `${labelWidth}px 1fr`,
                columnGap: "1px",
                alignItems: "center",
                ...sx,
            }}
        >
            <Typography
                component="label"
                sx={{
                    fontSize: 11,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    color: "text.secondary",
                    userSelect: "none",
                }}
            >
                {label}
            </Typography>

            {tooltipText ? (
                <Tooltip
                    title={tooltipText}
                    placement="top-start"
                    arrow
                    enterDelay={300}
                >
                    <span>{radios}</span>
                </Tooltip>
            ) : (
                radios
            )}
        </Box>
    )
}
