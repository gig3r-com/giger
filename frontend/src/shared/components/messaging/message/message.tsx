import { FC } from 'react';
import classNames from 'classnames';
import { IMessage } from '../../../../models/message';
import { useUserService } from '../../../services/user.service';
import { useMessagesService } from '../../../services/messages.service';
import { useIntl } from 'react-intl';

import './message.scss';

export const Message: FC<{
    message: IMessage;
    convoId: string;
    senderAnonymized?: boolean;
}> = ({ message, convoId, senderAnonymized = false }) => {
    const intl = useIntl();
    const { currentUser, isInfluencer } = useUserService();
    const { isMessageUnread } = useMessagesService();
    const messageClassnames = classNames({
        message: true,
        'message--own': currentUser?.handle === message.sender,
        'message--unread': isMessageUnread(convoId, message.id)
    });
    const senderClasses = classNames({
        message__sender: true,
        'message__sender--influencer': isInfluencer(message.sender)
    });
    const textClasses = classNames({
        message__text: true,
        'message__text--influencer': isInfluencer(message.sender)
    });

    return (
        <p className={messageClassnames}>
            {`${new Date(message.date).toLocaleTimeString()}`}
            <span
                className={senderClasses}
            >{`<@${senderAnonymized ? intl.formatMessage({ id: 'ANONYMOUS' }) : message.sender}>`}</span>
            <span className={textClasses}>{`${message.text.trim()}`}</span>
        </p>
    );
};
