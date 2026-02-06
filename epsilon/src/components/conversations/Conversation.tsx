'use client';

import React, { useMemo } from 'react';
import {
  Box, Stack, Paper, Typography, Button, IconButton, Tooltip, Divider, Alert, Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Message from '@/components/conversations/Message';
import TimeGap from '@/components/conversations/TimeGap';
import { useConversations } from '@/contexts/conversations';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import SecurityIcon from '@mui/icons-material/Security';
import PestControlIcon from '@mui/icons-material/PestControl';
import { ControlsProvider, ControlType } from '@/components/common/Bubble';

function midpointISO(a?: string | null, b?: string | null): string | null {
  const da = a && dayjs(a).isValid() ? +dayjs(a) : null;
  const db = b && dayjs(b).isValid() ? +dayjs(b) : null;
  if (da && db) return new Date(da + Math.floor((db - da) / 2)).toISOString();
  if (da && !db) return new Date(da + 60_000).toISOString();
  if (!da && db) return new Date(db - 60_000).toISOString();
  return new Date().toISOString();
}

export default function Conversation() {
  const { uiMainHandle, showTimestamps, focusedMessageId, setFocusedMessageId } = useConversations();
  const form = useConversationForm();
  const values = form.values;

  const columnStyles = { flex: 1, minWidth: 0, px: { xs: 0, md: 2 }, maxWidth: 1100, mx: 'auto' as const };

  const participants = values.participants ?? [];

  const sorted = useMemo(() => {
    const withIndex = (values.messages ?? []).map((m, i) => ({ m, i }));
    withIndex.sort((a, b) => {
      const da = a.m?.date && dayjs(a.m.date).isValid() ? +dayjs(a.m.date) : Infinity;
      const db = b.m?.date && dayjs(b.m.date).isValid() ? +dayjs(b.m.date) : Infinity;
      if (da === db) return a.i - b.i;
      return da - db;
    });
    return withIndex;
  }, [values.messages]);

  const warnings = useMemo(() => {
    const w: string[] = [];
    const unknown = (values.messages ?? []).filter((m) => m.sender && !participants.includes(m.sender));
    if (unknown.length) w.push(`${unknown.length} message(s) by unknown participant(s)`);
    const invalidDates = (values.messages ?? []).filter((m) => !m.date || !dayjs(m.date).isValid());
    if (invalidDates.length) w.push(`${invalidDates.length} message(s) missing/invalid date`);
    return w;
  }, [values.messages, participants]);

  const addAtEnd = () => {
    const msgs = values.messages ?? [];
    const last = sorted.length ? sorted[sorted.length - 1].m : null;
    const date = midpointISO(last?.date ?? null, null);
    form.setFieldValue('messages', [
      ...msgs,
      {
        id: crypto.randomUUID(),
        sender: participants[0] ?? '',
        text: '',
        note: '',
        date,
      },
    ]);
  };

  const nudgeUp = (index: number) => {
    if (index === 0) return;
    const cur = sorted[index].m;
    const prev = sorted[index - 1].m;
    if (!prev?.date) return;
    const newDate = dayjs(prev.date).subtract(1, 'second').toISOString();
    form.setFieldValue(
      'messages',
      values.messages.map((m) => (m.id === cur.id ? { ...m, date: newDate } : m)),
    );
  };

  const nudgeDown = (index: number) => {
    if (index >= sorted.length - 1) return;
    const cur = sorted[index].m;
    const nxt = sorted[index + 1].m;
    if (!nxt?.date) return;
    const newDate = dayjs(nxt.date).add(1, 'second').toISOString();
    form.setFieldValue(
      'messages',
      values.messages.map((m) => (m.id === cur.id ? { ...m, date: newDate } : m)),
    );
  };

  const addBelow = (m: any, next?: any) => {
    const date = midpointISO(m?.date ?? null, next?.date ?? null);
    const newMsg = {
      id: crypto.randomUUID(),
      sender: m?.sender ?? participants[0] ?? '',
      text: '',
      note: '',
      date,
    };
    const indexOriginal = values.messages.findIndex((x) => x.id === m.id);
    const copy = [...values.messages];
    copy.splice(indexOriginal + 1, 0, newMsg);
    form.setFieldValue('messages', copy);
  };

  const onDelete = (id: string | number) => {
    form.setFieldValue('messages', values.messages.filter((m) => m.id !== id));
  };

  const controls: ControlType[] = [
    {
      tooltip: 'Make earlier (before previous)',
      icon: ArrowUpwardIcon,
      disabled: isFirst,
      onClick: () => nudgeUp(index),
    },
    {
      tooltip: 'Make later (after next)',
      icon: ArrowDownwardIcon,
      disabled: isLast,
      onClick: () => nudgeDown(index),
    },
    {
      tooltip: isHacked ? 'Make message authentic' : 'Make message hacked',
      icon: isHacked ? SecurityIcon : PestControlIcon,
      color: isHacked ? 'success' : 'error',
      disabled: false,
      onClick: () => onDelete(id),
    },
    {
      tooltip: 'Delete',
      icon: DeleteOutlineIcon,
      color: 'error',
      disabled: false,
      onClick: (index) => onDelete(index),
    },
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {!values ? (
          <Paper variant="outlined" sx={(t) => ({ p: 4, borderRadius: 2, borderStyle: 'dashed', borderColor: t.palette.divider, textAlign: 'center' })}>
            <Typography color="text.secondary">Pick or load a conversation to begin.</Typography>
          </Paper>
        ) : (
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
                {values.title ?? `Conversation`}
              </Typography>
              {(values.tags?.length ?? 0) > 0 && (
                <Stack direction="row" spacing={0.5}>
                  {values.tags!.map((t) => <Chip key={t} label={t} size="small" variant="outlined" />)}
                </Stack>
              )}
              <Tooltip title="Add message at end">
                <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addAtEnd}>
                  Add message
                </Button>
              </Tooltip>
            </Stack>

            {warnings.length > 0 && (
              <Alert severity="warning" variant="outlined">
                {warnings.join(' • ')}
              </Alert>
            )}

            {sorted.length === 0 ? (
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Typography color="text.secondary">No messages yet — add one!</Typography>
              </Paper>
            ) : (
              <ControlsProvider controls={ controls }>
                { sorted.flatMap(({ m }, index) => {
                  const prev = index > 0 ? sorted[index - 1].m : null;
                  const next = index < sorted.length - 1 ? sorted[index + 1].m : null;
                  const mainHandle = !!(uiMainHandle && m.sender === uiMainHandle);

                  return [
                    index > 0 ? (
                      <TimeGap
                        key={`gap-${sorted[index - 1].i}-${sorted[index].i}`}
                        prevISO={prev?.date ?? null}
                        nextMsg={m}
                        nextISOBound={next?.date ?? null}
                      />
                    ) : null,

                    <Box key={m.id}>
                      <Stack direction="row" alignItems="flex-start" spacing={ 1 }>
                        <Stack sx={{ flex: 1 }}>
                          <Message index={ index } mainHandle={ mainHandle } />
                          {/*<Box sx={{ display: 'flex', justifyContent: mainHandle ? 'flex-end' : 'flex-start', mt: 0.25 }}>*/}
                          {/*  <Button*/}
                          {/*    size="small"*/}
                          {/*    variant="text"*/}
                          {/*    startIcon={<AddIcon fontSize="small" />}*/}
                          {/*    onClick={() => addBelow(m, next)}*/}
                          {/*  >*/}
                          {/*    Add message below*/}
                          {/*  </Button>*/}
                          {/*</Box>*/}
                          <Divider sx={{ mt: 0.5, opacity: 0.2 }} />
                        </Stack>
                      </Stack>
                    </Box>,
                  ];
                } ) }
              </ControlsProvider>
            )}
          </Stack>
        )}
    </LocalizationProvider>
  );
}
