'use client';

import React, { ReactElement, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Panel } from '@/app/(app)/_layout/Panel';
import { FormMaker } from '@/app/(app)/_layout/forms/FormMaker';
import { useFormsStore } from '@/store/formsStore';
import TabChip from '@/app/(app)/_layout/components/TabChip';

export function MainPanel() {
    const { tabs, activeTab } = useFormsStore();
    const { title, content } = useMemo(() => {
        const title: ReactElement[] = [];
        const content: ReactElement[] = [];

        tabs.forEach(tab => {
            title.push(<TabChip key={ tab.id } tab={ tab }/>);
            content.push(<FormMaker key={ tab.id } tab={ tab }/>);
        });

        return { title, content };
    }, [tabs, activeTab]);

    return (
        <Box sx={ { display: 'flex', flex: 1, height: '100%', p: 1 } }>
            <Panel
                fullWidth
                disableTitlePadding
                headerVariant="dark"
                title={
                    <Stack direction="row" spacing={1} p={1}>
                        { title }
                    </Stack>
                }
            >
                {
                    content?.length > 0 ?
                        content :
                        <Stack direction="row" justifyContent="center" alignItems="center" height="100%" width="100%">
                            <Typography p="2" color="textSecondary">
                                { `<--- Pick item to edit` }
                            </Typography>
                        </Stack>
                }
            </Panel>
        </Box>
    );
}

export default MainPanel;
