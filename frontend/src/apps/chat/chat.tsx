import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useMessagesService } from '../../shared/services/messages.service';
import { useAuthenticationService } from '../../shared/services/authentication.service';
import { RootState } from '../../store/store';
import { ConvoSnippet } from './convo-snippet/convo-snippet';

import './chat.scss';

export const Chat: FC = () => {
    const { fetchUserConvos } = useMessagesService();
    const { currentUser } = useAuthenticationService();
    const { chatId } = useParams();
    const conversations = useSelector(
        (state: RootState) => state.conversations.conversations
    );

    const sortedConvos = useMemo(() => {
        return [...conversations].sort((a, b) => {
            const aLastMessageTime = new Date(
                a.messages[a.messages.length - 1].date
            ).getMilliseconds();
            const bLastMessageTime = new Date(
                b.messages[b.messages.length - 1].date
            ).getMilliseconds();

            return aLastMessageTime - bLastMessageTime;
        });
    }, [conversations]);

    const convosToDisplay = useMemo(() => {
        return chatId
            ? sortedConvos.filter((convo) => convo.id === chatId)
            : sortedConvos;
    }, [chatId, sortedConvos]);

    useEffect(function fetchOnMount() {
        fetchUserConvos(currentUser().id);
    }, []);

    return (
        <section className="chat">
            <AnimatePresence>
                {convosToDisplay.map((convo, index) => (
                    <ConvoSnippet
                        key={convo.id}
                        convo={convo}
                        delayMultiplier={index}
                    />
                ))}
            </AnimatePresence>
        </section>
    );
};
