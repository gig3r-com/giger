import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';

function Section({ title, direction, children }: { title: string, direction: 'row' | 'column', children: React.ReactNode }) {
    return (
        <Paper sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2, boxSizing: 'border-box' }}>
            { title ? <Typography variant="h6" className="glitch" data-glitch={title} sx={{ letterSpacing: 1.5, mb: 1 }}>
                { title }
            </Typography> : null }
            <Stack direction={direction} gap={2}>
                { children }
            </Stack>
        </Paper>
    );
}

export default Section;