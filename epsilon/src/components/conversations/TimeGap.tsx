'use client';

import * as React from 'react';
import { Box, Divider, Typography, Stack, Button } from '@mui/material';
import dayjs from 'dayjs';
import { useConversations } from '@/contexts/conversations';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';

type MsgLike = { id: string | number; date: string | null; text?: string };

function formatGap(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${h % 24}h ${m % 60}m later`;
  if (h > 0) return `${h}h ${m % 60}m later`;
  if (m > 0) return `${m}m ${s % 60}s later`;
  if (s > 0) return `${s}s later`;
  return '';
}

// Reading ~25 cps, writing ~18 cps, + small slack; scale by preset, add jitter.
function estimateDelaySec(prevText = '', nextText = '', preset: 'fast' | 'medium' | 'slow') {
  const readSec = prevText.length / 25;
  const writeSec = nextText.length / 18;
  const base = Math.max(5, readSec + writeSec + 3);
  const scale = preset === 'fast' ? 0.6 : preset === 'medium' ? 1.0 : 1.6;
  const jitter = 0.85 + Math.random() * 0.35; // 0.85–1.2
  return Math.round(base * scale * jitter);
}

function clampWithin(nextTarget: dayjs.Dayjs, prevISO: string, nextISOBound?: string | null) {
  let t = nextTarget;
  const prev = dayjs(prevISO);
  if (t.isBefore(prev)) t = prev.add(1, 'second');
  if (nextISOBound && dayjs(nextISOBound).isValid()) {
    const bound = dayjs(nextISOBound);
    if (!t.isBefore(bound)) t = bound.subtract(1, 'second');
  }
  return t;
}

export default function TimeGap({
                                  prevISO,
                                  nextMsg,
                                  nextISOBound,
                                }: {
  prevISO: string | null;
  nextMsg: MsgLike | null;
  nextISOBound?: string | null;
}) {
  const { selected, changeMessage } = useConversations();

  if (!prevISO || !nextMsg) return null;
  const prev = dayjs(prevISO);
  const next = nextMsg.date ? dayjs(nextMsg.date) : null;
  if (!prev.isValid() || (nextMsg.date && !next?.isValid())) return null;

  const ms = next ? next.diff(prev, 'millisecond') : 0;
  const gapText = ms > 0 ? formatGap(ms) : '—';
  const whenText = (next ?? prev.add(estimateDelaySec('', nextMsg.text ?? '', 'fast'), 'second')).format('MMM D, HH:mm');

  const applyGap = (preset: 'fast' | 'medium' | 'slow') => {
    if (!selected) return;
    const seconds = estimateDelaySec('', nextMsg.text ?? '', preset);
    const unclamped = prev.add(seconds, 'second');
    const clamped = clampWithin(unclamped, prevISO!, nextISOBound);

    const form = useConversationForm();
    form.setFieldValue(
      'messages',
      form.values.messages.map((m) => (m.id === nextMsg.id ? { ...m, date: clamped.toDate().toISOString() } : m)),
    );

    // changeMessage(selected.id, { ...nextMsg, date: clamped.toDate().toISOString() } as any);
  };

  return (
    <Box sx={{ my: 1, position: 'relative' }}>
      <Divider sx={(t) => ({ opacity: 0.5, borderColor: t.palette.divider })} />
      <Box
        sx={(t) => ({
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translate(-50%, -50%)',
          px: 1,
          py: 0.25,
          borderRadius: 1,
          border: `1px solid ${t.palette.divider}`,
          background:
            'linear-gradient(180deg, rgba(17,22,29,.92), rgba(21,28,36,.92))',
        })}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {gapText} — {whenText}
          </Typography>
          <Stack direction="row" spacing={0.25}>
            <Button size="small" variant="text" onClick={() => applyGap('fast')} sx={{ minWidth: 0, p: 0.2 }}>
              <Typography variant="caption">(fast)</Typography>
            </Button>
            <Button size="small" variant="text" onClick={() => applyGap('medium')} sx={{ minWidth: 0, p: 0.2 }}>
              <Typography variant="caption">(medium)</Typography>
            </Button>
            <Button size="small" variant="text" onClick={() => applyGap('slow')} sx={{ minWidth: 0, p: 0.2 }}>
              <Typography variant="caption">(slow)</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
