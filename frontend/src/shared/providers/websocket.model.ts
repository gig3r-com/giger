import { IConversationConsumablePayload, IConversationUpdatePayload } from "../../models/websockets";

export interface IWebsocketContext {
    sendMessage: (message: IConversationUpdatePayload) => void;
    setAuthToken: (authToken: string) => void;
    lastMessage: IConversationConsumablePayload | null

}
