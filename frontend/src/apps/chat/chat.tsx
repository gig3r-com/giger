import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useMessagesService } from '../../shared/services/messages.service';
import { RootState } from '../../store/store';
import { ConvoSnippet } from './convo-snippet/convo-snippet';
import { StartNewConvo } from './start-new/start-new-convo';
import { BigButton } from '../../shared/components/big-button/big-button';
import { useUserService } from '../../shared/services/user.service';
import { debugLog } from '../../shared/utils/debug';

import './chat.scss';
import dayjs from 'dayjs';

export const Chat: FC = () => {
    const intl = useIntl();
    const { fetchUserConvos } = useMessagesService();
    const { currentUser } = useUserService();
    const location = useLocation();
    const navigate = useNavigate();
    const { chatId } = useParams();
    const conversations = useSelector(
        (state: RootState) => state.conversations.conversations
    );
    
    debugLog('Chat component:', {
        conversationsCount: conversations.length,
        chatId,
        currentUser: currentUser?.handle
    });

    const sortedConvos = useMemo(() => {
        return [...conversations].sort((a, b) => {
            return dayjs(b.messages[b.messages.length - 1]?.date).diff(
                dayjs(a.messages[a.messages.length - 1]?.date)
            );
        });
    }, [conversations]);

    const convosToDisplay = useMemo(() => {
        return chatId
            ? sortedConvos.filter((convo) => convo.id === chatId)
            : sortedConvos;
    }, [chatId, sortedConvos]);

    const onNewMessage = useMemo(
        () => location.pathname === '/chat/new',
        [location]
    );
    const showNewMsgButton = useMemo(() => {
        return !chatId && !onNewMessage;
    }, [chatId, onNewMessage]);

    const chatListClasses = useMemo(
        () =>
            classNames({
                chat__list: true,
                'chat__list--msg-open': chatId
            }),
        [chatId]
    );

    useEffect(function fetchOnMount() {
        currentUser && fetchUserConvos();
    }, []);

    useEffect(
        function redirectOnConvoNotFound() {
            if (chatId && !conversations.some((convo) => convo.id === chatId)) {
                navigate('/chat');
            }
        },
        [chatId, conversations, navigate]
    );

    return (
        <section className="chat">
            <div className={chatListClasses}>
                <AnimatePresence>
                    {convosToDisplay.map((convo, index) => (
                        <ConvoSnippet
                            key={convo.id}
                            convo={convo}
                            delayMultiplier={index}
                        />
                    ))}
                </AnimatePresence>
            </div>
            {showNewMsgButton && (
                <Link to="new">
                    <BigButton
                        color="primary"
                        text={intl.formatMessage({ id: 'NEW_MESSAGE' })}
                        onClick={() => {}}
                    />
                </Link>
            )}
            {onNewMessage && <StartNewConvo />}
        </section>
    );
};
