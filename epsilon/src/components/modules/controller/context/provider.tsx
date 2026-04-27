'use client';

import { useMemo, useState, useEffect, ReactNode } from 'react';
import { ControllersContextType, initialControllersContext, ControllersContext } from './';
import AdminModal from '@/components/modules/controller/components/AdminModal';

type AppMode = 'full' | 'police' | 'doc';

export const APP_MODE_KEY = 'appMode';

function defaultModeFromHost(hostname: string): AppMode {
  const h = hostname.toLowerCase();
  if (h.includes('police')) return 'police';
  if (h.includes('doc')) return 'doc';
  return 'full';
}

export default function ControllersContextProvider({ children }: { children: ReactNode }) {
  // existing state
  const [statuses, setStatuses] =
    useState<ControllersContextType['statuses']>(initialControllersContext.statuses);

  // --- appMode state with localStorage + hostname fallback ---
  const [appMode, setAppModeState] = useState<AppMode>(() => {
    // First render may be SSR; guard window
    if (typeof window === 'undefined') return 'full';
    const stored = window.localStorage.getItem(APP_MODE_KEY) as AppMode | null;
    return stored ?? defaultModeFromHost(window.location.hostname);
  });

  // keep storage in sync when appMode changes
  useEffect(() => {
    try {
      window.localStorage.setItem(APP_MODE_KEY, appMode);
    } catch {
      // ignore storage errors (private mode, quotas, etc.)
    }
  }, [appMode]);

  // provide a stable setter that also persists immediately
  const setAppMode = (mode: AppMode) => setAppModeState(mode);

  // ---- context value ----
  const context: ControllersContextType = useMemo(
    () => ({
      statuses,
      setStatuses,         // expose if your context supports mutating statuses
      appMode,             // <- NEW
      setAppMode,          // <- NEW
    }),
    [statuses, appMode],
  );

  return (
    <ControllersContext.Provider value={context}>
      {children}
    </ControllersContext.Provider>
  );
}
