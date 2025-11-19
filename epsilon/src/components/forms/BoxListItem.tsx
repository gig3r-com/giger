import React from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Radio, Stack, Typography } from '@mui/material';

interface Props {
    selected: boolean;
    onClick: () => void;
    value: React.ReactNode,
    title: React.ReactNode,
    main: React.ReactNode,
    caption: React.ReactNode,
    action: React.ReactNode
}

function BoxListItem({ selected, onClick, value, title, main, caption, action, }: Props) {

    return (
        <AccountBox
            sx={(theme) => ({
                borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
                backgroundColor: selected
                    ? alpha(theme.palette.primary.main, 0.06)
                    : theme.palette.background.paper,
            })}
            onClick={onClick}
        >
            <Stack direction="row" spacing={1} alignItems="flex-start">
                <Radio checked={selected} value={value} size="small" />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        { title ? <Box sx={{ minWidth: 0 }}>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                {title}
                            </Typography>
                        </Box> : null }
                        { action ? <Stack direction="row" spacing={0.5} alignItems="center">
                            { actions }
                        </Stack> : null }
                    </Stack>

                    { main ? <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 0.5 }}>
                        { main }
                    </Stack> : null }

                    { caption ? <Typography variant="caption" sx={{ opacity: 0.75, marginTop: 0.5 }}>
                        { caption }
                    </Typography> : null }
                </Box>
            </Stack>
        </AccountBox>
    );
}

export default BoxListItem;