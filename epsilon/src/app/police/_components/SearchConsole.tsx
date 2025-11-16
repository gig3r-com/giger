'use client';
import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import {
  Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton, InputAdornment, OutlinedInput, Paper, Stack, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { apiGetDossier, apiSearch } from '../_lib/mockApi';
import { CriminalEvent, SearchBuckets, Subject } from '../_lib/types';
import { highlight } from '../_lib/highlight';

const fmt = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
const threatLabel = (s: 0|1|2|3) => ['LOW', 'MODERATE', 'HIGH', 'EXTREME'][s];
const typeColor = (t: 'HUMAN'|'ANDROID'|'AI') => t==='HUMAN' ? 'default' : t==='ANDROID' ? 'warning' : 'secondary';
const threatColor = (s: 0|1|2|3) => (['default','warning','error','secondary'] as const)[s];

const CenterWrap = styled(Box)({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: 12,
  minHeight: 'calc(100svh - 160px)'
});

const SearchCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  padding: 14,
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(180deg, rgba(8,12,22,.92), rgba(10,15,26,.96))',
}));

const sweep = keyframes`
    0% { transform: translateY(-100%) }
    100% { transform: translateY(100%) }
`;
const Scanline = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, transparent 0%, rgba(88,166,255,.06) 50%, transparent 100%)',
  transform: 'translateY(-100%)',
  animation: `${sweep} 2.4s linear infinite`,
  pointerEvents: 'none'
}));

const ConsoleArea = styled(Box)({
  position: 'relative',
  minHeight: 0
});

const ResultsWrap = styled('div')({
  display: 'grid',
  gap: 12
});

const Category = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: 10,
  background: 'linear-gradient(180deg, rgba(8,12,22,.9), rgba(10,15,26,.96))'
}));

const Cards = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
  gap: 10,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' }
});

const ResCard = styled('div')(({ theme }) => ({
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: '10px 12px',
  background: 'linear-gradient(180deg, rgba(7,12,24,.78), rgba(10,16,28,.9))',
  transition: 'transform .12s ease, box-shadow .12s ease, border-color .12s ease',
  cursor: 'pointer',
  '&:hover': { transform: 'translateY(-1px)', boxShadow: `0 6px 22px rgba(0,0,0,.35), 0 0 0 3px ${theme.palette.primary.main}20` },
  '&.locked': { borderColor: '#ff386480' }
}));

const LockBanner = styled('div')({
  position: 'absolute', right: 8, bottom: 8, fontSize: 11, display: 'flex', alignItems: 'center', color: '#ff3864'
});

