'use client';
import React from 'react';
import { alpha, createTheme, ThemeProvider, styled, keyframes } from '@mui/material/styles';
import { Box, Paper, Stack, Typography } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';

const NEON = '#58a6ff';
const ALERT = '#ff3864';
const SURFACE = '#0b1220';
const BG = '#030712';

const policeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: NEON },
    secondary: { main: ALERT },
    background: { default: BG, paper: alpha(SURFACE, 0.96) },
    text: { primary: '#d7e3ea', secondary: alpha('#d7e3ea', 0.75) },
    divider: alpha('#d7e3ea', 0.12),
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Share Tech Mono", monospace',
    button: { fontWeight: 800, letterSpacing: 0.4, textTransform: 'uppercase' },
    h3: { letterSpacing: 1.5 },
  },
});

export function PoliceThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={policeTheme}>{children}</ThemeProvider>;
}

const gridLines = keyframes`
  0% { transform: translateX(0) }
  100% { transform: translateX(10px) }
`;

export const RootScreen = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100svh',
  width: '100%',
  overflow: 'hidden',
  padding: 'min(24px, 2vw)',
  isolation: 'isolate',
  background: `radial-gradient(80% 50% at 50% -10%, rgba(88,166,255,.12), transparent 60%),
               radial-gradient(50% 30% at 10% 0%, rgba(255,56,100,.08), transparent 60%),
               linear-gradient(180deg, #030712 0%, #0a1528 100%)`,
  '&::before': {
    content: '""',
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
    backgroundSize: '100% 2px',
    mixBlendMode: 'overlay',
    opacity: .18,
    zIndex: 0
  },
  '&::after': {
    content: '""',
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage:
      'linear-gradient(to right, rgba(88,166,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(88,166,255,.06) 1px, transparent 1px)',
    backgroundSize: '44px 44px, 44px 44px',
    opacity: .35,
    zIndex: 0,
    animation: `${gridLines} 2.5s linear infinite`
  }
}));

const glowPulse = keyframes`
  0%,100% { box-shadow: inset 0 0 28px rgba(88,166,255,.16) }
  50%     { box-shadow: inset 0 0 38px rgba(88,166,255,.28) }
`;

export const HeaderShell = styled(Box)({
  position: 'sticky',
  top: 0,
  zIndex: 5,
  marginBottom: 12
});

const HeaderCard = styled(Paper)(({ theme }) => ({
  padding: 'min(20px, 1.5vw)',
  borderLeft: `4px solid ${NEON}`,
  backdropFilter: 'blur(2px) saturate(120%)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: theme.shape.borderRadius,
    pointerEvents: 'none',
    animation: `${glowPulse} 3.5s ease-in-out infinite`
  }
}));

export function HeaderBar() {
  return (
    <HeaderShell>
      <HeaderCard>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <ShieldIcon fontSize="large" />
          <Box sx={{ mr: 'auto' }}>
            <Typography variant="overline" sx={{ opacity: 0.7 }}>Municipal Secure Access</Typography>
            <Typography variant="h3" sx={{ lineHeight: 1.15 }}>POLICE DATABASE</Typography>
            <Typography variant="body2" color="text.secondary">
              All queries are logged. VIP entries require active protection.
            </Typography>
          </Box>
        </Stack>
      </HeaderCard>
    </HeaderShell>
  );
}
