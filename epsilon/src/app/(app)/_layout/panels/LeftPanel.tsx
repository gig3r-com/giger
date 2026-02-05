'use client';

import React, { useMemo } from 'react';
import { Panel } from '@/app/(app)/_layout/Panel';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import GlitchTitle from '@/components/common/GlitchTitle';
import { Remove } from '@mui/icons-material';
import { useEpsilon } from '@/modules/epsilon/context';
import { Files } from './contents';

export function LeftPanel() {
    const {
        leftPanelMode,
        isLeftPanelOpened,
        setIsLeftPanelOpened,
    } = useEpsilon();
    const titleRight = useMemo(() => (
        <IconButton
            size="small"
            sx={ { ml: 1 } }
            aria-label="Close panel"
            onClick={ () => setIsLeftPanelOpened(false) }
        >
            <Remove/>
        </IconButton>
    ), [setIsLeftPanelOpened]);

    const { title, content } = useMemo(() => {
        if (leftPanelMode === 'FILES') {
            return {
                title: <GlitchTitle>GIG3R DATA</GlitchTitle>,
                content: <Files />,
            };
        }

        if (leftPanelMode === 'NETWORKS') {
            return {
                title: <GlitchTitle>NETWORKS</GlitchTitle>,
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
    }, [leftPanelMode]);

    return (
        <Box
            sx={ {
                display: 'flex',
                width: isLeftPanelOpened ? 360 : 0,
                opacity: isLeftPanelOpened ? 1 : 0,
                padding: isLeftPanelOpened ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 200ms ease-in-out',
                height: '100%'
            } }
        >
            <Panel
                fullWidth
                bordered
                hoverTitleRight
                title={ title }
                titleRight={ titleRight }
            >
                { content }
            </Panel>
        </Box>
    );
}

export default LeftPanel;
