'use client';

import React, { memo, useEffect, useMemo, useState } from 'react';
import { initialNetworksContext, NetworksContextType, NetworksContext } from './';
import { NetworkNameTypes } from '@/components/modules/networks/networks';
import { NETWORKS } from '../';

async function fetchNetworks(ctrl: AbortController) {
  return Promise.all(
    (Object.entries(NETWORKS) as [NetworkNameTypes, string][])
      .map(async ([name, id]) => {
        try {
          const res = await fetch(`/api/network/${encodeURIComponent(id)}`, {
            cache: 'no-store',
            signal: ctrl.signal,
          });

          if (!res.ok) {
            return [name.toLowerCase(), initialNetworksContext.networksByName[name.toLowerCase()] ?? null] as const;
          }

          const data = await res.json().catch(() => null);
          const networkVal = (data?.network ?? null) as NetworksContextType['networksByName'][string] | null;

          return [name.toLowerCase(), networkVal] as const;
        } catch (err: any) {
          if (err?.name !== 'AbortError') {
            console.error('Failed to load network', name, err);
          }
          return [name.toLowerCase(), null] as const;
        }
      })
  );
}

function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [networksByName, setNetworksByName] = useState<NetworksContextType['networksByName']>(
    initialNetworksContext.networksByName
  );
  const [isLoading, setIsLoading] = useState<NetworksContextType['isLoading']>(false);

  useEffect(() => {
    const ctrl = new AbortController();

    const run = async () => {
      setIsLoading(true);
      try {
        const entries = await fetchNetworks(ctrl);
        const next = Object.fromEntries(entries) as NetworksContextType['networksByName'];
        setNetworksByName(next);
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.error('Failed to load networks', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    run();
    return () => ctrl.abort();
  }, []);

  const contextValue: NetworksContextType = useMemo(
    () => ({
      networksByName,
      isLoading,
    }),
    [networksByName, isLoading]
  );

  return <NetworksContext.Provider value={contextValue}>{children}</NetworksContext.Provider>;
}

export default memo(NetworkProvider);
