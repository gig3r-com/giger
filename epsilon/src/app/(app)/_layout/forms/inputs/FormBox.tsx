import React from 'react';
import { Box } from '@mui/material';

export function FormBox({ children }: { children: React.ReactNode }) {
    return (
        <Box
            onFocus={ () => console.log('test') }
            sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, } }
        >
            <input />
            { children }
        </Box>
    );
}

export default FormBox;