import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './routes.tsx';
import { IntlProvider } from 'react-intl';
import messages from './assets/translations/en.json'

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <IntlProvider
            messages={messages}
            locale="en"
            defaultLocale="en"
        >
            <Router />
        </IntlProvider>
    </React.StrictMode>
);
