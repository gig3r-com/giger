import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { IUserBase, IUserPublic } from '../../../models/user';
import { useUserService } from '../../../shared/services/user.service';
import { CharSummary } from '../char-summary/char-summary';
import { selectActiveUsers } from '../../../store/users.selectors';

import './contacts.scss';

export const Contacts: FC = () => {
    const { currentUser, getUserById, toggleUserAsFavorite } = useUserService();
    const navigate = useNavigate();
    const { contactId } = useParams();
    const [selectedUser, setSelectedUser] = useState<IUserPublic | null>(null);
    const userList = useSelector(selectActiveUsers);
    const usersSansCurrent = useMemo(
        () => userList.filter((user) => user.id !== currentUser?.id),
        [userList, currentUser]
    );
    const favorites = usersSansCurrent.filter((user) =>
        currentUser?.favoriteUserIds.includes(user.id)
    );
    const otherUsers = usersSansCurrent.filter(
        (user) => !currentUser?.favoriteUserIds.includes(user.id)
    );

    const fetchUserData = async (userId: string) => {
        const user = await getUserById(userId, 'public');
        user && setSelectedUser(user);
    };

    const sortedContacts = (contacts: IUserBase[]) =>
        contacts.sort((a, b) => {
            if (a.handle < b.handle) {
                return -1;
            }
            if (a.handle > b.handle) {
                return 1;
            }
            return 0;
        });

    useEffect(
        function onNavigationBack() {
            if (!contactId) {
                setSelectedUser(null);
            } else {
                fetchUserData(contactId);
            }
        },
        [contactId]
    );

    const mapContacts = (user: IUserBase) => (
        <li key={user.id} className="contacts__list-item">
            <span
                className="contacts__list-item--name"
                onClick={() => navigate(`${user?.id}`)}
            >
                {user.handle}
            </span>
            <div className="contacts__list-item-actions">
                <span
                    className="contacts__list-item-action material-icons"
                    onClick={() => toggleUserAsFavorite(user.id)}
                >
                    {currentUser?.favoriteUserIds.includes(user.id)
                        ? 'star'
                        : 'star_outline'}
                </span>
                <span
                    className="contacts__list-item-action material-icons"
                    onClick={() => navigate(`${user?.id}`)}
                >
                    chevron_right
                </span>
            </div>
        </li>
    );

    return (
        <section className="contacts">
            {!contactId && (
                <motion.div key="contacts">
                    <h2 className="contacts__heading">
                        <MemoizedFormattedMessage id="FAVORITES" />
                    </h2>
                    <ul className="contacts__list contacts__list--relation">
                        {sortedContacts(favorites).map(mapContacts)}
                    </ul>
                    <h2 className="contacts__heading">
                        <MemoizedFormattedMessage id="OTHER_USERS" />
                    </h2>
                    <ul className="contacts__list contacts__list--all">
                        {sortedContacts(otherUsers).map(mapContacts)}
                    </ul>
                </motion.div>
            )}

            {selectedUser && (
                <CharSummary mode="public" userData={selectedUser} />
            )}
        </section>
    );
};
