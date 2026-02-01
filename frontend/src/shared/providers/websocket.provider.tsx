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
    IConversationUpdatePayload,
    INotificationPayload
} from '../../models/websockets';
import { IWebsocketContext } from './websocket.model';
import { useApiService } from '../services/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth.slice';
import { IUserPrivate } from '../../models/user';
import { setAllConversationHashes } from '../../store/messages.slice';
import { IHashDataUpdatePayload } from '../../models/general';
import { selectCurrentUser } from '../../store/users.selectors';

export const WebSocketContext = createContext<IWebsocketContext | null>(null);

export const WebSocketProvider: FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const ws = useRef<WebSocket | null>(null);
    const notificationWs = useRef<WebSocket | null>(null);
    const dispatch = useDispatch();
    const { api } = useApiService();
    const [lastNotificationUpdate, setLastNotificationUpdate] =
        useState<INotificationPayload | null>(null);
    const [lastMessage, setLastMessage] =
        useState<IConversationConsumablePayload | null>(null);
    const authToken = useSelector(selectAuthToken);
    const currentUser = useSelector(selectCurrentUser);
    const [reconnectInterval, setReconnectInterval] = useState<number>(1000);
    const baseUrl = `ws${window.origin.split('http')[1]}`;
    const endpointBase = import.meta.env.VITE_WEBSOCKET_ENDPOINT ?? baseUrl;

    const generateSocket = useCallback(
        (mode: 'notifications' | 'convo') => {
            const url = `${endpointBase}/ws${mode === 'convo' ? '1337' : '2137'}?AuthToken=${authToken}`;
            console.log(`[WebSocket] Connecting to: ${url}`);
            return new WebSocket(url);
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
                console.log(`[WebSocket] ${mode} socket connected`);
                interval = ping(socket);
            };

            socket.onclose = () => {
                console.log(`[WebSocket] ${mode} socket closed`);
                clearInterval(interval);
                // setupWebsocket();
            };

            socket.onerror = (error) => {
                console.error(`[WebSocket] ${mode} socket error:`, error);
            };

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log('[WebSocket] Received message:', message);
                
                if (mode === 'convo') {
                    handleConvoMessage(message as IConversationUpdatePayload);
                    return;
                }
                if (mode === 'notifications') {
                    setLastNotificationUpdate(message as INotificationPayload);
                    console.log(
                        'notifications',
                        message as INotificationPayload
                    );
                    return;
                }
            };

            socketRef.current = socket;
        },
        [authToken, generateSocket]
    );

    const handleConvoMessage = (message: IConversationUpdatePayload) => {
        console.log('[WebSocket] Handling convo message:', message);
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
        console.log('[WebSocket] lastMessage state updated');
    };

    const sendMessage = (message: IConversationUpdatePayload) => {
        console.log('[WebSocket] sendMessage called with:', message);
        console.log('[WebSocket] WebSocket state:', ws.current?.readyState, 'OPEN=', WebSocket.OPEN);
        
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify(message);
            console.log('[WebSocket] Sending payload:', payload);
            ws.current.send(payload);
            console.log('[WebSocket] Message sent successfully');
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

    useEffect(
        function setup() {
            if (currentUser && !ws.current && !notificationWs.current) {
                setTimeout(() => {
                    setupWebsocket('convo');
                    setupWebsocket('notifications');
                    handleVisibilityChange();
                }, 1500);
            }
        },
        [currentUser]
    );

    return (
        <WebSocketContext.Provider
            value={{ sendMessage, lastMessage, lastNotificationUpdate }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to access the WebSocket context
export const useWebSocketContext = () => useContext(WebSocketContext);
