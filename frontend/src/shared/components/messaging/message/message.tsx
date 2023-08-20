import { FC } from 'react';
import classNames from 'classnames';
import { useAuthenticationService } from '../../../services/authentication.service';
import { IMessage } from '../../../../models/message';

import './message.scss';

export const Message: FC<{ message: IMessage }> = ({ message }) => {
    const { currentUser } = useAuthenticationService();
    const messageClassnames = classNames({
        message: true,
        'message--own': currentUser().id === message.sender.id
    });

    return (
        <p className={messageClassnames}>{`${new Date(
            message.date
        ).toLocaleTimeString()} <@${message.sender.handle}> ${
            message.text
        }`}</p>
    );
};
