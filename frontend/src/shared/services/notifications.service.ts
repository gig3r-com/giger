import { useCallback } from 'react';
import {
    setConversation,
    setUnreadMessage,
    updateConversation
} from '../../store/messages.slice';
import { IWebsocketContext } from '../providers/websocket.model';
import { useWebSocketContext } from '../providers/websocket.provider';
import { useMessagesService } from './messages.service';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectGigConversations,
    selectConversations
} from './messages.selectors';
import { useUserService } from './user.service';
import {
    IConversationConsumablePayload,
    INotificationPayload
} from '../../models/websockets';
import { setNewCurrentTransferHash } from '../../store/bank.slice';
import { setNewStatusHash } from '../../store/gigs.slice';
import { useGigsService } from './gigs.service';
import { useBankingService } from './banking.service';

export const useNotificationsService = () => {
    const dispatch = useDispatch();
    const { lastMessage } = useWebSocketContext() as IWebsocketContext;
    const { fetchUserConvos, getGigConvo } = useMessagesService();
    const { currentUser } = useUserService();
    const { fetchGigs } = useGigsService();
    const { fetchAccounts } = useBankingService();
    const gigConversations = useSelector(selectGigConversations);
    const conversations = useSelector(selectConversations);

    const handleNewMessage = useCallback(
        (lastMessage: IConversationConsumablePayload) => {
            if (!lastMessage) {
                return;
            }
            const conversation = conversations.find(
                (convo) => convo.id === lastMessage.conversationId
            );
            const gigConversation =
                gigConversations.find(
                    (convo) => convo.id === lastMessage.conversationId
                ) || lastMessage.isGigConversation;

            if (!conversation && !gigConversation) {
                fetchUserConvos();
                dispatch(
                    setUnreadMessage({
                        convoId: lastMessage.conversationId,
                        messageId: lastMessage.message.id,
                        isMine:
                            lastMessage.message.sender === currentUser?.handle,
                        gigConvo: false
                    })
                );
                return;
            }

            if (conversation) {
                dispatch(
                    updateConversation({
                        convoId: lastMessage.conversationId,
                        message: lastMessage.message,
                        gigConvo: false,
                        currentUserHandle: currentUser!.handle
                    })
                );
            }

            if (gigConversation) {
                getGigConvo(lastMessage.conversationId).then((convo) => {
                    dispatch(setConversation(convo));
                    dispatch(
                        setUnreadMessage({
                            convoId: lastMessage.conversationId,
                            messageId: lastMessage.message.id,
                            isMine:
                                lastMessage.message.sender ===
                                currentUser?.handle,
                            gigConvo: true
                        })
                    );
                });
            }
        },
        [dispatch, lastMessage, currentUser]
    );

    const handleNewNotification = useCallback(
        (update: INotificationPayload) => {
            if (!update) {
                return;
            }

            if (update.TransactionHash && update.TransactionId) {
                dispatch(
                    setNewCurrentTransferHash({
                        id: update.TransactionId,
                        hash: update.TransactionHash
                    })
                );
                fetchAccounts();
            }

            if (update.GigIdStatus && update.GigStatusHash) {
                dispatch(
                    setNewStatusHash({
                        gigId: update.GigIdStatus,
                        hash: update.GigStatusHash
                    })
                );
                fetchGigs();
            }
        },
        [dispatch]
    );

    return {
        handleNewMessage,
        handleNewNotification
    };
};
