import { FC, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { IConversation } from '../../../models/message';
import { Conversation } from '../../../shared/components/messaging/conversation/conversation';
import { NewMsg } from '../../../shared/components/new-msg/new-msg';
import { Controls } from '../../../shared/components/controls/controls';
import { useStandardizedAnimation } from '../../../shared/services/standardizedAnimation.service';
import { useUserService } from '../../../shared/services/user.service';
import { useMessagesService } from '../../../shared/services/messages.service';
import MemoizedFormattedMessage from 'react-intl/src/components/message';

import './convo-snippet.scss';
import dayjs from 'dayjs';

export const ConvoSnippet: FC<{
    convo: IConversation;
    delayMultiplier: number;
}> = ({ convo, delayMultiplier }) => {
    const { chatId } = useParams();
    const { generateAnimation } = useStandardizedAnimation();
    const { convoHasUnreadMessages } = useMessagesService();
    const { currentUser } = useUserService();
    const msgToDisplayAsSnippet = convo.messages[convo.messages.length - 1];
    const isConversationExpanded = !!chatId;
    const convoSnippetClassnames = classNames({
        'convo-snippet': true,
        'convo-snippet--minimized': !isConversationExpanded,
        'convo-snippet--selected': chatId === convo.id,
        'convo-snippet--other-selected':
            chatId !== convo.id && isConversationExpanded
    });
    const messageClasses = classNames({
        'convo-snippet__message': true,
        'convo-snippet__message--unread': convoHasUnreadMessages(convo.id)
    });
    const canSendMessages = useMemo(() => {
        return (
            currentUser &&
            (convo.participantsAllowedToSendMsgs?.includes(currentUser?.id) ??
                true)
        );
    }, [currentUser, convo.participantsAllowedToSendMsgs]);

    const otherParty = () => {
        const others = convo.participants.filter(
            (participant) => participant !== currentUser?.handle
        );

        if (others.length === 1) {
            return others[0];
        } else {
            return `[${others[0]}, ${others[1]}${others.length > 2 ? ', ...' : ''}]`;
        }
    };

    const timeSince = () => {
        const date = dayjs(msgToDisplayAsSnippet.date);
        const now = dayjs().add(100, 'years');
        const diff = now.diff(date, 'day');

        if (diff === 0) {
            return date.format('HH:mm:ss');
        } 
        if (diff < 3) {
            return `${now.diff(date, 'hours')} hours ago`;
        }

        return `${now.diff(date, 'days')} days ago`;
    };

    return (
        <motion.article
            {...generateAnimation('horExpand', {
                delay: delayMultiplier * 0.06
            })}
            className={convoSnippetClassnames}
        >
            {chatId === convo.id && isConversationExpanded && (
                <Controls leftSideOption="back" />
            )}
            <AnimatePresence>
                {!isConversationExpanded && (
                    <motion.section
                        key={convo.id + 'snippet'}
                        {...generateAnimation('horExpand', {
                            delay: delayMultiplier * 0.06
                        })}
                        className="convo-snippet__summary"
                    >
                        {msgToDisplayAsSnippet && (
                            <Link to={`/chat/${convo.id}`}>
                                <section className="convo-snippet__meta">
                                    <span className="convo-snippet__sender">
                                        @{otherParty()}
                                    </span>
                                    {' > '}
                                    <span className="convo-snippet__date">
                                        {timeSince()}
                                    </span>
                                    {' > '}
                                    <span className="convo-snippet__status">
                                        {convoHasUnreadMessages(convo.id) ? (
                                            <MemoizedFormattedMessage id="NEW_MESSAGES_ABBREVIATION" />
                                        ) : (
                                            <MemoizedFormattedMessage id="READ" />
                                        )}
                                    </span>
                                </section>
                                <span className={messageClasses}>
                                    {msgToDisplayAsSnippet.text}
                                </span>
                            </Link>
                        )}
                    </motion.section>
                )}
                {chatId === convo.id && (
                    <>
                        <Conversation key={convo.id + 'convo'} convo={convo} />
                        {canSendMessages && (
                            <NewMsg key={convo.id + 'msg'} convoId={convo.id} />
                        )}
                    </>
                )}
            </AnimatePresence>
        </motion.article>
    );
};
