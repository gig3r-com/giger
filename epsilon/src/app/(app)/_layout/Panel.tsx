'use client';

import React from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { colors } from '@/components/ThemeRegistry';

type PanelProps = {
    title?: React.ReactNode
    titleRight?: React.ReactNode
    children: React.ReactNode
    headerVariant?: 'light' | 'dark'
    highlightColor?: 'bioAcid' | 'cpYellow' | 'cpPink' | 'cpCyan' | 'epsilonPurple' | 'steel'
    bordered?: boolean
    fullWidth?: boolean
    hoverTitleRight?: boolean
    disableTitlePadding?: boolean
}

export function Panel({
                          title,
                          titleRight,
                          children,
                          headerVariant = 'light',
                          highlightColor,
                          bordered = false,
                          fullWidth = false,
                          hoverTitleRight = false,
                          disableTitlePadding = false,
                      }: PanelProps) {
    const theme = useTheme();

    let panelBg = alpha(theme.palette.panel.bg, 0.72);

    const headerBg =
        headerVariant === 'dark'
            ? alpha(colors.graphite0, 0.78)
            : highlightColor
                ? alpha(colors[highlightColor], 0.14)
                : alpha(theme.palette.panel.bg, 0.10);

    const headerShadow =
        headerVariant === 'dark'
            ? 'inset 0 -1px 2px rgba(0,0,0,0.22)'
            : undefined;

    if (highlightColor) {
        panelBg = `
      linear-gradient(
        180deg,
        ${ alpha(colors[highlightColor], 0.05) },
        ${ alpha(colors[highlightColor], 0.025) }
      ),
      ${ panelBg }
    `;
    }

    const panelBorder = bordered
        ? `1px solid ${ highlightColor ? colors[highlightColor] : colors.bioAcid }`
        : '1px solid rgba(255,255,255,0.03)';

    const neonBoxShadow = bordered
        ? `0 0 6px ${ highlightColor ? colors[highlightColor] : colors.bioAcid },
       0 0 12px ${ highlightColor
            ? alpha(colors[highlightColor], 0.4)
            : alpha(colors.bioAcid, 0.4) }`
        : undefined;

    return (
        <Box
            sx={ {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: fullWidth ? '100%' : 'auto',
                borderRadius: 1.5,
                overflow: 'hidden',
                background: panelBg,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: panelBorder,
                boxShadow:
                    neonBoxShadow ||
                    `0 1px 2px rgba(0,0,0,0.1),
           0 2px 4px rgba(0,0,0,0.06)`,

                '&:hover .titleRight': {
                    opacity: hoverTitleRight ? 1 : undefined,
                },
            } }
        >
            { (title || titleRight) && (
                <>
                    <Box
                        sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minHeight: 56,
                            px: disableTitlePadding ? 0 : 2,
                            background: headerBg,
                            boxShadow: headerShadow,
                        } }
                    >
                        <Box
                            sx={ {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                minWidth: 0,
                                flex: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            } }
                        >
                            { title }
                        </Box>

                        { titleRight && (
                            <Box
                                className="titleRight"
                                sx={ {
                                    display: 'flex',
                                    alignItems: 'center',
                                    opacity: hoverTitleRight ? 0 : 1,
                                    transition: hoverTitleRight
                                        ? 'opacity 0.3s ease'
                                        : undefined,
                                } }
                            >
                                { titleRight }
                            </Box>
                        ) }
                    </Box>

                    <Divider sx={ { borderColor: alpha('#fff', 0.035) } }/>
                </>
            ) }

            {/* CONTENT */ }
            <Box
                sx={ {
                    flex: 1,
                    overflow: 'auto',
                    p: 0,
                    height: '100%',
                } }
            >
                { children }
            </Box>
        </Box>
    );
}


export default Panel;
