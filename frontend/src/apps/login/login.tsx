import { useState, FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { useAuthenticationService } from '../../shared/services/authentication.service';
import { BigButton } from '../../shared/components/big-button/big-button';
import { ReactComponent as GigerLogo } from '../../assets/logo-giger.svg';
import { DecodeText } from '../../shared/components/decode-text/decodeText';
import LoginHelp from './login-help/login-help';

import './login.scss';

export const Login: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [notLoggedIn, setNotLoggedIn] = useState<boolean | undefined>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showHelp, setShowHelp] = useState(false);
    const { login, retrieveLoginData } = useAuthenticationService();
    const helpClasses = classNames({
        login__help: true,
        'login__help--visible': showHelp
    });
    const wrapperClasses = classNames({
        login: true,
        'login--hidden': !notLoggedIn
    });
    const mainClasses = classNames({
        login__main: true,
        'login__main--hidden': showHelp
    });
    const logoClasses = classNames({
        'login__logo-wrapper': true,
        'login__logo-wrapper--loading': loading
    });
    const loaderClasses = classNames({
        login__loader: true,
        'login__loader--hidden': !loading
    });
    const inputsClasses = classNames({
        login__inputs: true,
        'login__inputs--hidden': loading
    });
    const errorClasses = classNames({
        login__error: true,
        'login__error--visible': error
    });

    const handleLogin = () => {
        setLoading(true);
        login(username, password).catch(() => {
            setLoading(false);
            setError(intl.formatMessage({ id: 'LOGIN_FAILED' }));
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(function redirectIfAlreadyLoggedIn() {
        if (localStorage.getItem('loggedInUser')) {
            retrieveLoginData();
            navigate('/giger');
        } else {
            setNotLoggedIn(true);
        }
    }, []);

    return (
        <div className={wrapperClasses}>
            <div className="login__background">
                <div className="login__background-img"></div>
                <div className="login__background-img"></div>
                <div className="login__background-img"></div>
                <div className="login__background-img"></div>
            </div>
            <section className={mainClasses}>
                <div className={logoClasses}>
                    <GigerLogo />
                    <span className={loaderClasses}></span>
                    {loading && (
                        <div className="login__decrypting">
                            <DecodeText
                                text={intl.formatMessage({ id: 'DECRYPTING' })}
                            />
                        </div>
                    )}
                </div>
                <div className={inputsClasses}>
                    <label>
                        <input
                            placeholder={intl.formatMessage({ id: 'USERNAME' })}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            placeholder={intl.formatMessage({ id: 'PASSWORD' })}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={handleKeyPress}
                        />
                    </label>

                    <span className={errorClasses}>{error}</span>

                    <BigButton
                        onClick={handleLogin}
                        text={intl.formatMessage({ id: 'LOGIN' })}
                    />
                </div>
                <span
                    className="login__show-help"
                    onClick={() => setShowHelp(true)}
                    onKeyUp={(event) =>
                        event.key === 'Enter' && setShowHelp(true)
                    }
                >
                    {intl.formatMessage({ id: 'SHOW_HELP' })}
                </span>
            </section>
            <section className={helpClasses}>
                <LoginHelp onBack={() => setShowHelp(false)} />
            </section>
        </div>
    );
};
