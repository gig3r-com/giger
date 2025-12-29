import { createContext, useContext, useMemo } from 'react';
import { TenantId } from '../../models/tenants';

function fromRuntimeEnv(): TenantId | null {
    // window.RUNTIME_ENV is filled at runtime by env.js (see below)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = (window as any).RUNTIME_ENV?.TENANT;
    return t === 'cityOfChange'
        ? 'cityOfChange'
        : t === 'gigerDefault'
          ? 'gigerDefault'
          : null;
}
function fromQuery(): TenantId | null {
    const t = new URLSearchParams(window.location.search).get('tenant');
    return t === 'cityOfChange'
        ? 'cityOfChange'
        : t === 'gigerDefault'
          ? 'gigerDefault'
          : null;
}
function fromSubdomainOrPath(): TenantId | null {
    const host = window.location.host.toLowerCase();
    if (host.startsWith('cityofchange.')) return 'cityOfChange';
    if (window.location.pathname.startsWith('/coc')) return 'cityOfChange';
    return null;
}
function fromLocalStorage(): TenantId | null {
    const t = localStorage.getItem('tenantOverride');
    return t === 'cityOfChange'
        ? 'cityOfChange'
        : t === 'gigerDefault'
          ? 'gigerDefault'
          : null;
}

export function resolveTenant(): TenantId {
    return (
        fromRuntimeEnv() ??
        fromQuery() ??
        fromSubdomainOrPath() ??
        fromLocalStorage() ??
        'gigerDefault'
    );
}

export const TenantContext = createContext<TenantId>('gigerDefault');
export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const tenant = useMemo(resolveTenant, []);
    return (
        <TenantContext.Provider value={tenant}>
            {children}
        </TenantContext.Provider>
    );
}