export function SearchConsole({
                                officer, onLog
                              }: {
  officer: { name: string; clearance: 1|2|3|4|5 },
  onLog: (m:string)=>void
}) {
  const [q, setQ] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string|null>(null);
  const [results, setResults] = React.useState<SearchBuckets|null>(null);
  const [mode, setMode] = React.useState<'search'|'dossier'>('search');
  const [selected, setSelected] = React.useState<Subject|null>(null);
  const [dossierLoading, setDossierLoading] = React.useState(false);
  const [overrideOpen, setOverrideOpen] = React.useState(false);
  const [overrideCode, setOverrideCode] = React.useState('');
  const [unlocked, setUnlocked] = React.useState<Record<string, boolean>>({});

  const total = results ? Object.values(results).flat().length : 0;

  async function runSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    setMode('search');
    setSelected(null);
    try {
      const buckets = await apiSearch(query);
      setResults(buckets);
      onLog(`SEARCH: "${query}"`);
    } catch (err: any) {
      setError(err?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  async function openDossier(s: Subject) {
    setError(null);
    setDossierLoading(true);
    try {
      const fresh = await apiGetDossier(s.handle);
      setSelected(fresh);
      setMode('dossier');
      onLog(`OPEN: dossier @${fresh.handle}`);
    } catch (err:any) {
      setError(err?.message || 'Failed to load dossier');
    } finally {
      setDossierLoading(false);
    }
  }

  const canView = selected ? (officer.clearance >= selected.clearanceRequired || unlocked[selected.handle]) : false;

  function tryUnlock() {
    if (!selected) return;
    if (overrideCode.trim().toLowerCase() === 'omega-override') {
      setUnlocked(u => ({ ...u, [selected.handle]: true }));
      onLog(`Temporary unlock for @${selected.handle}`);
      setOverrideOpen(false);
    } else {
      setOverrideCode('');
      setError('Override denied.');
    }
  }

  return (
    <CenterWrap>
      <SearchCard elevation={0}>
        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

        <form onSubmit={runSearch}>
          <OutlinedInput
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder='Type a query (name, handle, faction, or anything from criminal records) • Press Enter'
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" onClick={()=>runSearch()} disabled={loading}>
                  {loading ? 'Scanning…' : 'Search'}
                </Button>
              </InputAdornment>
            }
            fullWidth
          />
        </form>
        <Scanline />
        <Typography variant="caption" color="text.secondary" sx={{ mt: .75 }}>
          Tip: try <code>moth</code>, <code>ghostmarket</code>, <code>breach</code>, <code>assault</code>…
        </Typography>
      </SearchCard>

      <ConsoleArea>
        {loading && (
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={18} />
              <Typography variant="body2">Scanning database…</Typography>
            </Stack>
          </Paper>
        )}

        {!loading && mode==='search' && results && (
          <Results
            q={q}
            buckets={results}
            total={total}
            officerClearance={officer.clearance}
            onOpen={openDossier}
          />
        )}

        {!loading && mode==='search' && !results && (
          <Paper sx={{ p: 2, display:'grid', placeItems:'center' }}>
            <Typography variant="body2" color="text.secondary">Enter a query to scan the database.</Typography>
          </Paper>
        )}

        {!loading && mode==='dossier' && selected && (
          <Paper sx={{ p: 1.25 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ArrowBackIosNewIcon/>}
              onClick={()=> setMode('search')}
              sx={{ mb: 1 }}
            >
              Back to results
            </Button>

            <Dossier
              subject={selected}
              canView={canView}
              onCopy={(t)=>{ navigator.clipboard?.writeText(t); onLog('Copied to clipboard'); }}
              onExport={()=>{
                const blob = new Blob([JSON.stringify(selected,null,2)], { type:'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `${selected.surname}_${selected.name}_${selected.handle}.json`;
                a.click(); URL.revokeObjectURL(url);
                onLog(`Exported dossier: @${selected.handle}`);
              }}
              onOverride={()=> setOverrideOpen(true)}
              onViewedEvent={(name)=> onLog(`Viewed event: ${name}`)}
              loading={dossierLoading}
            />

            <Dialog open={overrideOpen} onClose={()=>setOverrideOpen(false)}>
              <DialogTitle>Temporary Unlock Request</DialogTitle>
              <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{mb:1}}>
                  Enter override code (logged). Dev code: <code>omega-override</code>
                </Typography>
                <OutlinedInput fullWidth value={overrideCode} onChange={(e)=>setOverrideCode(e.target.value)} placeholder="Override Code" />
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setOverrideOpen(false)}>Cancel</Button>
                <Button onClick={tryUnlock} variant="contained" color="secondary">Unlock</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        )}
      </ConsoleArea>
    </CenterWrap>
  );
}

function Results({
                   q, buckets, total, officerClearance, onOpen
                 }: {
  q: string;
  buckets: SearchBuckets;
  total: number;
  officerClearance: 1|2|3|4|5;
  onOpen: (s: Subject)=>void;
}) {
  const order: Array<keyof SearchBuckets> = ['identity','eventTitle','eventDesc','faction','type'];
  const titles: Record<keyof SearchBuckets, string> = {
    identity: 'Identity Matches',
    eventTitle: 'Criminal Record Titles',
    eventDesc: 'Criminal Record Descriptions',
    faction: 'Factions & Ranks',
    type: 'Subject Type'
  };

  return (
    <ResultsWrap>
      <Paper sx={{ p: 1, borderStyle:'solid', borderWidth:1 }}>
        <Typography variant="caption" fontFamily="ui-monospace, monospace">{total} hit{total===1?'':'s'} found</Typography>
      </Paper>

      {order.map(cat=>{
        const list = buckets[cat];
        if (!list.length) return null;
        return (
          <Category key={cat}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="overline">{titles[cat]}</Typography>
              <Chip size="small" label={list.length}/>
            </Stack>

            <Cards>
              {list.map((item, idx)=>{
                const s = item.subject;
                const locked = officerClearance < s.clearanceRequired;
                const snippet = (() => {
                  if (item.kind==='identity') {
                    const val = (s as any)[item.field] as string;
                    return highlight(val, q);
                  }
                  if (item.kind==='faction') {
                    const val = item.field==='faction' ? s.faction : s.factionRank;
                    return highlight(val, q);
                  }
                  if (item.kind==='type') return highlight(s.type, q);
                  if ('event' in item) {
                    const ev = item.event;
                    const text = item.kind==='eventTitle' ? ev.name : ev.eventDescription;
                    return highlight(text, q, 220);
                  }
                  return '';
                })();

                return (
                  <ResCard key={idx} className={locked ? 'locked':''} onClick={()=>onOpen(s)}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography fontWeight={800}>{s.name} {s.surname}</Typography>
                        <Typography variant="body2" color="text.secondary">@{s.handle}</Typography>
                      </Box>
                      <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" justifyContent="flex-end">
                        <Chip size="small" label={s.type} color={typeColor(s.type) as any} variant="outlined"/>
                        {s.highSecurity && <Chip size="small" label="VIP" color="secondary" variant="filled"/>}
                        <Chip size="small" label={`Threat ${threatLabel(s.combatSkill)}`} color={threatColor(s.combatSkill) as any}/>
                        <ClearanceBadge level={s.clearanceRequired}>L{s.clearanceRequired}</ClearanceBadge>
                      </Stack>
                    </Stack>

                    {'event' in item && (
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: .75 }}>
                        <Chip
                          size="small"
                          label={`${item.event.type} • ${item.event.status}`}
                          color={
                            item.event.type==='WANTED' ? 'secondary' :
                              item.event.type==='SUSPECT' ? 'error' :
                                item.event.type==='PUNISHMENT' ? 'warning' : 'default'
                          }
                          variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary">{fmt.format(new Date(item.event.timeStamp))}</Typography>
                      </Stack>
                    )}

                    <Typography variant="body2" sx={{ mt: .75 }} component="div"
                                dangerouslySetInnerHTML={{ __html: snippet }} />

                    {locked && (
                      <LockBanner><LockIcon fontSize="small"/>&nbsp;Clearance L{s.clearanceRequired} required</LockBanner>
                    )}
                  </ResCard>
                );
              })}
            </Cards>
          </Category>
        );
      })}
    </ResultsWrap>
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

// ────────────────────────────────────────────────────────────────────────────────
// Dossier

const DossierGrid = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: 12,
  minHeight: 0
});
const Identity = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: 12,
  alignItems: 'center'
});
const Avatar = styled('div')(({ theme }) => ({
  width: 56, height: 56, display: 'grid', placeItems: 'center',
  borderRadius: '50%',
  background: 'radial-gradient(closest-side, rgba(88,166,255,.25), rgba(88,166,255,.06))',
  border: `1px solid ${theme.palette.primary.main}66`
}));

