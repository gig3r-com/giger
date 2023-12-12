import { Link, useLocation } from 'react-router-dom';
import { IMainMenuOption, mainMenuOptions } from './main-menu.options';

import './main-menu.scss';
import classNames from 'classnames';

export const MainMenu = () => {
    const location = useLocation();
    const classes = (option: IMainMenuOption) =>
        classNames({
            'main-menu__option': true,
            'main-menu__option--active': location.pathname.split('/').some((entry) => `/${entry}` === option.link)
        });

    return (
        <header className="main-menu">
            <ul>
                {mainMenuOptions.map((option) => (
                    <li className={classes(option)} key={option.name + option.link}>
                        <Link to={option.link}>{option.name}</Link>
                    </li>
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
