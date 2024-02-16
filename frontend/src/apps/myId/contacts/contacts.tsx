import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { RootState } from '../../../store/store';
import { IUserBase, IUserPublic } from '../../../models/user';
import { useUserService } from '../../../shared/services/user.service';
import { CharSummary } from '../char-summary/char-summary';

import './contacts.scss';

export const Contacts: FC = () => {
    const { currentUser, getUserById, toggleUserAsFavorite } = useUserService();
    const navigate = useNavigate();
    const { contactId } = useParams();
    const [selectedUser, setSelectedUser] = useState<IUserPublic | null>(null);
    const userList = useSelector((state: RootState) => state.users.users);
    const favorites = userList.filter((user) =>
        currentUser?.favoriteUserIds.includes(user.id)
    );
    const otherUsers = userList.filter(
        (user) => !currentUser?.favoriteUserIds.includes(user.id)
    );

    const fetchUserData = async (userId: string) => {
        const user = await getUserById(userId, 'public');
        user && setSelectedUser(user);
    };

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

    useEffect(() => console.log(selectedUser), [selectedUser]);

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
                    className='contacts__list-item-action material-icons'
                    onClick={() => toggleUserAsFavorite(user.id)}
                >
                    {currentUser?.favoriteUserIds.includes(user.id)
                        ? 'star'
                        : 'star_outline'}
                </span>
                <span
                    className="contacts__list-item-action material-icons"
                    onClick={() => fetchUserData(user.id)}
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
                        {favorites.map(mapContacts)}
                    </ul>
                    <h2 className="contacts__heading">
                        <MemoizedFormattedMessage id="OTHER_USERS" />
                    </h2>
                    <ul className="contacts__list contacts__list--all">
                        {otherUsers.map(mapContacts)}
                    </ul>
                </motion.div>
            )}

            {selectedUser && (
                <CharSummary mode="public" userData={selectedUser} />
            )}
        </section>
    );
};
