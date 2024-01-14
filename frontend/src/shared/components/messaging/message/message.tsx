import { FC } from 'react';
import classNames from 'classnames';
import { IMessage } from '../../../../models/message';
import { useUserService } from '../../../services/user.service';

import './message.scss';

export const Message: FC<{ message: IMessage; convoId: string }> = ({
    message,
    convoId
}) => {
    const { currentUser, getHandleForConvo } = useUserService();
    const messageClassnames = classNames({
        message: true,
        'message--own': currentUser?.id === message.sender
    });

    return (
        <p className={messageClassnames}>{`${new Date(
            message.date
        ).toLocaleTimeString()} <@${getHandleForConvo(
            convoId,
            message.sender
        )}> ${message.text}`}</p>
    );
};
