'use client';
import React, { createContext, useContext } from 'react';

export interface ControllersContextType {
  statuses: Record<string, boolean>;
  setStatuses: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  appMode: 'full' | 'police' | 'doc' | '';
  setAppMode: (m: 'full' | 'police' | 'doc') => void;
}

export const initialControllersContext: ControllersContextType = {
  statuses: {
    users: false,
  },
  setStatuses: () => {},
  // appMode: '',
  setAppMode: () => {},
};

export const ControllersContext = createContext<ControllersContextType>(initialControllersContext);

export function useControllers() {
  const context = useContext(ControllersContext);
  if (!context) throw new Error('useControllers must be used within ControllersContextProvider');
  return context;
}
