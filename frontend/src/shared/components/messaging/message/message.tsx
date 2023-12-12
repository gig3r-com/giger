import { FC } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { IMessage } from '../../../../models/message';
import { RootState } from '../../../../store/store';

import './message.scss';

export const Message: FC<{ message: IMessage }> = ({ message }) => {
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
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
