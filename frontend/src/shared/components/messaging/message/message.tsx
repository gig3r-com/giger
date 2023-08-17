import { FC } from 'react';
import { IMessage } from '../../../../models/message';

import './message.scss';

export const Message: FC<{ message: IMessage }> = ({ message }) => {
    return (
        <p className="message">{`${new Date(
            message.date
        ).toLocaleTimeString()} <@${message.sender.handle}> ${
            message.text
        }`}</p>
    );
};
