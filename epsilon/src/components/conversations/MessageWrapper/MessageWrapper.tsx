import React, { memo } from 'react';
import { Divider, Stack } from '@mui/material';
import Message from '@/components/conversations/Message';
import { ControlType } from '@/components/common/Bubble';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SecurityIcon from '@mui/icons-material/Security';
import PestControlIcon from '@mui/icons-material/PestControl';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface MessageWrapperProps {
  index: number;
}

function MessageWrapper({ index }: MessageWrapperProps) {
  // const prev = index > 0 ? sorted[index - 1].m : null;
  // const next = index < sorted.length - 1 ? sorted[index + 1].m : null;
  // const mainHandle = !!(uiMainHandle && m.sender === uiMainHandle);

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