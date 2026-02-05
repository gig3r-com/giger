import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { colors } from '@/components/ThemeRegistry';

type ColorName = keyof typeof colors;

type SegmentProps = {
    title?: React.ReactNode;
    icon?: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    labelWidth?: number;
    color?: ColorName;
    cleanIcon?: boolean;
    cleanContent?: boolean;
    sx?: React.CSSProperties;
};

export function Segment({
                            title,
                            icon,
                            description,
                            children,
                            labelWidth = 160,
                            color,
                            cleanIcon = false,
                            cleanContent = false,
                            sx = {},
                        }: SegmentProps) {
    const resolvedColor = color ? colors[color] : null;

    return (
        <Stack gap={ cleanContent ? 0 : '6px' } paddingTop="6px" paddingBottom="6px" sx={ sx }>
            { (title || description || icon) && (
                <Stack
                    direction="row"
                    alignItems="flex-start"
                    sx={ {
                        borderBottom: '1px solid',
                        borderColor: resolvedColor
                            ? alpha(resolvedColor, 0.4)
                            : 'divider',
                    } }
                >
                    <Box sx={ { width: labelWidth } }>
                        { icon && cleanIcon ?
                            icon :
                            (
                                <Stack
                                    direction="row-reverse"
                                    padding="6px"
                                    sx={
                                        resolvedColor
                                            ? { color: resolvedColor }
                                            : undefined
                                    }
                                >
                                    { icon }
                                </Stack>
                            )
                        }
                    </Box>

                    <Box sx={ { pb: '4px', width: '100%' } }>
                        { title && (
                            typeof description === 'string' ?
                                (
                                    <Typography
                                        sx={ {
                                            fontSize: 12,
                                            fontWeight: 500,
                                            lineHeight: 1.3,
                                            color: resolvedColor
                                                ? resolvedColor
                                                : 'text.primary',
                                        } }
                                    >
                                        { title }
                                    </Typography>
                                )
                                :
                                title
                        ) }

                        { description && (
                            typeof description === 'string' ?
                                (
                                    <Typography
                                        sx={ {
                                            fontSize: 11,
                                            lineHeight: 1.3,
                                            color: resolvedColor
                                                ? alpha(resolvedColor, 0.7)
                                                : 'text.secondary',
                                        } }
                                    >
                                        { description }
                                    </Typography>
                                )
                                :
                                description
                        ) }
                    </Box>
                </Stack>
            ) }

            {/* Content */ }
            <Stack gap="6px" paddingX={ cleanContent ? 0 : '6px' }>
                { children }
            </Stack>
        </Stack>
    );
}
