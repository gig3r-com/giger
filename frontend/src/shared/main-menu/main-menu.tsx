import { Link } from 'react-router-dom';
import { mainMenuOptions } from './main-menu.options';

import './main-menu.scss';

export const MainMenu = () => {
    return (
        <header className="main-menu">
            <ul>
                {mainMenuOptions.map((option) => (
                    <li
                        className="main-menu__option"
                        key={option.name + option.link}
                    >
                        <Link to={option.link}>{option.name}</Link>
                    </li>
                ))}
            </ul>
            <button className="main-menu__add-button">
                <span>+</span>
            </button>
        </header>
    );
};
