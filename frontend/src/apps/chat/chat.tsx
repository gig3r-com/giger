import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useMessagesService } from '../../shared/services/messages.service';
import { useAuthenticationService } from '../../shared/services/authentication.service';
import { RootState } from '../../store/store';
import { ConvoSnippet } from './convo-snippet/convo-snippet';
import { StartNewConvo } from './start-new/start-new-convo';
import { BigButton } from '../../shared/components/big-button/big-button';

import './chat.scss';
import classNames from 'classnames';

export const Chat: FC = () => {
    const intl = useIntl();
    const { fetchUserConvos } = useMessagesService();
    const { currentUser } = useAuthenticationService();
    const location = useLocation();
    const { chatId } = useParams();
    const conversations = useSelector(
        (state: RootState) => state.conversations.conversations
    );

    const sortedConvos = useMemo(() => {
        return [...conversations].sort((a, b) => {
            const aLastMessageTime = new Date(
                a.messages[a.messages.length - 1]?.date
            ).getMilliseconds();
            const bLastMessageTime = new Date(
                b.messages[b.messages.length - 1]?.date
            ).getMilliseconds();

            return aLastMessageTime - bLastMessageTime;
        });
    }, [conversations]);

    const convosToDisplay = useMemo(() => {
        return chatId
            ? sortedConvos.filter((convo) => convo.id === chatId)
            : sortedConvos;
    }, [chatId, sortedConvos]);

    const onNewMessage = useMemo(() => location.pathname === '/chat/new', [location]);
    const showNewMsgButton = useMemo(() => {
        return !chatId && !onNewMessage;
    }, [chatId, onNewMessage]);

    const chatListClasses = useMemo(() => classNames({
        'chat__list': true,
        'chat__list--msg-open': chatId
    }), [chatId])

    useEffect(function fetchOnMount() {
        fetchUserConvos(currentUser().id);
    }, []);

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
