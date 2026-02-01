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
    setGigConversations
} from '../../store/messages.slice';
import { useUserService } from './user.service';
import { useApiService } from './api.service';
import { useToastService } from './toast.service';
import {
    selectGigConversations,
    selectUnreadGigMessages,
    selectUnreadMessages
} from './messages.selectors';
import dayjs from 'dayjs';
import { useWebSocketContext } from '../providers/websocket.provider';
import { IWebsocketContext } from '../providers/websocket.model';

/**
 *  Service for sending messages. Relies on AuthorizationService to get the current user.
 */
export function useMessagesService() {
    const dispatch = useDispatch();
    const intl = useIntl();
    const { api } = useApiService();
    const { sendMessage } = useWebSocketContext() as IWebsocketContext;
    const { displayToast } = useToastService();
    const { currentUser } = useUserService();
    const [fetchingConvo, setFetchingConvo] = useState(false);
    const gigConversations = useSelector(selectGigConversations);
    const unreadMessages = useSelector(selectUnreadMessages);
    const unreadGigMessages = useSelector(selectUnreadGigMessages);

    const createMessage: (
        text: string,
        senderHandle?: string,
        anonymize?: boolean
    ) => IMessage = (text, senderHandle) => {
        return {
            id: uuidv4(),
            date: dayjs().add(100, 'year').toISOString(),
            sender: senderHandle ?? currentUser!.handle,
            text: text
        };
    };

    const createConvo: (
        participants: string[],
        id?: string,
        anonymize?: boolean
    ) => Promise<string> = (participants, id, anonymize) =>
        new Promise((resolve, reject) => {
            const convoId = id ?? uuidv4();
            const anonymizedUsers = anonymize ? [currentUser!.handle] : [];
            const convo: IConversation = {
                id: convoId,
                anonymizedUsers,
                gigConversation: false,
                participants,
                messages: [...createInitialMessages(participants, anonymize)]
            };

            console.log('[CreateConvo] Creating conversation with:', JSON.stringify(convo, null, 2));

            api.url('Conversation')
                .post(convo)
                .json<IConversation>()
                .catch((error) => {
                    console.error('[CreateConvo] POST failed:', error);
                    reject(error);
                })
                .then((conversation) => {
                    if (!conversation) {
                        console.error('[CreateConvo] No conversation returned');
                        reject();
                        return;
                    }
                    console.log('[CreateConvo] POST succeeded, adding to Redux:', conversation.id);
                    dispatch(addConversation(conversation));
                    resolve(conversation.id);
                });
        });

    const getGigConvo = async (gigId: string): Promise<IConversation> => {
        return await api
            .get(`Gig/get/${gigId}/conversation`)
            .json<IConversation>();
    };

    const createInitialMessages = (
        participants: string[],
        anonymize?: boolean
    ): IMessage[] => {
        const initialMessages: IMessage[] = [];
        participants.forEach((participant) => {
            const handle =
                anonymize && participant === currentUser?.handle
                    ? intl.formatMessage({ id: 'ANONYMOUS' })
                    : participant;
            const message = createMessage(
                `<@${handle} ${intl.formatMessage({
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

    const send: (
        messageText: string,
        convoId: string,
        isGigConversation?: boolean
    ) => void = (messageText, convoId, isGigConversation = false) => {
        if (messageText.trim() === '') {
            console.error('Message text cannot be empty');
            return;
        }

        const message = createMessage(messageText);
        
        console.log('Sending message:', {
            convoId,
            messageId: message.id,
            text: message.text,
            date: message.date,
            sender: message.sender
        });
        
        console.log('sendMessage function:', typeof sendMessage, sendMessage);

        sendMessage({
            ConversationId: convoId,
            Message: {
                Id: message.id,
                Date: message.date,
                Sender: message.sender,
                Text: message.text
            },
            IsGigConveration: isGigConversation
        });
        
        console.log('sendMessage called');
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

    const gigConvoHasUnreadMessages = (convoId: string): boolean => {
        return unreadGigMessages[convoId]?.length > 0;
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

    const addModeratorToConvo = (convoId: string) => {
        api.url(`Conversation/${convoId}/participants`)
            .query({ userName: currentUser!.handle })
            .patch()
            .res();
    };

    return {
        createMessage,
        addModeratorToConvo,
        send,
        createConvo,
        fetchConvo,
        fetchingConvo,
        fetchUserConvos,
        getGigConvo,
        isMessageUnread,
        convoHasUnreadMessages,
        gigConvoHasUnreadMessages,
        updateConversationHashes
    };
}
