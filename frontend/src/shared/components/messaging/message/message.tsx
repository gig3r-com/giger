import { FC } from 'react';
import classNames from 'classnames';
import { IMessage } from '../../../../models/message';
import { useUserService } from '../../../services/user.service';

import './message.scss';

export const Message: FC<{ message: IMessage }> = ({ message }) => {
    const { currentUser } = useUserService();
    const messageClassnames = classNames({
        message: true,
        'message--own': currentUser?.id === message.sender.id
    });

    return (
        <p className={messageClassnames}>{`${new Date(
            message.date
        ).toLocaleTimeString()} <@${message.sender.handle}> ${
            message.text
        }`}</p>
    );
};
