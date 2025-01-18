import { Link, useLocation } from 'react-router-dom';
import {
    IMainMenuOption,
    MainMenuNames,
    mainMenuOptions
} from './main-menu.options';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/jsx-runtime';
import {
    selectHasGigUnreadMessages,
    selectHasUnreadMessages
} from '../../../store/messages.selectors';
import { selectHasNewTransfers } from '../../../store/bank.selectors';
import { selectHasStatusUpdates } from '../../../store/gigs.selectors';

import './main-menu.scss';
import { setSelectedGig } from '../../../store/gigs.slice';
import { useMyIdService } from '../../services/myid.service';

export const MainMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { hasNewEntries } = useMyIdService();
    const classes = (option: IMainMenuOption) =>
        classNames({
            'main-menu__option': true,
            'main-menu__option--active': location.pathname
                .split('/')
                .some((entry) => `/${entry}` === option.link)
        });
    const hasUnreadMessages = useSelector(selectHasUnreadMessages);
    const hasUnreadGigMessages = useSelector(selectHasGigUnreadMessages);
    const hasGigStatusChanges = useSelector(selectHasStatusUpdates);
    const hasNewTransfers = useSelector(selectHasNewTransfers);

    const indicatior = <span className="main-menu__new-indicator"></span>;

    return (
        <header className="main-menu">
            <ul>
                {mainMenuOptions.map((option) => (
                    <Fragment key={option.name + option.link}>
                        <li
                            className={classes(option)}
                            data-pw={"bottom-menu-link-" + option.name}
                            onClick={() =>
                                dispatch(setSelectedGig({ gigId: '' }))
                            }
                        >
                            <Link to={option.link}>{option.name}</Link>

                            {option.name === MainMenuNames.CHAT &&
                                hasUnreadMessages &&
                                indicatior}

                            {option.name === MainMenuNames.GIGS &&
                                (hasUnreadGigMessages || hasGigStatusChanges) &&
                                indicatior}

                            {option.name === MainMenuNames.BANK &&
                                hasNewTransfers &&
                                indicatior}

                            {option.name === MainMenuNames.MY_ID &&
                                hasNewEntries() &&
                                indicatior}
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
