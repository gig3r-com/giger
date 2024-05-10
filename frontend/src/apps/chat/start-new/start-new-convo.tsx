import { FC, useState } from 'react';
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

export const StartNewConvo: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [anonymize, setAnonymize] = useState<'YES' | 'NO' | ''>('');
    const { createConvo } = useMessagesService();
    const { canAnonymizeChatHandle } = useUserService();
    const [selectedUsers, setSelectedUsers] = useState<IUserBase[]>([]);

    const onConvoCreation = () => {
        const id = createConvo(
            selectedUsers.map((user) => user.id),
            undefined,
            undefined,
            anonymize === 'YES'
        );
        setSelectedUsers([]);
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
                    mode="multi"
                    onSelection={(val) => {
                        setSelectedUsers(val);
                    }}
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
