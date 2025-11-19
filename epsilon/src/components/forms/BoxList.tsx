import React from 'react';
import { Stack } from '@mui/material';

function BoxList({ children }: { children: React.ReactNode }) {
    return (
        <Stack spacing={1.25}>
            { children }
        </Stack>
    );
}

export default BoxList;