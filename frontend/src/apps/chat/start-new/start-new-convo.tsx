import { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { RootState } from '../../../store/store';
import { IUser } from '../../../models/user';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useMessagesService } from '../../../shared/services/messages.service';
import { UserSelect } from '../user-select/user-select';

import './start-new-convo.scss';
import { useNavigate } from 'react-router';

export const StartNewConvo: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const usersWrapper = useRef<HTMLDivElement>(null);
    const users = useSelector((state: RootState) => state.users.users);
    const { createConvo } = useMessagesService();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [searchString, setSearchString] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.handle.toLowerCase().includes(searchString.toLowerCase())
        );
    }, [users, searchString]);

    const handleSelection = (user: IUser) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
        adjustContainerSize();
    };

    const adjustContainerSize = () => setTimeout(() => {
        if (!usersWrapper.current) {
            return;
        }
        const inputHeight = document.querySelector('.user-select')?.clientHeight;

        if (inputHeight) {
            usersWrapper.current.style.height = `calc(100vh - ${
                inputHeight + 155
            }px`;
        }
    }, 0);

    const onConvoCreation = () => {
        const id = createConvo(selectedUsers);
        setSelectedUsers([]);
        setSearchString('');
        navigate(`/chat/${id}`);
    };

    return (
        <AnimatePresence>
            <motion.section
                className="start-new-convo"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <UserSelect
                    selected={selectedUsers}
                    onValueUpdate={setSearchString}
                    searchString={searchString}
                />
                <div className="start-new-convo__users" ref={usersWrapper}>
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="start-new-convo__user">
                            {user.handle}
                            <input
                                id={user.id + 'checkbox'}
                                type="checkbox"
                                onChange={() => handleSelection(user)}
                                checked={selectedUsers.includes(user)}
                            />
                            <label htmlFor={user.id + 'checkbox'}></label>
                        </div>
                    ))}
                </div>
                <BigButton
                    color="primary"
                    disabled={selectedUsers.length === 0}
                    text={intl.formatMessage({ id: 'SEND_PRIVATE_MSG' })}
                    onClick={onConvoCreation}
                />
            </motion.section>
        </AnimatePresence>
    );
};
