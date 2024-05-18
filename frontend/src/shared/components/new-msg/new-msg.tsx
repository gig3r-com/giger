import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMessagesService } from '../../services/messages.service';
import { INewMsgProps } from './new-msg.model';
import { motion } from 'framer-motion';

import './new-msg.scss';

export const NewMsg: FC<INewMsgProps> = ({ convoId, onSend }) => {
    const intl = useIntl();
    const [newMessage, setNewMessage] = useState('');
    const { send } = useMessagesService();
    const sendMessage = () => {
        setNewMessage('');
        send(newMessage, convoId);
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
            <button className="new-msg__send-message" onClick={sendMessage}>
                <span>+</span>
            </button>
        </motion.div>
    );
};
