import React from 'react';
import Message from './Message';
import { Box, Stack } from '@mui/material';

export function MessageWrapper({ index, side }: { index: number, side: 'left' | 'right' }) {

    return (
        <Stack direction={ side === 'left' ? 'row-reverse' : 'row' }
               sx={ { p: '8px', } }
        >
            <Box flex={1}/>
            <Message index={ index } side={ side }/>
        </Stack>
    );
}

export default MessageWrapper;