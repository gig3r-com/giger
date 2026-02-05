'use client';

import React, { useMemo } from 'react';
import { Panel } from '@/app/(app)/_layout/Panel';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import GlitchTitle from '@/components/common/GlitchTitle';
import { Remove } from '@mui/icons-material';
import { useEpsilon } from '@/modules/epsilon/context';

export function RightPanel() {
    const {
        rightPanelMode,
        isRightPanelOpened,
        setIsRightPanelOpened,
    } = useEpsilon();

    const titleRight = useMemo(
        () => (
            <IconButton
                size="small"
                sx={{ ml: 1 }}
                aria-label="Close panel"
                onClick={() => setIsRightPanelOpened(false)}
            >
                <Remove />
            </IconButton>
        ),
        [setIsRightPanelOpened]
    );

    const { title, content } = useMemo(() => {
        if (rightPanelMode === 'OTHER') {
            return {
                title: <GlitchTitle>OTHER</GlitchTitle>,
                content: <Stack height="100%" width="100%" alignItems="center">
                    <Typography color="error" paddingTop="40px">
                        Work in Progress
                    </Typography>
                </Stack>,
            };
        }

        return {
            title: null,
            content: null,
        };
    }, [rightPanelMode]);

    return (
        <Box
            sx={{
                display: 'flex',
                width: isRightPanelOpened ? 360 : 0,
                opacity: isRightPanelOpened ? 1 : 0,
                padding: isRightPanelOpened ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 200ms ease-in-out',
                height: '100%'
            }}
        >
            <Panel
                fullWidth
                bordered
                hoverTitleRight
                title={title}
                titleRight={titleRight}
            >
                { content }
            </Panel>
        </Box>
    );
}

export default RightPanel;
