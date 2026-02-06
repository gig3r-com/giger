import React, { memo } from 'react';
import { Divider, Stack } from '@mui/material';
import Message from '../Message';

interface MessageWrapperProps {
  index: number;
}

function MessageWrapper({ index }: MessageWrapperProps) {

  return (
    <Stack direction="row" alignItems="flex-start" spacing={ 1 }>
      <Stack sx={{ flex: 1 }}>
        <Message index={ index } />
        <Divider sx={{ mt: 0.5, opacity: 0.2 }} />
      </Stack>
    </Stack>
  )
}

export default memo(MessageWrapper);