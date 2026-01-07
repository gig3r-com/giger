import { createContext, useContext, useMemo } from 'react';
import { TenantId } from '../../models/tenants';

function fromQuery(): TenantId | null {
    const t = new URLSearchParams(window.location.search).get('tenant');
    return t?.toLowerCase() === 'cityOfChange'.toLowerCase()
        ? 'cityOfChange'
        : t === 'gigerDefault'
          ? 'gigerDefault'
          : null;
}
function fromSubdomainOrPath(): TenantId | null {
    const host = window.location.host.toLowerCase();
    if (host.startsWith('cityofchange')) return 'cityOfChange';
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
