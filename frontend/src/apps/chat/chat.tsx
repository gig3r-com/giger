import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useMessagesService } from '../../shared/services/messages.service';
import { useAuthenticationService } from '../../shared/services/authentication.service';
import { RootState } from '../../store/store';
import { ConvoSnippet } from './convo-snippet/convo-snippet';

import './chat.scss';

export const Chat: FC = () => {
    const { fetchUserConvos } = useMessagesService();
    const { currentUser } = useAuthenticationService();
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

    useEffect(function fetchOnMount() {
        fetchUserConvos(currentUser().id);
    }, []);

    return (
        <section className="chat">
            {sortedConvos.map((convo) => (
                <ConvoSnippet key={convo.id} convo={convo} />
            ))}
        </section>
    );
};
