import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { Router } from './routes.tsx';
import messages from './assets/translations/en.json';
import { WebSocketProvider } from './shared/providers/websocket.provider.tsx';

import './index.css';
import 'material-icons/iconfont/material-icons.css';
import './styles/general.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <WebSocketProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </WebSocketProvider>
        </IntlProvider>
    </Provider>
);
