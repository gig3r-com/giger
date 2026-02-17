'use client';
import React from 'react';
import { Button, Collapse, Divider, FormControl, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import { AuditEntry, StoredSession } from '../_lib/types';
import { Dock, ClearanceBadge, AuditScroll } from './styles';

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

export function SessionDock({ officer, sessions, sessionId, onLog, onLogout }: {
  officer: { name: string; clearance: 1|2|3 },
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
