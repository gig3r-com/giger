import { IConversation, IMessage, IMessageStatus } from '../../models/message';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../models/user';
import { users } from '../../mocks/users';
import { useAuthenticationService } from './authentication.service';
import { mockConvos } from '../../mocks/convos';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setConversations } from '../../store/messages.slice';
import { conversations } from '../../mocks/userConvos';

/**
 *  Service for sending messages. Relies on AuthorizationService to get the current user.
 */
export function useMessagesService() {
    const dispatch = useDispatch();
    const { currentUser } = useAuthenticationService();
    const [fetchingConvo, setFetchingConvo] = useState(false);

    const createMessage: (text: string) => IMessage = (text) => {
        return {
            id: uuidv4(),
            date: new Date().toString(),
            sender: currentUser(),
            text: text,
            status: IMessageStatus.AWAITING
        };
    };

    const createConvo: (
        msg: IMessage,
        id?: string,
        participants?: IUser[]
    ) => IConversation = (msg, id, participants) => {
        return {
            id: id ?? uuidv4(),
            participants: participants ?? [msg.sender],
            messages: [msg]
        };
    };

    const fetchConvo: (id: string) => IConversation | undefined = (id) => {
        setFetchingConvo(true);
        const convo = mockConvos.find((convo) => convo.id === id);
        setFetchingConvo(false);
        return convo;
    };

    const fetchUserConvos: (userId: string) => void = (userId) => {
        dispatch(
            setConversations(
                JSON.parse(
                    JSON.stringify(
                        conversations.filter((convo) =>
                            convo.participants.some(
                                (user) => user.id === userId
                            )
                        )
                    )
                )
            )
        );
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
            mockConvos
                .find((convo) => convo.id === convoId)
                ?.messages.push(message);
            dispatch(setConversations(JSON.parse(JSON.stringify(mockConvos))));
            console.log('message sent:', message, convoId);
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
