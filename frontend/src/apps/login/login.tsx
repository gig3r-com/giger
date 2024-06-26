import { useState, FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useUserService } from '../../shared/services/user.service';
import { BigButton } from '../../shared/components/big-button/big-button';
import LoginHelp from './login-help/login-help';
import { SelectUser } from '../myId/select-user/select-user';
import { selectRequiresGodUserSelection } from '../../store/users.selectors';
import { LoadingBar } from '../../shared/components/loading-bar/loading-bar';

import './login.scss';

export const Login: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [notLoggedIn, setNotLoggedIn] = useState<boolean | undefined>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const requiresGodUserSelection = useSelector(
        selectRequiresGodUserSelection
    );
    const [error, setError] = useState('');
    const [showHelp, setShowHelp] = useState(false);
    const { login, retrieveLoginData } = useUserService();
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
        login(username, password)
            .catch(() => {
                setLoading(false);
                setError(intl.formatMessage({ id: 'LOGIN_FAILED' }));
            })
            .then(() => navigate('/giger'));
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
                    <LoadingBar
                        isLoading={loading}
                        text={intl.formatMessage({ id: 'DECRYPTING' })}
                    />
                </div>
                <div className={inputsClasses}>
                    <label>
                        <input
                            placeholder={intl.formatMessage({ id: 'USERNAME' })}
                            type="text"
                            autoComplete="text"
                            autoCapitalize="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            placeholder={intl.formatMessage({ id: 'PASSWORD' })}
                            type="password"
                            autoComplete="password"
                            autoCapitalize="off"
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
            {requiresGodUserSelection && (
                <SelectUser showSelectionAtStart={true} />
            )}
        </div>
    );
};
