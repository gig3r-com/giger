import React from 'react';
import { Paper, Typography } from '@mui/material';

export interface MessageListProps {
  messages: [];
}

function MessageList({ messages, }: MessageListProps) {

  if (!messages.length) {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography color="text.secondary">No messages yet — add one!</Typography>
      </Paper>
    )
  }

  const prev = index > 0 ? sorted[index - 1].m : null;
  const next = index < sorted.length - 1 ? sorted[index + 1].m : null;
  const mainHandle = !!(uiMainHandle && m.sender === uiMainHandle);

  return messages.map((message, index) => {
    // test
  });
}

export default MessageList;