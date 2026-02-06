import { keyframes, styled } from '@mui/material/styles';
import { Box, Paper, } from '@mui/material';

export const ClearanceBadge = styled('span')<{ level: number }>(({ level, theme }) => ({
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

export const Dock = styled(Paper)(({ theme }) => ({
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

export const AuditScroll = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  minHeight: 120,
  maxHeight: '32vh',
  overflow: 'auto',
  padding: 8,
  background: 'linear-gradient(180deg, rgba(8,12,22,.6), rgba(10,15,26,.7))',
  fontFamily: 'ui-monospace, monospace'
}));

export const fmt = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
export const threatLabel = (s: 0|1|2|3) => ['LOW', 'MODERATE', 'HIGH', 'EXTREME'][s];
export const typeColor = (t: 'HUMAN'|'ANDROID'|'AI') => t==='HUMAN' ? 'default' : t==='ANDROID' ? 'warning' : 'secondary';
export const threatColor = (s: 0|1|2|3) => (['default','warning','error','secondary'] as const)[s];

export const CenterWrap = styled(Box)({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: 12,
  minHeight: 'calc(100svh - 160px)'
});

export const SearchCard = styled(Paper)(({ theme }) => ({
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

export const Scanline = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, transparent 0%, rgba(88,166,255,.06) 50%, transparent 100%)',
  transform: 'translateY(-100%)',
  animation: `${sweep} 2.4s linear infinite`,
  pointerEvents: 'none'
}));

export const ConsoleArea = styled(Box)({
  position: 'relative',
  minHeight: 0
});

export const ResultsWrap = styled('div')({
  display: 'grid',
  gap: 12
});

export const Category = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: 10,
  background: 'linear-gradient(180deg, rgba(8,12,22,.9), rgba(10,15,26,.96))'
}));

export const Cards = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
  gap: 10,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' }
});

export const ResCard = styled('div')(({ theme }) => ({
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

export const LockBanner = styled('div')({
  position: 'absolute', right: 8, bottom: 8, fontSize: 11, display: 'flex', alignItems: 'center', color: '#ff3864'
});

export const DossierGrid = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: 12,
  minHeight: 0
});

export const Identity = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: 12,
  alignItems: 'center'
});

export const Avatar = styled('div')(({ theme }) => ({
  width: 56, height: 56, display: 'grid', placeItems: 'center',
  borderRadius: '50%',
  background: 'radial-gradient(closest-side, rgba(88,166,255,.25), rgba(88,166,255,.06))',
  border: `1px solid ${theme.palette.primary.main}66`
}));

export const Timeline = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  padding: '8px 8px 8px 18px',
  borderLeft: `2px solid ${theme.palette.primary.main}40`
}));

export const EventItemWrap = styled('div')({
  position: 'relative',
  margin: '10px 0 16px 0'
});

export const Dot = styled('div')(({ theme }) => ({
  position: 'absolute', left: -11, top: 8, width: 10, height: 10, borderRadius: '50%',
  background: theme.palette.primary.main, boxShadow: `0 0 12px ${theme.palette.primary.main}99`
}));

export const EventBody = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: 6,
  border: `1px solid ${theme.palette.primary.main}33`,
  borderRadius: 10,
  background: 'linear-gradient(180deg, rgba(7,12,24,.7), rgba(10,16,28,.78))',
  padding: '10px 12px',
  maxHeight: 140,
  overflow: 'hidden'
}));

export const FadeMask = styled('div')({
  position: 'absolute', inset: 'auto 0 0 0', height: 36,
  background: 'linear-gradient(to bottom, rgba(10,16,28,0), rgba(10,16,28,1))',
  pointerEvents: 'none', opacity: .85
});

export const RedactedCover = styled('div')({
  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 2
});

export const RedactedStripe = styled('div')({
  position: 'absolute', inset: 0,
  background: 'repeating-linear-gradient(-20deg, rgba(255,56,100,.22) 0 14px, rgba(255,56,100,.33) 14px 28px)',
  mixBlendMode: 'multiply',
  backdropFilter: 'blur(2px)'
});

export const RedactedMsg = styled(Paper)(({ theme }) => ({
  position: 'relative', zIndex: 1,
  border: `1px solid ${theme.palette.secondary.main}88`,
  background: 'rgba(10,16,28,.9)',
  padding: '12px 14px',
  borderRadius: 12,
  textAlign: 'center'
}));

