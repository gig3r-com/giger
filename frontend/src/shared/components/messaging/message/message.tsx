import { FC } from 'react';
import classNames from 'classnames';
import { IMessage } from '../../../../models/message';
import { useUserService } from '../../../services/user.service';

import './message.scss';

export const Message: FC<{ message: IMessage; convoId: string }> = ({
    message,
    convoId
}) => {
    const { currentUser, getHandleForConvo, isInfluencer } = useUserService();
    const messageClassnames = classNames({
        message: true,
        'message--own': currentUser?.id === message.sender
    });
    const senderClasses = classNames({
        'message__sender': true,
        'message__sender--influencer': isInfluencer(message.sender)
    });
    const textClasses = classNames({
        'message__text': true,
        'message__text--influencer': isInfluencer(message.sender)
    });

    return (
        <p className={messageClassnames}>
            {`${new Date(message.date).toLocaleTimeString()}`}
            <span className={senderClasses}>{`<@${getHandleForConvo(
                convoId,
                message.sender
            )}>`}</span>
            <span className={textClasses}>{`${message.text}`}</span>
        </p>
    );
};
