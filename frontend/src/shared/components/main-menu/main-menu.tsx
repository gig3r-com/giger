import { Link, useLocation } from 'react-router-dom';
import {
    IMainMenuOption,
    MainMenuNames,
    mainMenuOptions
} from './main-menu.options';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Fragment } from 'react/jsx-runtime';

import './main-menu.scss';
import { selectHasUnreadMessages } from '../../../store/messages.selectors';

export const MainMenu = () => {
    const location = useLocation();
    const classes = (option: IMainMenuOption) =>
        classNames({
            'main-menu__option': true,
            'main-menu__option--active': location.pathname
                .split('/')
                .some((entry) => `/${entry}` === option.link)
        });
    const hasUnreadMessages = useSelector(selectHasUnreadMessages);

    return (
        <header className="main-menu">
            <ul>
                {mainMenuOptions.map((option) => (
                    <Fragment key={option.name + option.link}>
                        <li className={classes(option)}>
                            <Link to={option.link}>{option.name}</Link>

                            {option.name === MainMenuNames.CHAT &&
                                hasUnreadMessages && (
                                    <span className="main-menu__new-indicator"></span>
                                )}

                            {option.name === MainMenuNames.GIGS &&
                                hasUnreadMessages && (
                                    <span className="main-menu__new-indicator"></span>
                                )}
                        </li>
                    </Fragment>
                ))}
            </ul>
            <button className="main-menu__add-button">
                <Link to="/giger/new-gig">
                    <span>+</span>
                </Link>
            </button>
        </header>
    );
};
