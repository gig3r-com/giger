import { IConversationConsumablePayload, IConversationUpdatePayload } from "../../models/websockets";

export interface IWebsocketContext {
    sendMessage: (message: IConversationUpdatePayload) => void;
    lastMessage: IConversationConsumablePayload | null

}
