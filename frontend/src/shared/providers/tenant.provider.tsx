import { createContext, useContext, useMemo } from 'react';
import { TenantId } from '../../models/tenants';

function fromSubdomainOrPath(): TenantId | null {
    const host = window.location.host.toLowerCase();
    console.log('Host:', host);
    if (host.includes('coc')) return 'cityOfChange';
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
    return fromSubdomainOrPath() || fromLocalStorage() || 'gigerDefault';
}

export const TenantContext = createContext<TenantId>('gigerDefault');
export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const tenant = useMemo(resolveTenant, []);
    console.log('Resolved tenant:', tenant);
    return (
        <TenantContext.Provider value={tenant}>
            {children}
        </TenantContext.Provider>
    );
}
