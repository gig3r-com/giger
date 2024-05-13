// import { useDispatch } from 'react-redux';
// import { IConversation, IMessage } from '../../models/message';
//import { IHashUpdatePayload, ISocketMessage, SocketMessageType } from '../../models/websockets';
import { ISocketMessage } from '../../models/websockets';
// import { setConversation } from '../../store/messages.slice';
// import { ITransaction } from '../../models/banking';
// import { addTransaction } from '../../store/bank.slice';
// import { IGig } from '../../models/gig';
// import { updateGig } from '../../store/gigs.slice';

export const useWebsocketService = () => {
    //const dispatch = useDispatch();
    const url = `ws${window.origin.substr(4, window.origin.length)}`;
    const endpointBase = import.meta.env.VITE_WEBSOCKET_ENDPOINT ?? url;
    const ws = new WebSocket(endpointBase);

    //ws.onmessage = (event: MessageEvent<ISocketMessage>) => {
    // if (event.type === SocketMessageType.NEW_MESSAGE) {
    //     const msg = (event.data as ISocketMessage<IMessage>).payload;
    //     dispatch(setConversation(convo));
    // }

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

    const sendMessage = <T>(message: ISocketMessage<T>) => {
        ws.send(JSON.stringify(message));
    };

    return { sendMessage };
};
