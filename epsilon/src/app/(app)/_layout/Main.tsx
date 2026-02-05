import React, { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import { LeftBar, RightBar } from '@/app/(app)/_layout/bars';
import { BottomPanel, LeftPanel, MainPanel, RightPanel } from '@/app/(app)/_layout/panels';
import { useEpsilon } from '@/modules/epsilon/context';
import { BOTTOM_BAR_HEIGHT, TOP_BAR_HEIGHT } from './constants';

export function Main() {
    const { isTopBarOpened } = useEpsilon();

    const mainHeight = useMemo(
        () =>
            `calc(100vh - ${
                isTopBarOpened ? TOP_BAR_HEIGHT + BOTTOM_BAR_HEIGHT : BOTTOM_BAR_HEIGHT
            }px)`,
        [isTopBarOpened]
    );

    return (
        <Stack direction="row" sx={ { height: mainHeight, overflow: 'hidden', } }>
            <LeftBar/>

            <Stack direction="column" flex="1" sx={ { minHeight: 0, } }>
                <Stack
                    direction="row"
                    flex="1"
                    sx={ { minHeight: 0, } }
                >
                    <Box sx={ { overflowY: 'auto' } }>
                        <LeftPanel/>
                    </Box>
                    <Box sx={ { flex: 1, overflowY: 'auto' } }>
                        <MainPanel/>
                    </Box>
                    <Box sx={ { overflowY: 'auto' } }>
                        <RightPanel/>
                    </Box>
                </Stack>

                <Box sx={ { flexShrink: 0 } }>
                    <BottomPanel/>
                </Box>

            </Stack>

            <RightBar/>
        </Stack>

    );
}

export default Main;
