import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';
import { IConversation, IMessage } from '../../models/message';
import {
    setConversations,
    setGigConversations
} from '../../store/messages.slice';
import { RootState } from '../../store/store';
import { useUserService } from './user.service';
import { useApiService } from './api.service';
import { useNotificationsService } from './notifications.service';

/**
 *  Service for sending messages. Relies on AuthorizationService to get the current user.
 */
export function useMessagesService() {
    const dispatch = useDispatch();
    const intl = useIntl();
    const { api } = useApiService();
    const { displayToast } = useNotificationsService();
    const { currentUser, updateUserData, getBasicUserDataById } =
        useUserService();
    const [fetchingConvo, setFetchingConvo] = useState(false);
    const conversations = useSelector(
        (state: RootState) => state.conversations.conversations
    );
    const gigConversations = useSelector(
        (state: RootState) => state.conversations.gigConversations
    );

    const createMessage: (text: string, senderId?: string) => IMessage = (
        text,
        senderId
    ) => {
        return {
            id: uuidv4(),
            date: new Date().toString(),
            sender: senderId || currentUser!.id,
            text: text
        };
    };

    const createConvo: (
        participants: string[],
        msg?: IMessage,
        id?: string,
        anonymize?: boolean
    ) => string = (participants, msg, id, anonymize) => {
        const convoId = id ?? uuidv4();
        const anonymizedHandle = uuidv4().substring(0, 8);

        dispatch(
            setConversations([
                ...conversations,
                {
                    id: convoId,
                    participants: participants,
                    messages: msg
                        ? [...createInitialMessages(participants), msg]
                        : [...createInitialMessages(participants)]
                }
            ])
        );

        if (anonymize) {
            updateUserData(currentUser!.id, {
                aliasMap: {
                    ...currentUser!.aliasMap,
                    [convoId]: anonymizedHandle
                }
            });
        }

        return convoId;
    };

    const getGigConvo = async (gigId: string): Promise<IConversation> => {
        return await api
            .get(`Gig/get/${gigId}/conversation`)
            .json<IConversation>();
    };

    const createInitialMessages = (participants: string[]): IMessage[] => {
        const initialMessages: IMessage[] = [];
        participants.forEach((participant) => {
            const handle = getBasicUserDataById(participant)?.handle;
            const message = createMessage(
                `<@${handle} ${intl.formatMessage({
                    id: 'ENTERED_THE_CHAT'
                })}>`,
                participant
            );
            message.sender = currentUser!.id;
            initialMessages.push(message);
        });
        return initialMessages;
    };

    const fetchConvo: (id: string) => void = (id) => {
        setFetchingConvo(true);
        api.get(`Conversation/${id}`)
            .json<IConversation>()
            .then((convo) => {
                convo &&
                    dispatch(setGigConversations([...gigConversations, convo]));
                setFetchingConvo(false);
            });
    };

    const fetchUserConvos: (userId: string) => void = (userId) => {
        api.query({ participant: userId })
            .get('Conversation/byParticipant')
            .json<IConversation[]>()
            .then((convos) => {
                dispatch(setConversations(convos));
            })
            .catch(() =>
                displayToast(
                    intl.formatMessage({ id: 'FAILED_TO_FETCH_MESSAGES' })
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

    return {
        createMessage,
        sendMessage,
        createConvo,
        fetchConvo,
        fetchingConvo,
        fetchUserConvos,
        getGigConvo
    };
}
