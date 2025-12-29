'use client';

import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EpsilonContextType, AppModes } from '../types';
import AdminModal from '../components/AdminModal';
import { redirect } from 'next/navigation';

const initialValue: EpsilonContextType = {
  appMode: 'full',
  setAppMode: (mode) => { console.log(mode); },
  locked: false,
  setLock: (lock) => { console.log(lock); },
};

export const EpsilonContext = createContext<EpsilonContextType>(initialValue);

export function useEpsilon() {
  const ctx = useContext<EpsilonContextType>(EpsilonContext);
  if (!ctx) throw new Error('useEpsilon must be used within EpsilonContextProvider');
  return ctx;
}

const goFullscreen = async () => {
  const el: any = document.documentElement;
  if (!document.fullscreenElement) {
    try { await (el.requestFullscreen?.() || el.webkitRequestFullscreen?.()); } catch {}
  }
};
const exitFullscreen = async () => {
  const d: any = document;
  if (document.fullscreenElement) {
    try { await (d.exitFullscreen?.() || d.webkitExitFullscreen?.()); } catch {}
  }
};

export function EpsilonContextProvider({ children }: { children: ReactNode }) {
  const [appMode, setAppMode] = useState<AppModes>('full');
  const [locked, setLock] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedMode = (localStorage.getItem('appMode') as AppModes) ?? 'full';
    const storedLocked = localStorage.getItem('locked') === 'true';
    setAppMode(storedMode);
    setLock(storedLocked);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('locked', locked ? 'true' : 'false');
  }, [locked, hydrated]);

  const changeMode = (appMode) => {
    let moveLink = '';
    switch (appMode) {
      case 'police': {
        goFullscreen();
        moveLink = '/sector/police';
        break;
      }
      case 'full':
      default: {
        exitFullscreen();
        moveLink = '/';
        break;
      }
    }
    setAppMode(appMode);
    localStorage.setItem('appMode', appMode);
    redirect(moveLink);
  }
  const value = useMemo(() => ({
    appMode, setAppMode: changeMode,
    locked, setLock
  }), [appMode, locked]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EpsilonContext.Provider value={value}>
        { locked && <CyberLockOverlay /> }
        <AdminModal />
        { children }
      </EpsilonContext.Provider>
    </LocalizationProvider>
  );
}

function CyberLockOverlay() {
// Animations
  const pulse = keyframes`
0%, 100% { box-shadow: 0 0 0px rgba(0,255,255,0.3), 0 0 10px rgba(0,255,255,0.5), 0 0 40px rgba(255,0,255,0.25); }
50% { box-shadow: 0 0 2px rgba(0,255,255,0.6), 0 0 18px rgba(0,255,255,0.9), 0 0 60px rgba(255,0,255,0.4); }
`;
  const glowText = keyframes`
0%, 100% { text-shadow: 0 0 2px #0ff, 0 0 6px #0ff, 0 0 14px #0ff, 0 0 32px #f0f; }
50% { text-shadow: 0 0 4px #0ff, 0 0 12px #0ff, 0 0 28px #0ff, 0 0 48px #f0f; }
`;
  const glitch = keyframes`
0% { clip-path: inset(0 0 0 0); transform: translate(0); }
20% { clip-path: inset(0 0 85% 0); transform: translate(-2px, 1px); }
40% { clip-path: inset(10% 0 0 0); transform: translate(1px, -1px); }
60% { clip-path: inset(0 0 60% 0); transform: translate(-1px, 2px); }
80% { clip-path: inset(40% 0 0 0); transform: translate(2px, 0); }
100% { clip-path: inset(0 0 0 0); transform: translate(0); }
`;


  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed', inset: 0, zIndex: 1300, pointerEvents: 'auto',
        display: 'grid', placeItems: 'center',
        background: `radial-gradient(60vw 60vh at 20% 20%, rgba(0,255,255,0.15), transparent 60%),
radial-gradient(50vw 50vh at 80% 80%, rgba(255,0,255,0.15), transparent 60%),
rgba(8,8,12,0.85)`,
        backdropFilter: 'blur(3px) saturate(120%)',
        '&::before': {
          content: '""', position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 4px)`,
          mixBlendMode: 'overlay',
        },
        '&::after': {
          content: '""', position: 'absolute', inset: 12, borderRadius: 12, pointerEvents: 'none',
          border: '1px solid rgba(0,255,255,0.5)',
          animation: `${pulse} 2s ease-in-out infinite`,
        },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none', '&::after': { animation: 'none' }
        }
      }}
    >
      <Box sx={{ position: 'relative', textAlign: 'center', px: 3 }}>
        <Box
          component="div"
          sx={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: { xs: '28px', sm: '36px', md: '44px' },
            letterSpacing: 6,
            color: '#0ff',
            animation: `${glowText} 2.8s ease-in-out infinite`,
            position: 'relative',
          }}
        >
          LOCKED
          <Box aria-hidden sx={{ position: 'absolute', inset: 0, color: '#f0f', opacity: 0.6, mixBlendMode: 'screen', animation: `${glitch} 2.2s infinite steps(2)`, transform: 'translate(1px,0)' }}>LOCKED</Box>
          <Box aria-hidden sx={{ position: 'absolute', inset: 0, color: '#0ff', opacity: 0.6, mixBlendMode: 'screen', animation: `${glitch} 1.7s infinite steps(2)`, transform: 'translate(-1px,0)' }}>LOCKED</Box>
        </Box>
        <Box sx={{ mt: 1, color: 'rgba(255,255,255,0.75)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
          Game director required
        </Box>
      </Box>
    </Box>
  );
}