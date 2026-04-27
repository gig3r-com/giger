'use client';
import React, { memo, useCallback, useMemo } from 'react';
import { useField, useFormikContext } from 'formik';
import { formatDistance } from 'date-fns';
import {
  Stack, Divider, Box, Button, Typography, Collapse
} from '@mui/material';
import Bubble, { ControlType } from '@/components/common/Bubble/Bubble';
import Date from './comopnents/Date';
import SenderSelect from './comopnents/SenderSelect';
import HackerSelect from './comopnents/HackerSelect';
import TypeSelect from './comopnents/TypeSelect';
import MessageNote from './comopnents/MessageNote';
import MessageBody from './comopnents/MessageBody';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SecurityIcon from '@mui/icons-material/Security';
import PestControlIcon from '@mui/icons-material/PestControl';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useConversations } from '@/components/modules/conversations/context';
import type { EnhancedConversationType, EnhancedMessageType } from '@/types';

interface MessageProps {
  index: number;
}

function Message(props: MessageProps) {
  const { index } = props;

  const { uiMainHandle } = useConversations();

  // Fields
  const [hackerField, , hackerHelpers] = useField<string | null>(`messages[${index}].hacker`);
  const [dateField] = useField<string | null>(`messages[${index}].date`);
  const [prevDateField] = useField<string | null>(`messages[${index-1}].date`);
  const [senderField] = useField<string>(`messages[${index}].sender`);
  const [{ value: hackers }] = useField<string>(`hackers`);

  // Access full messages array for reorders/deletes
  const { values, setFieldValue } = useFormikContext<EnhancedConversationType>();
  const messages = values.messages ?? [];
  const maxLen = messages.length;

  // Derived UI flags
  const isMainHandle = uiMainHandle === senderField.value;
  const isHacked = Boolean(hackerField.value);
  const senderColor = isMainHandle ? '#b6ff2e' : '#89a3ff';

  /* ---------- Controls: handlers (stable) ---------- */

  const moveMessage = useCallback((from: number, to: number) => {
    if (to < 0 || to >= maxLen || from === to) return;
    const next = messages.slice();
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setFieldValue('messages', next);
  }, [messages, maxLen, setFieldValue]);

  const nudgeUp = useCallback(() => {
    moveMessage(index, index - 1);
  }, [index, moveMessage]);

  const nudgeDown = useCallback(() => {
    moveMessage(index, index + 1);
  }, [index, moveMessage]);

  const toggleHacked = useCallback(() => {
    hackerHelpers.setValue(isHacked ? '' : hackers?.length ? hackers[0] : 'null');
  }, [hackerHelpers, isHacked]);

  const deleteMessage = useCallback(() => {
    if (index < 0 || index >= maxLen) return;
    const next = messages.slice(0, index).concat(messages.slice(index + 1));
    setFieldValue('messages', next);
  }, [index, maxLen, messages, setFieldValue]);

  const handleAddMessageBelow = useCallback(() => {
    const newMsg: EnhancedMessageType = {
      id: crypto.randomUUID(),
      date: dateField.value ?? '',
      sender: senderField.value ?? uiMainHandle ?? '',
      hacker: hackerField.value ?? '',
      text: '',
      note: '',
    };
    const next = messages.slice();
    next.splice(index + 1, 0, newMsg);
    setFieldValue('messages', next);
  }, [messages, index, setFieldValue, senderField.value, uiMainHandle]);

  /* ---------- Controls config (memoized) ---------- */

  const controls: ControlType[] = useMemo(() => {
    return ([
      {
        tooltip: 'Make earlier (before previous)',
        icon: ArrowUpwardIcon,
        disabled: index === 0,
        onClick: nudgeUp,
      },
      {
        tooltip: 'Make later (after next)',
        icon: ArrowDownwardIcon,
        disabled: index + 1 === maxLen,
        onClick: nudgeDown,
      },
      {
        tooltip: isHacked ? 'Make message authentic' : 'Make message hacked',
        icon: isHacked ? SecurityIcon : PestControlIcon,
        color: isHacked ? 'success' : 'error',
        disabled: false,
        onClick: toggleHacked,
      },
      {
        tooltip: 'Delete',
        icon: DeleteOutlineIcon,
        color: 'error',
        disabled: false,
        onClick: deleteMessage,
      },
    ])
  }, [index, maxLen, isHacked, nudgeUp, nudgeDown, toggleHacked, deleteMessage]);

  /* ---------- Render ---------- */

  return (
    <>
      <Bubble
        index={ index }
        vertical="center"
        horizontal={ isMainHandle ? 'right' : 'left' }
        color={ senderColor }
        secondaryColor={ isHacked ? '#B00020' : undefined }
        controls={ controls }
      >
        <Stack direction="row" spacing={ 1 }>
          { index > 0 ? <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.9, flex: 2 }}>
            {
              dateField.value === prevDateField.value ?
                'same time'
                :
                formatDistance(dateField.value, prevDateField.value, { addSuffix: true, includeSeconds: true, })
            }
          </Typography> : <div style={{ flex: 2 }} /> }
          <Date index={ index } />
        </Stack>

        <Stack direction="row" spacing={ 1 }>
          <TypeSelect value="text" />
          <SenderSelect index={ index } />
        </Stack>

        <Divider sx={{ opacity: 0.45 }} />

        <MessageBody index={ index } />
        <MessageNote index={ index } />

        <Collapse in={!!hackerField.value}>
          <Divider sx={{ my: 1, opacity: 0.45 }} />
          <Stack direction="row" spacing={ 1 }>
            <TypeSelect value="text" />
            <HackerSelect index={ index } />
          </Stack>
        </Collapse>
      </Bubble>
      <Box sx={{ display: 'flex', justifyContent: isMainHandle ? 'flex-end' : 'flex-start', mt: 0.25 }}>
        <Button
          size="small"
          variant="text"
          startIcon={ <AddIcon fontSize="small" /> }
          onClick={ handleAddMessageBelow }
        >
          Add message below
        </Button>
      </Box>
    </>
  );
}

export default memo(Message);
