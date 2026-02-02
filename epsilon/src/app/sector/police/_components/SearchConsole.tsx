'use client';
import React, { useState } from 'react';
import {
  Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, InputAdornment, OutlinedInput, Paper, Stack, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { getDossier, searchAll } from '../../_api/policeApi';
import { SearchBuckets, Subject } from '../_lib/types';
import { apiSearch } from '../_lib/policeApi';
import { CenterWrap, SearchCard, ConsoleArea, Scanline, } from './styles';
import Results from './Results';
import Dossier from './Dossier';

interface SearchConsoleProps {
  officer: { name: string; clearance: 1|2|3 },
  onLog: (m:string) => void
}

export function SearchConsole({ officer, onLog }: SearchConsoleProps) {
  const [q, setQ] = useState('');
  const [appliedQ, setAppliedQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [results, setResults] = useState<SearchBuckets|null>(null);
  const [mode, setMode] = useState<'search'|'dossier'>('search');
  const [selected, setSelected] = useState<Subject|null>(null);
  const [dossierLoading, setDossierLoading] = useState(false);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [overrideCode, setOverrideCode] = useState('');
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});

  const total = results ? Object.values(results).flat().length : 0;

  async function runSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    const query = q.trim();
    if (query?.length < 4) return;
    setLoading(true);
    setMode('search');
    setSelected(null);
    setAppliedQ(query.toLowerCase());
    try {
      const buckets = await apiSearch(query);
      console.log({ buckets })
      setResults(buckets);
      onLog(`SEARCH: "${query}"`);
    } catch (err: any) {
      setError(err?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  async function openDossier(subject: Subject) {
    setError(null);
    setDossierLoading(true);
    try {
      setSelected(subject);
      setMode('dossier');
      onLog(`OPEN: dossier @${subject.handle}`);
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
        { error && <Alert severity='error' sx={{ mb: 1 }}>{ error }</Alert> }

        <form onSubmit={ runSearch }>
          <OutlinedInput value={ q } onChange={ (e) => setQ(e.target.value) }
            placeholder='Type a query (name, handle, faction, or anything from criminal records) • Minimum 4 characters • Press Enter'
            startAdornment={ <InputAdornment position="start"><SearchIcon/></InputAdornment> }
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" onClick={ () => runSearch()} disabled={loading} >
                  { loading ? 'Scanning…' : 'Search' }
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
        { loading && (
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={18} />
              <Typography variant="body2">Scanning database…</Typography>
            </Stack>
          </Paper>
        ) }

        { !loading && mode==='search' && results && (
          <Results q={appliedQ} buckets={results} total={total} officerClearance={officer.clearance} onOpen={openDossier} />
        ) }

        { !loading && mode==='search' && !results && (
          <Paper sx={{ p: 2, display:'grid', placeItems:'center' }}>
            <Typography variant="body2" color="text.secondary">Enter a query to scan the database.</Typography>
          </Paper>
        )}

        { !loading && mode==='dossier' && selected && (
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