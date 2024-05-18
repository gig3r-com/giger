import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
    IConversationUpdatePayload,
    ISocketHashUpdate,
    ISocketNewChatMessage
} from '../../models/websockets';
//import { useMessagesService } from './messages.service';
import { useEffect, useRef } from 'react';

export const useWebsocketService = () => {
    //const { insertNewMessage, updateConversationHashes } = useMessagesService();
    const baseUrl = `wss${window.origin.substr(4, window.origin.length)}`;
    const endpointBase = import.meta.env.VITE_WEBSOCKET_ENDPOINT ?? baseUrl;
    const convoSocketRef = useRef<string | null>(endpointBase);
    const notificationSocketRef = useRef<string>('');

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        convoSocketRef.current,
        {
            share: false,
            shouldReconnect: () => true,
            reconnectAttempts: Infinity,
            reconnectInterval: 25000,
            queryParams: { authToken: localStorage.getItem('authToken') ?? '' }
        }
    );

    useEffect(() => {
        console.log('Connection state changed', ReadyState[readyState]);
    }, [readyState]);

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        console.log(`Got a new message: ${lastJsonMessage}`);
        // const data = lastJsonMessage as IConversationUpdatePayload;
        // data && insertNewMessage(data.conversationId, data.message, false);
    }, [lastJsonMessage]);

    const setupMessageSocket = () => {};

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

    // const sendMessage = (message: ISocketNewChatMessage) => {
    //     sendJsonMessage(message);
    // };

    // const setupMessageSocket = () => {
    //     convoSocket.onmessage = (event) => {
    //         insertNewMessage(
    //             event.data.conversationId,
    //             event.data.message,
    //             false
    //         );
    //     };
    // };

    // const setupNotificationSocket = () => {
    //     notificationSocket.onmessage = (event) => {
    //         console.log(
    //             'Message from server ',
    //             event.data as ISocketHashUpdate
    //         );
    //         const hashes = (event.data as ISocketHashUpdate).payload;

    //         if (hashes.conversationHashes) {
    //             updateConversationHashes(hashes.conversationHashes, false);
    //         }

    //         if (hashes.gigConversationHashes) {
    //             updateConversationHashes(hashes.gigConversationHashes, true);
    //         }
    //     };
    // };

    return { setupMessageSocket, sendJsonMessage, lastJsonMessage };
};
