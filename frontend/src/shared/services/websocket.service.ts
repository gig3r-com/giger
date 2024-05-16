import {
    ISocketHashUpdate,
    ISocketNewChatMessage
} from '../../models/websockets';
import { useMessagesService } from './messages.service';

export const useWebsocketService = () => {
    const { insertNewMessage, updateConversationHashes } = useMessagesService();
    const baseUrl = `ws${window.origin.substr(4, window.origin.length)}`;
    const endpointBase = import.meta.env.VITE_WEBSOCKET_ENDPOINT ?? baseUrl;
    const convoSocket = new WebSocket(endpointBase + 'ws1337');
    const notificationSocket = new WebSocket(endpointBase + 'ws2137');

    // if (event.type === SocketMessageType.HASH_UPDATE) {
    //     const transaction = (event.data as ISocketMessage<IHashUpdatePayload>)
    //         .payload;
    //     //dispatch(addTransaction({ transaction }));
    // }

    // if (event.type === SocketMessageType.GIG_UPDATE) {
    //     const gig = (event.data as ISocketMessage<IGig>).payload;
    //     dispatch(updateGig(gig));
    // }
    //};

    const sendMessage = (message: ISocketNewChatMessage) => {
        convoSocket.send(JSON.stringify(message));
    };

    const setupMessageSocket = () => {
        convoSocket.onmessage = (event) => {
            insertNewMessage(
                event.data.conversationId,
                event.data.message,
                false
            );
        };
    };

    const setupNotificationSocket = () => {
        notificationSocket.onmessage = (event) => {
            console.log(
                'Message from server ',
                event.data as ISocketHashUpdate
            );
            const hashes = (event.data as ISocketHashUpdate).payload;

            if (hashes.conversationHashes) {
                updateConversationHashes(hashes.conversationHashes, false);
            }

            if (hashes.gigConversationHashes) {
                updateConversationHashes(hashes.gigConversationHashes, true);
            }
        };
    };

    return { sendMessage, setupNotificationSocket, setupMessageSocket };
};
