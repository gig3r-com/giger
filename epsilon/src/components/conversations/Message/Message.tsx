'use client';
import React, { memo, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import {
  Stack, Divider, Collapse
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import Bubble, { ControlType } from '@/components/common/Bubble/Bubble';
import Date from './comopnents/Date';
import SenderSelect from './comopnents/SenderSelect';
import TypeSelect from './comopnents/TypeSelect';
import HackerSelect from './comopnents/HackerSelect';
import HackingSelect from './comopnents/HackingSelect';
import MessageNote from './comopnents/MessageNote';
import MessageBody from './comopnents/MessageBody';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SecurityIcon from '@mui/icons-material/Security';
import PestControlIcon from '@mui/icons-material/PestControl';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface MessageProps {
  index: number;
  participants: string[];
  mainHandle: boolean;
  controls: ControlType[];
}

function Message(props: MessageProps) {
  const { index, mainHandle, nudgeUp, nudgeDown, onDelete, } = props;
  const [hacker] = useField(`messages[${index}].hack.by`);
  const [maxMessages] = useField(`messages.length`);
  const isHacked = !!hacker.value;
  const senderColor = mainHandle ? '#b6ff2e' : '#89a3ff';
  const controls: ControlType[] = [
    {
      tooltip: 'Make earlier (before previous)',
      icon: ArrowUpwardIcon,
      disabled: index === 0,
      onClick: () => nudgeUp(index),
    },
    {
      tooltip: 'Make later (after next)',
      icon: ArrowDownwardIcon,
      disabled: index - 1 === maxMessages.value,
      onClick: () => nudgeDown(index),
    },
    {
      tooltip: isHacked ? 'Make message authentic' : 'Make message hacked',
      icon: isHacked ? SecurityIcon : PestControlIcon,
      color: isHacked ? 'success' : 'error',
      disabled: false,
      onClick: () => onDelete(index),
    },
    {
      tooltip: 'Delete',
      icon: DeleteOutlineIcon,
      color: 'error',
      disabled: false,
      onClick: () => onDelete(index),
    },
  ]

  return (
    <Bubble index={ index } vertical="center" horizontal={ mainHandle ? 'right' : 'left' } color={ senderColor } secondaryColor={ isHacked ? '#B00020' : undefined } controls={ controls }>
      <Stack direction="row" spacing={ 1 }>
        <div style={{ flex: 2 }} />
        <Date index={ index } />
      </Stack>

      <Stack direction="row" spacing={ 1 }>
        <TypeSelect value="text" />
        <SenderSelect index={ index } />
      </Stack>

      {/*<Collapse in={ isHacked } unmountOnExit>*/}
      {/*  <Stack direction="row" spacing={ 1 }>*/}
      {/*    <HackingSelect value="0" />*/}
      {/*    <HackerSelect value={ hacker } options={ hackers } onChange={ changeHacker } />*/}
      {/*  </Stack>*/}
      {/*</Collapse>*/}

      <Divider sx={{ opacity: 0.45 }} />

      <MessageBody index={ index } />
      <MessageNote index={ index } />
    </Bubble>
  );
}

export default memo(Message);