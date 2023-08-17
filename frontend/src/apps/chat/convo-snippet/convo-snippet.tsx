import { FC } from 'react';
import { IConversation } from '../../../models/message';

import './convo-snippet.scss';
import MemoizedFormattedMessage from 'react-intl/src/components/message';

export const ConvoSnippet: FC<{ convo: IConversation }> = ({ convo }) => {
    const lastMessage = convo.messages[convo.messages.length - 1];
    return (
        <article className="convo-snippet">
            <section className="convo-snippet__meta">
                <span className="convo-snippet__sender">
                    @{lastMessage.sender.handle}
                </span>
                {' > '}
                <span className="convo-snippet__date">
                    {new Date(lastMessage.date).toLocaleTimeString()}
                </span>
                {' > '}
                <span className="convo-snippet__status">
                    <MemoizedFormattedMessage id={lastMessage.status?.toUpperCase()} />
                </span>
            </section>
            <span className="convo-snippet__message">{lastMessage.text}</span>
        </article>
    );
};