const Timeline = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  padding: '8px 8px 8px 18px',
  borderLeft: `2px solid ${theme.palette.primary.main}40`
}));
const EventItemWrap = styled('div')({
  position: 'relative',
  margin: '10px 0 16px 0'
});
const Dot = styled('div')(({ theme }) => ({
  position: 'absolute', left: -11, top: 8, width: 10, height: 10, borderRadius: '50%',
  background: theme.palette.primary.main, boxShadow: `0 0 12px ${theme.palette.primary.main}99`
}));
const EventBody = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: 6,
  border: `1px solid ${theme.palette.primary.main}33`,
  borderRadius: 10,
  background: 'linear-gradient(180deg, rgba(7,12,24,.7), rgba(10,16,28,.78))',
  padding: '10px 12px',
  maxHeight: 140,
  overflow: 'hidden'
}));
const FadeMask = styled('div')({
  position: 'absolute', inset: 'auto 0 0 0', height: 36,
  background: 'linear-gradient(to bottom, rgba(10,16,28,0), rgba(10,16,28,1))',
  pointerEvents: 'none', opacity: .85
});
const RedactedCover = styled('div')({
  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 2
});
const RedactedStripe = styled('div')({
  position: 'absolute', inset: 0,
  background: 'repeating-linear-gradient(-20deg, rgba(255,56,100,.22) 0 14px, rgba(255,56,100,.33) 14px 28px)',
  mixBlendMode: 'multiply',
  backdropFilter: 'blur(2px)'
});
const RedactedMsg = styled(Paper)(({ theme }) => ({
  position: 'relative', zIndex: 1,
  border: `1px solid ${theme.palette.secondary.main}88`,
  background: 'rgba(10,16,28,.9)',
  padding: '12px 14px',
  borderRadius: 12,
  textAlign: 'center'
}));

