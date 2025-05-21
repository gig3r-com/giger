import classNames from 'classnames';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useMyIdService } from '../../shared/services/myid.service';
import {
    MyIdCategory,
    MyIdItem,
    MyIdNavigationProps,
    MyIdUncoverableSections
} from './myid.model';
import { useApiService } from '../../shared/services/api.service';

import './my-id-navigation.scss';

export const MyIdNavigation: FC<MyIdNavigationProps> = ({ onItemClick }) => {
    const userName = useSelector(
        (state: RootState) => state.users.currentUser?.handle
    );
    const { logout } = useApiService();
    const { hasNewEntries } = useMyIdService();
    const wrapperClassnames = classNames({
        'my-id-navigation': true
    });
    const itemsByCategory: MyIdCategory[] = [
        {
            name: 'general',
            items: [
                { name: 'contacts' },
                {
                    name: 'medical',
                    isNew: hasNewEntries(MyIdUncoverableSections.MEDICAL)
                },
                {
                    name: 'criminal',
                    isNew: hasNewEntries(MyIdUncoverableSections.CRIMINAL)
                },
                {
                    name: 'records',
                    isNew: hasNewEntries(
                        MyIdUncoverableSections.PRIVATE_RECORDS
                    )
                }
            ]
        },
        {
            name: 'private',
            items: [
                { name: 'vibe' },
                {
                    name: 'goals',
                    isNew: hasNewEntries(MyIdUncoverableSections.GOALS)
                },
                {
                    name: 'relations',
                    isNew: hasNewEntries(MyIdUncoverableSections.RELATIONS)
                }
            ]
        },
        {
            name: 'meta',
            items: [
                {
                    name: 'meta',
                    isNew: hasNewEntries(MyIdUncoverableSections.META)
                },
                { name: 'code' },
                { name: 'log out', onClickAction: () => logout(userName ?? '') }
            ]
        }
    ];

    const getItem = (item: MyIdItem) => {
        return (
            <li
                className="my-id-navigation__item"
                key={item.name}
                onClick={() =>
                    item.onClickAction
                        ? item.onClickAction()
                        : onItemClick?.(item.name)
                }
            >
                {item.name}
                {item.isNew && (
                    <span className="my-id-navigation__item--badge-new">
                        <div className="oval" />
                        new
                    </span>
                )}
            </li>
        );
    };

    return (
        <nav className={wrapperClassnames}>
            <ul className="my-id-navigation__category-list">
                {itemsByCategory.map(({ name, items }) => (
                    <Fragment key={name}>
                        <li className="my-id-navigation__category">
                            <span className="my-id-navigation__category--title">
                                {name}
                            </span>
                            <ul className="my-id-navigation__list">
                                {items.map(getItem)}
                            </ul>
                        </li>
                    </Fragment>
                ))}
            </ul>
        </nav>
    );
};
