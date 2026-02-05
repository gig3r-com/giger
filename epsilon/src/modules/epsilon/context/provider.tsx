'use client';

import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { CyberLockOverlay, exitFullscreen, goFullscreen } from './utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppModes, BottomPanelModes, EpsilonContextType, LeftPanelModes, RightPanelModes } from '../types';
import AdminModal from '../components/AdminModal';
import { redirect } from 'next/navigation';

const initialValue: EpsilonContextType = {
  appMode: 'FULL',
  setAppMode: (mode) => console.log(mode),

  locked: false,
  setLock: (lock) => console.log(lock),

  isLeftPanelOpened: false,
  setIsLeftPanelOpened: (value) => console.log(value),
  leftPanelMode: 'FILES',
  setLeftPanelMode: (mode) => console.log(mode),
  leftPanelSearch: '',
  setLeftPanelSearch: (value) => console.log(value),

  isBottomPanelOpened: false,
  setIsBottomPanelOpened: (value) => console.log(value),
  bottomPanelMode: 'TERMINAL',
  setBottomPanelMode: (mode) => console.log(mode),

  isRightPanelOpened: false,
  setIsRightPanelOpened: (value) => console.log(value),
  rightPanelMode: 'OTHER',
  setRightPanelMode: (mode) => console.log(mode),

  isTopBarOpened: false,
  setIsTopBarOpened: (value) => console.log(value),
}

export const EpsilonContext = createContext<EpsilonContextType>(initialValue);

export function useEpsilon() {
  const ctx = useContext<EpsilonContextType>(EpsilonContext);
  if (!ctx) throw new Error('useEpsilon must be used within EpsilonContextProvider');
  return ctx;
}

export function EpsilonContextProvider({ children }: { children: ReactNode }) {
  const [appMode, setAppMode] = useState<AppModes>('FULL');
  const [locked, setLock] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  // Panels
  const [isLeftPanelOpened, setIsLeftPanelOpened] = useState<boolean>(true);
  const [leftPanelMode, setLeftPanelMode] = useState<LeftPanelModes>('FILES');

  const [isBottomPanelOpened, setIsBottomPanelOpened] = useState<boolean>(true);
  const [bottomPanelMode, setBottomPanelMode] = useState<BottomPanelModes>('TERMINAL');

  const [isRightPanelOpened, setIsRightPanelOpened] = useState<boolean>(true);
  const [rightPanelMode, setRightPanelMode] = useState<RightPanelModes>('OTHER');

  // Bars
  const [isTopBarOpened, setIsTopBarOpened] = useState<boolean>(true);

  // Search query states
  const [leftPanelSearch, setLeftPanelSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [bottomPanelSearch, setBottomPanelSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [rightPanelSearch, setRightPanelSearch] = useQueryState('search', parseAsString.withDefault(''));

  // Restore from localStorage
  useEffect(() => {
    const storedMode = (localStorage.getItem('appMode') as AppModes) ?? 'full';
    const storedLocked = localStorage.getItem('locked') === 'true';
    setAppMode(storedMode);
    setLock(storedLocked);

    const storedLeftOpen = localStorage.getItem('isLeftPanelOpened') === 'true';
    const storedLeftMode = (localStorage.getItem('leftPanelMode') as LeftPanelModes) ?? 'FILES';
    setIsLeftPanelOpened(storedLeftOpen);
    setLeftPanelMode(storedLeftMode);

    const storedBottomOpen = localStorage.getItem('isBottomPanelOpened') === 'true';
    const storedBottomMode = (localStorage.getItem('bottomPanelMode') as BottomPanelModes) ?? 'TERMINAL';
    setIsBottomPanelOpened(storedBottomOpen);
    setBottomPanelMode(storedBottomMode);

    const storedRightOpen = localStorage.getItem('isRightPanelOpened') === 'true';
    const storedRightMode = (localStorage.getItem('rightPanelMode') as RightPanelModes) ?? 'OTHER';
    setIsRightPanelOpened(storedRightOpen);
    setRightPanelMode(storedRightMode);

    setHydrated(true);
  }, []);

  // Persist to localStorage when state changes
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem('locked', locked ? 'true' : 'false');

    localStorage.setItem('isLeftPanelOpened', isLeftPanelOpened ? 'true' : 'false');
    localStorage.setItem('leftPanelMode', leftPanelMode);

    localStorage.setItem('isBottomPanelOpened', isBottomPanelOpened ? 'true' : 'false');
    localStorage.setItem('bottomPanelMode', bottomPanelMode);

    localStorage.setItem('isRightPanelOpened', isRightPanelOpened ? 'true' : 'false');
    localStorage.setItem('rightPanelMode', rightPanelMode);

  }, [locked, isLeftPanelOpened, leftPanelMode, isBottomPanelOpened, bottomPanelMode, isRightPanelOpened, rightPanelMode, hydrated]);

  const changeMode = (appMode: AppModes) => {
    let moveLink = '';
    switch (appMode) {
      case 'POLICE': {
        goFullscreen();
        moveLink = '/sector/police';
        break;
      }
      case 'FULL':
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
    locked,
    setLock,
    isLeftPanelOpened,
    setIsLeftPanelOpened,
    leftPanelMode,
    setLeftPanelMode,
    leftPanelSearch,
    setLeftPanelSearch,
    isBottomPanelOpened,
    setIsBottomPanelOpened,
    bottomPanelMode,
    setBottomPanelMode,
    bottomPanelSearch,
    setBottomPanelSearch,
    isRightPanelOpened,
    setIsRightPanelOpened,
    rightPanelMode,
    setRightPanelMode,
    rightPanelSearch,
    setRightPanelSearch,
    isTopBarOpened,
    setIsTopBarOpened,
  }), [
    appMode, locked,
    isLeftPanelOpened, leftPanelMode, leftPanelSearch,
    isBottomPanelOpened, bottomPanelMode, bottomPanelSearch,
    isRightPanelOpened, rightPanelMode, rightPanelSearch,
    isTopBarOpened,
  ]);

  return (
      <LocalizationProvider dateAdapter={ AdapterDayjs }>
        <EpsilonContext.Provider value={ value }>
          { locked && <CyberLockOverlay/> }
          <AdminModal/>
          { children }
        </EpsilonContext.Provider>
      </LocalizationProvider>
  );
}
