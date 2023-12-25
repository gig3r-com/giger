import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Router } from './routes.tsx';
import messages from './assets/translations/en.json';

import './index.css';
import 'material-icons/iconfont/material-icons.css';
import './styles/general.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <IntlProvider messages={messages} locale="en" defaultLocale="en">
                <Router />
            </IntlProvider>
        </Provider>
    </React.StrictMode>
);
