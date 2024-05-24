import { useCallback } from 'react';
import { updateConversation } from '../../store/messages.slice';
import { IWebsocketContext } from '../providers/websocket.model';
import { useWebSocketContext } from '../providers/websocket.provider';
import { useMessagesService } from './messages.service';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectGigConversations,
    selectConversations
} from './messages.selectors';
import { useUserService } from './user.service';
import { IConversationConsumablePayload } from '../../models/websockets';

export const useNotificationsService = () => {
    const dispatch = useDispatch();
    const { lastMessage } = useWebSocketContext() as IWebsocketContext;
    const { fetchUserConvos } = useMessagesService();
    const { currentUser } = useUserService();
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
            const gigConversation = gigConversations.find(
                (convo) => convo.id === lastMessage.conversationId
            );

            if (!conversation && !gigConversation) {
                fetchUserConvos();
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
                dispatch(
                    updateConversation({
                        convoId: lastMessage.conversationId,
                        message: lastMessage.message,
                        gigConvo: true,
                        currentUserHandle: currentUser!.handle
                    })
                );
            }
        },
        [dispatch, lastMessage, currentUser]
    );

    return {
        handleNewMessage
    };
};
