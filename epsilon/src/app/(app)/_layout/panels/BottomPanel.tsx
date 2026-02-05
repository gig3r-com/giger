'use client';

import React, { useMemo } from 'react';
import { Panel } from '@/app/(app)/_layout/Panel';
import { Box, IconButton } from '@mui/material';
import GlitchTitle from '@/components/common/GlitchTitle';
import { Remove } from '@mui/icons-material';
import { useEpsilon } from '@/modules/epsilon/context';
import type { BottomPanelModes } from '@/modules/epsilon/types';
import { BOTTOM_PANEL_HEIGHT } from '@/app/(app)/_layout/constants';

export function BottomPanel() {
    const {
        bottomPanelMode,
        isBottomPanelOpened,
        setIsBottomPanelOpened,
    } = useEpsilon();

    const titleRight = useMemo(
        () => (
            <IconButton
                size="small"
                sx={{ ml: 1 }}
                aria-label="Close panel"
                onClick={() => setIsBottomPanelOpened(false)}
            >
                <Remove />
            </IconButton>
        ),
        [setIsBottomPanelOpened]
    );

    const { title, content } = useMemo(() => {
        switch (bottomPanelMode as BottomPanelModes) {
            case 'TERMINAL':
                return {
                    title: <GlitchTitle>TERMINAL</GlitchTitle>,
                    content: (
                        <Box sx={{ p: 2 }}>
                            Work in Progress
                        </Box>
                    ),
                };

            default:
                return {
                    title: null,
                    content: null,
                };
        }
    }, [bottomPanelMode]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: isBottomPanelOpened ? BOTTOM_PANEL_HEIGHT - 2 : 0,
                opacity: isBottomPanelOpened ? 1 : 0,
                padding: isBottomPanelOpened ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 200ms ease-in-out',
            }}
        >
            <Panel
                fullWidth
                bordered
                hoverTitleRight
                title={title}
                titleRight={titleRight}
            >
                {content}
            </Panel>
        </Box>
    );
}

export default BottomPanel;
