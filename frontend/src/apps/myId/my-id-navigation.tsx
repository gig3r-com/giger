import classNames from 'classnames';
import { FC } from 'react';
import { useUserService } from '../../shared/services/user.service';

import './my-id-navigation.scss';

export type MyIdNavigationProps = {
    active?: boolean;
    onItemClick?: (name: string) => void;
};

export const MyIdNavigation: FC<MyIdNavigationProps> = ({ onItemClick }) => {
    const { logout } = useUserService();
    const wrapperClassnames = classNames({
        'my-id-navigation': true
    });
    const items = [
        { name: 'contacts' },
        { name: 'vibe' },
        { name: 'medical' },
        { name: 'criminal', isNew: true },
        { name: 'goals', isNew: true },
        { name: 'relations', isNew: true },
        { name: 'meta' },
        { name: 'records' },
        { name: 'code' },
        { name: 'log out', onClickAction: () => logout() }
    ];

    return (
        <nav className={wrapperClassnames}>
            <ul className="my-id-navigation__list">
                {items.map(({ name, isNew, onClickAction }) => (
                    <li
                        className="my-id-navigation__item"
                        key={name}
                        onClick={() =>
                            onClickAction
                                ? onClickAction()
                                : onItemClick?.(name)
                        }
                    >
                        {name}
                        {isNew && (
                            <span className="my-id-navigation__item--badge-new">
                                <div className="oval" />
                                new
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
