'use client';
import { createContext, useContext } from 'react';
import { NetworkType } from '@/types';

export interface NetworksContextType {
  networksByName: Record<string, NetworkType>,
  isLoading: boolean,
}

export const initialNetworksContext: NetworksContextType = {
  networksByName: {},
  isLoading: false,
};

export const NetworksContext = createContext<NetworksContextType>(initialNetworksContext);

export function useNetwork() {
  const context = useContext(NetworksContext);
  if (!context) throw new Error('useNetwork must be used within NetworkContextProvider');
  return context;
}
