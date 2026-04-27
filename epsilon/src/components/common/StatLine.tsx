import React from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';
import type { StatBlock } from '@/app/api/mappers/user';

export interface StatLineProps {
  label: string;
  value: StatBlock | undefined;
  min?: number;
  max: number;
  suffix?: string;
}

function StatLine({ label, value, min = 0, max, suffix }: StatLineProps) {
  const raw = typeof value?.stat === 'number' ? value.stat : 0;
  const clamped = Math.max(min, Math.min(max, raw));
  const pct = max === min ? 0 : Math.round(((clamped - min) / (max - min)) * 100);

  return (
    <Stack spacing={0.5} sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {clamped}
          {suffix ? ` ${suffix}` : ''}
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={pct} />
    </Stack>
  );
}

export default StatLine;