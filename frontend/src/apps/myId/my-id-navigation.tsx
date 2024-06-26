import classNames from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useMyIdService } from '../../shared/services/myid.service';
import { MyIdUncoverableSections } from './myid.model';
import { useApiService } from '../../shared/services/api.service';

import './my-id-navigation.scss';

export type MyIdNavigationProps = {
    active?: boolean;
    onItemClick?: (name: string) => void;
};

export const MyIdNavigation: FC<MyIdNavigationProps> = ({ onItemClick }) => {
    const userName = useSelector(
        (state: RootState) => state.users.currentUser?.handle
    );
    const { logout } = useApiService();
    const { hasNewEntries } = useMyIdService();
    const wrapperClassnames = classNames({
        'my-id-navigation': true
    });
    const items = [
        { name: 'contacts' },
        { name: 'vibe' },
        {
            name: 'medical',
            isNew: hasNewEntries(MyIdUncoverableSections.MEDICAL)
        },
        {
            name: 'criminal',
            isNew: hasNewEntries(MyIdUncoverableSections.CRIMINAL)
        },
        { name: 'goals', isNew: hasNewEntries(MyIdUncoverableSections.GOALS) },
        {
            name: 'relations',
            isNew: hasNewEntries(MyIdUncoverableSections.RELATIONS)
        },
        { name: 'meta', isNew: hasNewEntries(MyIdUncoverableSections.META) },
        {
            name: 'records',
            isNew: hasNewEntries(MyIdUncoverableSections.PRIVATE_RECORDS)
        },
        { name: 'code' },
        { name: 'log out', onClickAction: () => logout(userName ?? '') }
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
