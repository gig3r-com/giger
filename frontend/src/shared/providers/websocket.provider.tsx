import {
    createContext,
    useContext,
    useEffect,
    FC,
    useState,
    useRef,
    useCallback
} from 'react';
import {
    IConversationConsumablePayload,
    IConversationUpdatePayload
} from '../../models/websockets';
import { IWebsocketContext } from './websocket.model';
import { useApiService } from '../services/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth.slice';
import { IUserPrivate } from '../../models/user';
import { setAllConversationHashes } from '../../store/messages.slice';
import { IHashDataUpdatePayload } from '../../models/general';

export const WebSocketContext = createContext<IWebsocketContext | null>(null);

export const WebSocketProvider: FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const ws = useRef<WebSocket | null>(null);
    const notificationWs = useRef<WebSocket | null>(null);
    const dispatch = useDispatch();
    const { api } = useApiService();
    const [lastMessage, setLastMessage] =
        useState<IConversationConsumablePayload | null>(null);
    const authToken = useSelector(selectAuthToken);
    const [reconnectInterval, setReconnectInterval] = useState<number>(1000);
    const baseUrl = `wss${window.origin.split('https')[1]}/`;
    const endpointBase = import.meta.env.VITE_WEBSOCKET_ENDPOINT ?? baseUrl;

    const generateSocket = useCallback(
        (mode: 'notifications' | 'convo') => {
            return new WebSocket(
                `${endpointBase}/ws${mode === 'convo' ? '1337' : '2137'}?AuthToken=${authToken}`
            );
        },
        [authToken, endpointBase]
    );

    /**
     * when the connection is suspended we miss out on all the messages that were sent during that time
     * this function will fetch the hashes for comparison
     */
    const getIntermediateData = () => {
        if (!localStorage.getItem('loggedInUser')) return;
        //this is terrible, there has to be a better way but there's no time now
        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUser') ?? ''
        ) as IUserPrivate | null;

        const id = loggedInUser?.id;
        const handle = loggedInUser?.handle;

        if (!id || !handle) return;

        api.query({ userName: handle })
            .get(`Hashes/update/${id}`)
            .json<IHashDataUpdatePayload>()
            .then((data) => {
                console.log(data);
                dispatch(setAllConversationHashes(data.conversationHashes));
            });
    };

    const ping = (socket: WebSocket) => {
        return window.setInterval(function () {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: 'ping' }));
            }
        }, 55000);
    };

    const setupWebsocket = useCallback(
        async (mode: 'convo' | 'notifications') => {
            const socketRef = mode === 'convo' ? ws : notificationWs;
            const socketMissingOrClosed =
                !socketRef.current ||
                socketRef.current.readyState === WebSocket.CLOSED;

            if (!authToken || !socketMissingOrClosed) {
                return;
            }

            const socket = generateSocket(mode);
            let interval: number;

            socket.binaryType = 'arraybuffer';

            socket.onopen = () => {
                interval = ping(socket);
            };

            socket.onclose = () => {
                clearInterval(interval);
                // setupWebsocket();
            };

            socket.onerror = (error) => {
                console.error('WebSocket error', error);
            };

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (mode === 'convo') {
                    handleConvoMessage(message as IConversationUpdatePayload);
                    return;
                }
                if (mode === 'notifications') {
                    //setLastMessage(message as IConversationConsumablePayload);
                    console.log('notifications', message);
                    return;
                }
            };

            socketRef.current = socket;
        },
        [authToken, generateSocket]
    );

    const handleConvoMessage = (message: IConversationUpdatePayload) => {
        setLastMessage({
            conversationId: message.ConversationId,
            isGigConversation: !!message.IsGigConveration,
            message: {
                id: message.Message.Id,
                date: message.Message.Date,
                sender: message.Message.Sender,
                text: message.Message.Text
            }
        });
    };

    const sendMessage = (message: IConversationUpdatePayload) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.error('Convo WebSocket is not connected');
            setTimeout(async () => {
                await setupWebsocket('convo');
                sendMessage(message);
            }, reconnectInterval);
            setReconnectInterval(reconnectInterval * 2);
        }
    };

    const handleVisibilityChange = useCallback(() => {
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                console.log('Page hidden, closing WebSocket connection');
                if (ws.current) {
                    ws.current.close();
                }
                if (notificationWs.current) {
                    notificationWs.current.close();
                }
                setReconnectInterval(1000);
            } else {
                console.log('Page visible, reconnecting WebSocket');
                if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
                    setTimeout(() => {
                        getIntermediateData();
                        setupWebsocket('convo');
                    }, reconnectInterval);
                    setReconnectInterval(reconnectInterval * 2);
                }
                if (
                    !notificationWs.current ||
                    notificationWs.current.readyState === WebSocket.CLOSED
                ) {
                    setTimeout(() => {
                        setupWebsocket('notifications');
                    }, reconnectInterval);
                    setReconnectInterval(reconnectInterval * 2);
                }
            }
        });
    }, [setupWebsocket]);

    useEffect(function setup() {
        setupWebsocket('convo');
        setupWebsocket('notifications');
        handleVisibilityChange();
    }, []);

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to access the WebSocket context
export const useWebSocketContext = () => useContext(WebSocketContext);
