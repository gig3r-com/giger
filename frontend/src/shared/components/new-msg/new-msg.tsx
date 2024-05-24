import { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMessagesService } from '../../services/messages.service';
import { INewMsgProps } from './new-msg.model';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useUserService } from '../../services/user.service';
import { UserRoles } from '../../../models/user';

import './new-msg.scss';

export const NewMsg: FC<INewMsgProps> = ({
    convoId,
    onSend,
    userIsParticipant
}) => {
    const intl = useIntl();
    const { gigId } = useParams();
    const { currentUser } = useUserService();
    const [newMessage, setNewMessage] = useState('');
    const { send, addModeratorToConvo } = useMessagesService();
    const isGigConvo = useMemo(() => !!gigId, [gigId]);
    const isModerator = useMemo(
        () => currentUser?.roles.includes(UserRoles.MODERATOR),
        [currentUser]
    );

    const sendMessage = () => {
        if (isGigConvo && isModerator && !userIsParticipant) {
            addModeratorToConvo(convoId);
        }

        setNewMessage('');
        send(newMessage, convoId, isGigConvo);
        onSend && onSend();
    };

    return (
        <motion.div className="new-msg">
            <input
                type="text"
                value={newMessage}
                onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
                onChange={(event) => setNewMessage(event.target.value)}
                placeholder={intl.formatMessage({
                    id: 'NEW_MESSAGE'
                })}
                className="new-msg__message"
            />
            <button
                className="new-msg__send-message"
                onClick={sendMessage}
                disabled={newMessage.trim() !== ''}
            >
                <span>+</span>
            </button>
        </motion.div>
    );
};
