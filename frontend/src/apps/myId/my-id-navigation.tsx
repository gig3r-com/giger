import classNames from 'classnames';
import { FC } from 'react';
import './my-id-navigation.scss';

export type MyIdNavigationProps = {
    active?: boolean;
    onItemClick?: (name: string) => void;
};

export const MyIdNavigation: FC<MyIdNavigationProps> = ({ onItemClick }) => {
    const wrapperClassnames = classNames({
        'my-id-navigation': true
    });
    const items = [
        { name: 'contacts' },
        { name: 'neotribe' },
        { name: 'medical' },
        { name: 'criminal', isNew: true },
        { name: 'goals', isNew: true },
        { name: 'hacking' },
        { name: 'meta' }
    ];
    return (
        <nav className={wrapperClassnames}>
            <ul className="my-id-navigation__list">
                {items.map(({ name, isNew }) => (
                    <li className="my-id-navigation__item" key={name} onClick={() => onItemClick?.(name)}>
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
