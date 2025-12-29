import { Router } from './routes';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { TenantProvider, useTenant } from './shared/providers/tenant.provider';
import { useEffect } from 'react';

function App() {
    const tenant = useTenant();
    useEffect(() => {
        document.documentElement.setAttribute('data-tenant', tenant);
    }, [tenant]);

    return (
        <TenantProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </TenantProvider>
    );
}

export default App;
