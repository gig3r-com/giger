import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { IConversation, IMessage, IMessageStatus } from '../../models/message';
import { IUser } from '../../models/user';
import { users } from '../../mocks/users';
import { mockConvos } from '../../mocks/convos';
import {
    setConversations,
    setGigConversations
} from '../../store/messages.slice';
import { RootState } from '../../store/store';
import { mockUserConvos } from '../../mocks/userConvos';

/**
 *  Service for sending messages. Relies on AuthorizationService to get the current user.
 */
export function useMessagesService() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const [fetchingConvo, setFetchingConvo] = useState(false);
    const conversations = useSelector(
        (state: RootState) => state.conversations.conversations
    );
    const gigConversations = useSelector(
        (state: RootState) => state.conversations.gigConversations
    );

    const createMessage: (text: string) => IMessage = (text) => {
        return {
            id: uuidv4(),
            date: new Date().toString(),
            sender: currentUser!,
            text: text,
            status: IMessageStatus.AWAITING
        };
    };

    const createConvo: (
        participants: IUser[],
        msg?: IMessage,
        id?: string
    ) => string = (participants, msg, id) => {
        const convoId = id ?? uuidv4();
        dispatch(
            setConversations([
                ...conversations,
                {
                    id: convoId,
                    participants: participants,
                    messages: msg ? [msg] : []
                }
            ])
        );

        return convoId;
    };

    const fetchConvo: (id: string) => void = (id) => {
        setFetchingConvo(true);
        const convo = mockConvos.find((convo) => convo.id === id);
        setFetchingConvo(false);

        convo && dispatch(setGigConversations([...gigConversations, convo]));
    };

    const fetchUserConvos: (userId: string) => void = (userId) => {
        const filteredConvos = mockUserConvos.filter((convo) =>
            convo.participants.some((user) => user.id === userId)
        );
        dispatch(setConversations(JSON.parse(JSON.stringify(filteredConvos))));
    };

    const sendMessage: (messageText: string, convoId: string) => void = (
        messageText,
        convoId
    ) => {
        if (messageText.trim() === '') {
            console.error('Message text cannot be empty');
        }

        const message = createMessage(messageText);

        try {
            // send message
            const updatedConvo: IConversation = JSON.parse(
                JSON.stringify(
                    [...conversations, ...gigConversations].find(
                        (convo) => convo.id === convoId
                    )
                )
            );
            updatedConvo?.messages.push(message);

            if (updatedConvo.gigConversation) {
                const updatedConvos = [...gigConversations].filter(
                    (conversation) => conversation.id !== convoId
                );
                updatedConvos.push(updatedConvo);
                dispatch(setGigConversations(updatedConvos));
            } else {
                const updatedConvos = [...conversations].filter(
                    (conversation) => conversation.id !== convoId
                );
                updatedConvos.push(updatedConvo);
                dispatch(setConversations(updatedConvos));
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * TODO: Connect to backend once it exists
     * ? Move to a different service?
     * Returns a list of users that match the given string
     * @param name
     */
    const findUserByName: (name: string) => IUser[] = (name) => {
        console.log(name);
        return users.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    };

    return {
        createMessage,
        sendMessage,
        findUserByName,
        createConvo,
        fetchConvo,
        fetchingConvo,
        fetchUserConvos
    };
}
