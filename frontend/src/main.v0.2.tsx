import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { Router } from './routes.tsx';
// import messages from './assets/translations/en.json';
import messages from './assets/translations/pl.json';
import { WebSocketProvider } from './shared/providers/websocket.provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { TenantProvider } from './shared/providers/tenant.provider.tsx';

import './index.css';
import 'material-icons/iconfont/material-icons.css';
import './styles/general.scss';

document.documentElement.setAttribute('data-tenant', 'cityOfChange');

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        {/* <IntlProvider messages={messages} locale="en" defaultLocale="en"> */}
        <IntlProvider messages={messages} locale="pl" defaultLocale="pl">
            <WebSocketProvider>
                <TenantProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </TenantProvider>
            </WebSocketProvider>
        </IntlProvider>
    </Provider>
);
