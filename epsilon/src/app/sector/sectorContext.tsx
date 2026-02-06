'use client';

import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export interface SectorContextType {

}

export const initialContext: SectorContextType = {

}

export const SectorContext = createContext<SectorContextType>(initialContext);

export function useSector() {
  const context = useContext<SectorContextType>(SectorContext);
  if (!context) throw new Error('useSector must be used within SectorContextProvider');
  return context;
}

export function SectorContextProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ msg: string; sev: 'success'|'info'|'warning'|'error' }|null>(null);

  const context = useMemo(() => ({
    setToast
  }), []);

  return (
    <SectorContext.Provider value={ context }>
      { children }
      <Snackbar
        open={ !!toast }x
        autoHideDuration={ 3000 }
        onClose={ () => setToast(null) }
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
      >
        { toast ? <Alert severity={ toast.sev } variant="filled">{ toast.msg }</Alert> : null }
      </Snackbar>
    </SectorContext.Provider>
  )
}