'use client';
import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { Box, Button, Collapse, Divider, FormControl, MenuItem, Paper, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import { AuditEntry, StoredSession } from '../_lib/types';

const Dock = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: 92,
  zIndex: 4,
  padding: '8px 12px',
  marginBottom: 12,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  background: 'linear-gradient(180deg, rgba(8,12,22,.88), rgba(10,15,26,.95))',
  backdropFilter: 'blur(2px) saturate(120%)'
}));

const AuditScroll = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  minHeight: 120,
  maxHeight: '32vh',
  overflow: 'auto',
  padding: 8,
  background: 'linear-gradient(180deg, rgba(8,12,22,.6), rgba(10,15,26,.7))',
  fontFamily: 'ui-monospace, monospace'
}));

function LiveLogView({ logs }: { logs: AuditEntry[] }) {
  return (
    <AuditScroll>
      {logs.length ? logs.map((l,i)=>(
        <Typography key={i} variant="caption" display="block">
          {new Date(l.t).toLocaleTimeString()}  {l.msg}
        </Typography>
      )) : <Typography variant="caption" color="text.secondary">No entries.</Typography>}
    </AuditScroll>
  );
}

function SessionsHistory({ sessions }: { sessions: StoredSession[] }) {
  const [sel, setSel] = React.useState<StoredSession | null>(sessions.at(-1) ?? null);
  return (
    <>
      <FormControl size="small" sx={{ minWidth: 280, mb: 1 }}>
        <Select
          value={sel?.id ?? ''}
          displayEmpty
          onChange={(e)=> setSel(sessions.find(s=>s.id===String(e.target.value)) ?? null)}
        >
          {sessions.slice().reverse().map(s=>(
            <MenuItem key={s.id} value={s.id}>
              {new Date(s.start).toLocaleString()} — {s.officer} (L{s.clearance})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AuditScroll>
        {sel?.logs?.length ? sel.logs.map((l,i)=>(
          <Typography key={i} variant="caption" display="block">
            {new Date(l.t).toLocaleTimeString()}  {l.msg}
          </Typography>
        )) : <Typography variant="caption" color="text.secondary">No entries.</Typography>}
      </AuditScroll>
    </>
  );
}

export function SessionDock({
                              officer, sessions, sessionId, onLog, onLogout
                            }: {
  officer: { name: string; clearance: 1|2|3|4|5 },
  sessions: StoredSession[],
  sessionId: string,
  onLog: (m:string)=>void,
  onLogout: ()=>void
}) {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<'live'|'history'>('live');

  const live = sessions.find(s => s.id === sessionId)?.logs ?? [];
  const liveCount = live.length;

  return (
    <Dock elevation={open ? 4 : 0}>
      <Stack direction={{ xs:'column', md:'row' }} alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 'auto' }}>
          <TerminalIcon fontSize="small" />
          <Typography variant="overline" sx={{opacity:.8}}>Session Console</Typography>
          <ClearanceBadge level={officer.clearance}>L{officer.clearance}</ClearanceBadge>
          <Typography variant="body2" sx={{ ml: .5 }}>{officer.name}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button size="small" variant={open?'contained':'outlined'} onClick={()=>setOpen(o=>!o)}>
            {open ? 'Hide Logs' : `Show Logs (${liveCount})`}
          </Button>
          {officer.clearance >= 3 && (
            <ToggleButtonGroup size="small" exclusive value={tab} onChange={(_,v)=> v && setTab(v)}>
              <ToggleButton value="live">Live</ToggleButton>
              <ToggleButton value="history"><HistoryIcon fontSize="small" />&nbsp;History</ToggleButton>
            </ToggleButtonGroup>
          )}
          <Button size="small" variant="text" color="secondary" startIcon={<LogoutIcon/>}
                  onClick={()=>{ onLog('LOGOUT'); onLogout(); }}>
            Logout
          </Button>
        </Stack>
      </Stack>

      <Collapse in={open} unmountOnExit>
        <Divider sx={{ my: 1 }} />
        {tab === 'history' && officer.clearance >= 3
          ? <SessionsHistory sessions={sessions} />
          : <LiveLogView logs={live} />
        }
      </Collapse>
    </Dock>
  );
}

const ClearanceBadge = styled('span')<{ level: number }>(({ level, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 34,
  height: 22,
  padding: '0 6px',
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: '.6px',
  borderRadius: 8,
  marginLeft: 6,
  border: `1px solid ${theme.palette.primary.main}80`,
  background: 'linear-gradient(180deg, rgba(7,12,24,.85), rgba(10,16,28,.9))',
  boxShadow: `0 0 16px ${theme.palette.primary.main}30`,
  color: ['#bcdcff','#a6d1ff','#7fbaff','#5ea8ff','#3a96ff'][Math.max(0,Math.min(4,level-1))]
}));
