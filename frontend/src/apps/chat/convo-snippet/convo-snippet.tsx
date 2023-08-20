import { FC } from 'react';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { IConversation } from '../../../models/message';
import { Conversation } from '../../../shared/components/messaging/conversation/conversation';
import { ReactComponent as ChevronLeft } from '../../../assets/chevron-left-solid.svg';
import { NewMsg } from '../../../shared/components/new-msg/new-msg';

import './convo-snippet.scss';

export const ConvoSnippet: FC<{
    convo: IConversation;
    delayMultiplier: number;
}> = ({ convo, delayMultiplier }) => {
    const { chatId } = useParams();
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
            initial={{ opacity: 0, transform: 'scaleX(0)' }}
            animate={{ opacity: 1, transform: 'scaleX(1)' }}
            exit={{ opacity: 0, transform: 'scaleX(0)', height: 0 }}
            transition={{
                delay: delayMultiplier * 0.06,
                ease: cubicBezier(0.16, 1, 0.3, 1)
            }}
            className={convoSnippetClassnames}
        >
            {chatId === convo.id && isConversationExpanded && (
                <Link to="/chat" key={convo.id + 'controls'}>
                    <header className="convo-snippet__controls">
                        <ChevronLeft />
                        <span className="convo-snippet__back">
                            <MemoizedFormattedMessage id="BACK" />
                        </span>
                    </header>
                </Link>
            )}
            <AnimatePresence>
                {!isConversationExpanded && (
                    <motion.section
                        key={convo.id + 'snippet'}
                        initial={{ opacity: 0, transform: 'scaleX(0)' }}
                        animate={{ opacity: 1, transform: 'scaleX(1)' }}
                        exit={{ opacity: 0, transform: 'scaleX(0)', height: 0 }}
                        transition={{
                            delay: delayMultiplier * 0.06,
                            ease: cubicBezier(0.16, 1, 0.3, 1)
                        }}
                        className="convo-snippet__summary"
                    >
                        <Link to={`/chat/${convo.id}`}>
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
                        </Link>
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
