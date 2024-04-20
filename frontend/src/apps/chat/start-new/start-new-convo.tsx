import { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AnimatePresence, motion } from 'framer-motion';
import { IUserBase } from '../../../models/user';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useMessagesService } from '../../../shared/services/messages.service';
import { UserSelect } from '../../../shared/user-select/user-select';
import { Controls } from '../../../shared/components/controls/controls';
import { useUserService } from '../../../shared/services/user.service';

import './start-new-convo.scss';
import { selectActiveUsers } from '../../../store/users.slice';

export const StartNewConvo: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [anonymize, setAnonymize] = useState<'YES' | 'NO' | ''>('');
    const usersWrapper = useRef<HTMLDivElement>(null);
    const users = useSelector(selectActiveUsers);
    const { createConvo } = useMessagesService();
    const { canAnonymizeChatHandle } = useUserService();
    const [selectedUsers, setSelectedUsers] = useState<IUserBase[]>([]);
    const [searchString, setSearchString] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.handle.toLowerCase().includes(searchString.toLowerCase())
        );
    }, [users, searchString]);

    const handleSelection = (user: IUserBase) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
        adjustContainerSize();
    };

    const adjustContainerSize = () =>
        setTimeout(() => {
            if (!usersWrapper.current) {
                return;
            }
            const inputHeight =
                document.querySelector('.user-select')?.clientHeight;

            if (inputHeight) {
                usersWrapper.current.style.height = `calc(100vh - ${
                    inputHeight + 210
                }px`;
            }
        }, 0);

    const onConvoCreation = () => {
        const id = createConvo(
            selectedUsers.map((user) => user.id),
            undefined,
            undefined,
            anonymize === 'YES'
        );
        setSelectedUsers([]);
        setSearchString('');
        navigate(`/chat/${id}`);
    };

    return (
        <AnimatePresence>
            <motion.section
                key="new-convo"
                className="start-new-convo"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <Controls key="controls" leftSideOption="back" />
                <UserSelect
                    mode='multi'
                    onSelection={(val) => setSelectedUsers(val)}
                />

                {canAnonymizeChatHandle() && (
                    <select
                        className="start-new-convo__anonymize"
                        value={anonymize}
                        onChange={(event) =>
                            setAnonymize(
                                event.target.value as 'YES' | 'NO' | ''
                            )
                        }
                    >
                        <option value={''} disabled hidden>
                            <MemoizedFormattedMessage id="ANONYMIZE_HANDLE" />
                        </option>
                        <option value={'NO'}>
                            {intl.formatMessage({ id: 'NO' })}
                        </option>
                        <option value={'YES'}>
                            {intl.formatMessage({ id: 'YES' })}
                        </option>
                    </select>
                )}

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
