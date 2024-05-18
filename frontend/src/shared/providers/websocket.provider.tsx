import {
    createContext,
    useContext,
    useEffect,
    FC,
    useState,
    useRef
} from 'react';
import { IConversationConsumablePayload, IConversationUpdatePayload } from '../../models/websockets';
import { IWebsocketContext } from './websocket.model';

export const WebSocketContext = createContext<IWebsocketContext | null>(null);

export const WebSocketProvider: FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const ws = useRef<WebSocket | null>(null);
    const [lastMessage, setLastMessage] = useState<IConversationConsumablePayload | null>(null);
    const [authToken, setToken] = useState<string | null>(
        localStorage.getItem('authToken') ?? null
    );
    const [isConnected, setIsConnected] = useState(false);
    const baseUrl = `wss${window.origin.substr(5, window.origin.length)}/`;
    const endpointBase = import.meta.env.VITE_WEBSOCKET_ENDPOINT ?? baseUrl;

    useEffect(
        function setupWebsocket() {
            if (!authToken || ws.current) return;
            const socket = new WebSocket(
                `${endpointBase}/ws1337?AuthToken=${authToken}`
            );

            socket.binaryType = 'arraybuffer';

            socket.onopen = () => {
                setIsConnected(true);
                console.log('WebSocket connection opened');
            };

            socket.onclose = () => {
                setIsConnected(false);
                console.log('WebSocket disconnected');
            };

            socket.onerror = (error) => {
                console.error('WebSocket error', error);
            };

            socket.onmessage = (event) => {
                const message = JSON.parse(
                    event.data
                ) as IConversationUpdatePayload;
                console.log('WebSocket message received:', message);
                setLastMessage({
                    conversationId: message.ConversationId,
                    isGigConversation: !!message.IsGigConversation,
                    message: {
                        id: message.Message.Id,
                        date: message.Message.Date,
                        sender: message.Message.Sender,
                        text: message.Message.Text
                    }
                });
            };

            ws.current = socket;
        },
        [authToken, endpointBase, ws]
    );

    const setAuthToken = (token: string) => {
        setToken(token);
    };

    const sendMessage = (message: IConversationUpdatePayload) => {
        if (ws.current && isConnected) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return (
        <WebSocketContext.Provider
            value={{ sendMessage, setAuthToken, lastMessage }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to access the WebSocket context
export const useWebSocketContext = () => useContext(WebSocketContext);