export function Dossier({
                          subject, canView, loading,
                          onCopy, onExport, onOverride, onViewedEvent
                        }: {
  subject: Subject;
  canView: boolean;
  loading: boolean;
  onCopy: (t: string)=>void;
  onExport: ()=>void;
  onOverride: ()=>void;
  onViewedEvent: (name: string)=>void;
}) {
  const events = React.useMemo(
    () => [...subject.criminalEvents].sort((a,b)=> +new Date(b.timeStamp) - +new Date(a.timeStamp)),
    [subject]
  );

  return (
    <DossierGrid>
      <Identity>
        <Avatar><FingerprintIcon /></Avatar>
        <Box>
          <Typography variant="h5" sx={{ lineHeight: 1.15 }}>
            {subject.name} {subject.surname}{' '}
            <Typography component="span" color="text.secondary">— @{subject.handle}</Typography>
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: .5 }}>
            <Chip size="small" label={subject.type} color={typeColor(subject.type) as any} variant="outlined"/>
            <Chip size="small" label={`${subject.faction} • ${subject.factionRank}`} variant="outlined"/>
            <Chip size="small" label={`Threat ${threatLabel(subject.combatSkill)}`} color={threatColor(subject.combatSkill) as any}/>
            {subject.highSecurity && <Chip size="small" label="HIGH SECURITY" color="secondary"/>}
            <ClearanceBadge level={subject.clearanceRequired}>L{subject.clearanceRequired}</ClearanceBadge>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={()=>onCopy(subject.handle)}><ContentCopyIcon/></IconButton>
          <IconButton onClick={onExport}><DownloadIcon/></IconButton>
          {!canView
            ? <Button startIcon={<LockIcon/>} color="secondary" variant="contained" onClick={onOverride}>Request Unlock</Button>
            : <Chip size="small" icon={<LockOpenIcon/>} label="Access Granted" color="primary" variant="outlined"/>
          }
        </Stack>
      </Identity>

      <Box sx={{ position:'relative', minHeight:0 }}>
        <Typography variant="overline" sx={{ opacity:.8 }}>Criminal Records</Typography>

        {!canView && (
          <RedactedCover>
            <RedactedStripe />
            <RedactedMsg elevation={0}>
              <LockIcon/>
              <Typography variant="subtitle1">REDACTED — Clearance L{subject.clearanceRequired} required</Typography>
              <Stack direction={{ xs:'column', sm:'row' }} spacing={1} sx={{mt:1}}>
                <Button variant="contained" color="secondary" onClick={onOverride}>Temporary Unlock</Button>
              </Stack>
            </RedactedMsg>
          </RedactedCover>
        )}

        <Timeline style={!canView ? { filter:'blur(4px)', pointerEvents:'none', userSelect:'none' } : undefined}>
          {events.map((ev, i)=>(
            <EventItem key={i} ev={ev} onViewed={()=>onViewedEvent(ev.name)} />
          ))}
          {!events.length && <Typography color="text.secondary" sx={{py:2}}>No records available.</Typography>}
        </Timeline>
      </Box>
    </DossierGrid>
  );
}

function EventItem({ ev, onViewed }: { ev: CriminalEvent; onViewed: ()=>void }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{ if (open) onViewed(); }, [open, onViewed]);

  return (
    <EventItemWrap>
      <Dot />
      <Stack direction={{ xs:'column', sm:'row' }} spacing={1} alignItems={{ xs:'flex-start', sm:'center' }} sx={{ pl: .5 }}>
        <Chip
          size="small"
          label={ev.type}
          color={ev.type==='WANTED' ? 'secondary' : ev.type==='SUSPECT' ? 'error' : ev.type==='PUNISHMENT' ? 'warning' : 'default'}
          variant="outlined"
        />
        <Typography fontWeight={700}>{ev.name}</Typography>
        <Chip size="small" label={ev.status} color={ev.status==='CURRENT' ? 'primary':'default'} variant={ev.status==='CURRENT'?'filled':'outlined'} />
        <Typography variant="caption" color="text.secondary" sx={{ ml:'auto' }}>{fmt.format(new Date(ev.timeStamp))}</Typography>
      </Stack>

      <EventBody style={open ? { maxHeight: 1000 } : undefined}>
        <Typography variant="body2" sx={{ whiteSpace:'pre-wrap', lineHeight:1.45 }}>{ev.eventDescription}</Typography>
        {!open && <FadeMask />}
      </EventBody>

      <Box sx={{ pl: .5, mt: .5 }}>
        <Button size="small" variant="text" onClick={()=>setOpen(o=>!o)}>{open ? 'Collapse' : 'Expand'}</Button>
      </Box>
    </EventItemWrap>
  );
}