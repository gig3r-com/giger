import { Subject } from '@/app/sector/police/_lib/types';
import React from 'react';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EventItem from './EventItem';
import { DossierGrid, Identity, Avatar, ClearanceBadge, RedactedCover, RedactedStripe, RedactedMsg, Timeline } from './styles';

const typeColor = (
  t?: string
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' => {
  switch ((t ?? '').toLowerCase()) {
    case 'officer':
    case 'agent':
      return 'primary';
    case 'vip':
      return 'secondary';
    case 'suspect':
      return 'warning';
    case 'wanted':
      return 'error';
    case 'civilian':
      return 'default';
    default:
      return 'info';
  }
};

const threatLabel = (n?: number) => {
  const v = Number(n ?? 0);
  if (v >= 80) return 'High';
  if (v >= 40) return 'Medium';
  return 'Low';
};

const threatColor = (n?: number): 'default' | 'success' | 'warning' | 'error' => {
  const v = Number(n ?? 0);
  if (v >= 80) return 'error';
  if (v >= 40) return 'warning';
  return 'success';
};

export default function Dossier({ subject, canView, onOverride, onViewedEvent }: {
  subject: Subject;
  canView: boolean;
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
            <Chip size="small" label={subject.typePublic} color={typeColor(subject.typePublic) as any} variant="outlined"/>
            <Chip size="small" label={`${subject.faction} • ${subject.factionRankPublic}`} variant="outlined"/>
            <Chip size="small" label={`Threat ${threatLabel(subject.combatSkill)}`} color={threatColor(subject.combatSkill) as any}/>
            {subject.highSecurity && <Chip size="small" label="HIGH SECURITY" color="secondary"/>}
            <ClearanceBadge level={subject.clearanceRequired}>L{subject.clearanceRequired}</ClearanceBadge>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {/*<IconButton onClick={()=>onCopy(subject.handle)}><ContentCopyIcon/></IconButton>*/}
          {/*<IconButton onClick={onExport}><DownloadIcon/></IconButton>*/}
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

