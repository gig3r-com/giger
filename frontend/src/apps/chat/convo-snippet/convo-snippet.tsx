import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { IConversation } from '../../../models/message';
import { Conversation } from '../../../shared/components/messaging/conversation/conversation';
import { NewMsg } from '../../../shared/components/new-msg/new-msg';
import { Controls } from '../../../shared/components/controls/controls';
import { useStandardizedAnimation } from '../../../shared/services/standardizedAnimation.service';

import './convo-snippet.scss';

export const ConvoSnippet: FC<{
    convo: IConversation;
    delayMultiplier: number;
}> = ({ convo, delayMultiplier }) => {
    const { chatId } = useParams();
    const { generateAnimation } = useStandardizedAnimation();
    const lastMessage = convo.messages[convo.messages.length - 1];
    const isConversationExpanded = !!chatId;
    const convoSnippetClassnames = classNames({
        'convo-snippet': true,
        'convo-snippet--minimized': !isConversationExpanded,
        'convo-snippet--selected': chatId === convo.id,
        'convo-snippet--other-selected':
            chatId !== convo.id && isConversationExpanded
    });

    return (
        <motion.article
            {...generateAnimation('horExpand', { delay: delayMultiplier * 0.06 })}
            className={convoSnippetClassnames}
        >
            {chatId === convo.id && isConversationExpanded &&<Controls leftSideOption='back' />}
            <AnimatePresence>
                {!isConversationExpanded && (
                    <motion.section
                        key={convo.id + 'snippet'}
                        {...generateAnimation('horExpand', { delay: delayMultiplier * 0.06 })}
                        className="convo-snippet__summary"
                    >
                        {lastMessage && <Link to={`/chat/${convo.id}`}>
                            <section className="convo-snippet__meta">
                                <span className="convo-snippet__sender">
                                    @{lastMessage.sender.handle}
                                </span>
                                {' > '}
                                <span className="convo-snippet__date">
                                    {new Date(
                                        lastMessage.date
                                    ).toLocaleTimeString()}
                                </span>
                                {' > '}
                                <span className="convo-snippet__status">
                                    {lastMessage.status && <MemoizedFormattedMessage
                                        id={lastMessage.status.toUpperCase()}
                                    />}
                                </span>
                            </section>
                            <span className="convo-snippet__message">
                                {lastMessage.text}
                            </span>
                        </Link>}
                    </motion.section>
                )}
                {chatId === convo.id && (
                    <>
                        <Conversation key={convo.id+'convo'} convo={convo} />
                        <NewMsg key={convo.id+'msg'} convoId={convo.id} />
                    </>
                )}
            </AnimatePresence>
        </motion.article>
    );
};
