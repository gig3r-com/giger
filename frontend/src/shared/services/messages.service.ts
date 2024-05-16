import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';
import { IConversation, IMessage } from '../../models/message';
import {
    addConversation,
    setAllConversationHashes,
    setAllGigConversationHashes,
    setConversations,
    setGigConversations,
    updateConversation
} from '../../store/messages.slice';
import { useUserService } from './user.service';
import { useApiService } from './api.service';
import { useNotificationsService } from './notifications.service';
import {
    selectGigConversations,
    selectUnreadMessages
} from './messages.selectors';
import dayjs from 'dayjs';

/**
 *  Service for sending messages. Relies on AuthorizationService to get the current user.
 */
export function useMessagesService() {
    const dispatch = useDispatch();
    const intl = useIntl();
    const { api } = useApiService();
    const { displayToast } = useNotificationsService();
    const { currentUser } = useUserService();
    const [fetchingConvo, setFetchingConvo] = useState(false);
    const gigConversations = useSelector(selectGigConversations);
    const unreadMessages = useSelector(selectUnreadMessages);

    const createMessage: (text: string, senderHandle?: string) => IMessage = (
        text,
        senderHandle
    ) => {
        return {
            id: uuidv4(),
            date: dayjs().toISOString(),
            sender: senderHandle || currentUser!.handle,
            text: text
        };
    };

    const createConvo: (
        participants: string[],
        id?: string,
        anonymize?: boolean
    ) => Promise<string> = (participants, id) =>
        new Promise((resolve, reject) => {
            const convoId = id ?? uuidv4();
            //const anonymizedHandle = uuidv4().substring(0, 8);
            const convo: IConversation = {
                id: convoId,
                gigConversation: false,
                participants,
                messages: [...createInitialMessages(participants)]
            };

            api.url('Conversation')
                .post(convo)
                .json<IConversation>()
                .catch(() => reject())
                .then((conversation) => {
                    if (!conversation) {
                        reject();
                        return;
                    }
                    dispatch(addConversation(conversation));
                    resolve(conversation.id);
                });
        });

    const getGigConvo = async (gigId: string): Promise<IConversation> => {
        return await api
            .get(`Gig/get/${gigId}/conversation`)
            .json<IConversation>();
    };

    const createInitialMessages = (participants: string[]): IMessage[] => {
        const initialMessages: IMessage[] = [];
        participants.forEach((participant) => {
            const message = createMessage(
                `<@${participant} ${intl.formatMessage({
                    id: 'ENTERED_THE_CHAT'
                })}>`,
                participant
            );
            message.sender = participant;
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

    const fetchUserConvos = () => {
        api.query({ participant: currentUser?.handle })
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
        api.url(`Conversation/${convoId}/message`)
            .post(message)
            .res()
            .then(() => {});

        // try {
        //     // send message
        //     const updatedConvo: IConversation = JSON.parse(
        //         JSON.stringify(
        //             [...conversations, ...gigConversations].find(
        //                 (convo) => convo.id === convoId
        //             )
        //         )
        //     );
        //     updatedConvo?.messages.push(message);

        //     if (updatedConvo.gigConversation) {
        //         const updatedConvos = [...gigConversations].filter(
        //             (conversation) => conversation.id !== convoId
        //         );
        //         updatedConvos.push(updatedConvo);
        //         dispatch(setGigConversations(updatedConvos));
        //     } else {
        //         const updatedConvos = [...conversations].filter(
        //             (conversation) => conversation.id !== convoId
        //         );
        //         updatedConvos.push(updatedConvo);
        //         dispatch(setConversations(updatedConvos));
        //     }
        // } catch (error) {
        //     console.error(error);
        //}
    };

    const isMessageUnread = (convoId: string, messageId: string): boolean => {
        const unread = unreadMessages[convoId]?.find(
            (msgId) => msgId === messageId
        );
        return unread !== undefined;
    };

    const convoHasUnreadMessages = (convoId: string): boolean => {
        return unreadMessages[convoId]?.length > 0;
    };

    const insertNewMessage = (
        convoId: string,
        message: IMessage,
        gigConvo: boolean
    ) => {
        dispatch(
            updateConversation({
                convoId,
                message,
                gigConvo
            })
        );
    };

    const updateConversationHashes = (
        hashes: Record<string, number>,
        gigConversationHashes: boolean
    ) => {
        if (gigConversationHashes) {
            dispatch(setAllGigConversationHashes(hashes));
        } else {
            dispatch(setAllConversationHashes(hashes));
        }
    };
    return {
        createMessage,
        sendMessage,
        createConvo,
        fetchConvo,
        fetchingConvo,
        fetchUserConvos,
        getGigConvo,
        isMessageUnread,
        convoHasUnreadMessages,
        insertNewMessage,
        updateConversationHashes
    };
}
