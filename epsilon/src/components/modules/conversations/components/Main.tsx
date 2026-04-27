import React, { useCallback } from 'react';
import { useField } from 'formik';
import { Paper, Typography, Stack, Button } from '@mui/material';
import Messages from '@/components/modules/conversations/components/Messages';
import { useConversations } from '@/components/modules/conversations/context';
import type { EnhancedMessageType } from '@/types';

function Main() {
  const { selected } = useConversations();
  const [messagesField, , messagesHelpers] = useField<EnhancedMessageType[]>('messages');

  const addMessage = useCallback((atEnd?: boolean) => {
    const current = Array.isArray(messagesField.value) ? messagesField.value : [];

    const newMsg: EnhancedMessageType = {
      id: crypto.randomUUID(),
      date: '',
      sender: '',
      hacker: '',
      text: '',
      note: '',
    };

    if (current.length > 0) {
      const first = current[0];
      const last = current[current.length - 1];
      const ref = atEnd ? last : first;
      newMsg.date = ref?.date ?? '';
      newMsg.sender = ref?.sender ?? '';
    }

    const next = atEnd ? [...current, newMsg] : [newMsg, ...current];
    messagesHelpers.setValue(next);
  }, [messagesField.value, messagesHelpers]);

  if (!selected) {
    return (
      <Paper
        variant="outlined"
        sx={(t) => ({
          width: '100%',
          p: 4,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: t.palette.divider,
          textAlign: 'center',
        })}
      >
        <Typography color="text.secondary">Pick or load a conversation to begin.</Typography>
      </Paper>
    );
  }

  if (Array.isArray(messagesField.value) && !messagesField.value.length) {
    return (
      <Stack spacing={1.5}>
        <Paper
          variant="outlined"
          sx={(t) => ({
            width: '100%',
            p: 4,
            borderRadius: 1,
            borderStyle: 'dashed',
            borderColor: t.palette.divider,
            textAlign: 'center',
          })}
        >
          <Typography color="text.secondary">No messages yet — add one!</Typography>
        </Paper>
        <Button fullWidth onClick={() => addMessage()}>Add new message</Button>
      </Stack>
    );
  }

  return (
    <Stack flex={1} spacing={1.5}>
      <Button fullWidth onClick={() => addMessage()}>Add new message</Button>
      <Messages />
      <Button fullWidth onClick={() => addMessage(true)}>Add new message</Button>
    </Stack>
  );
}

export default Main;
