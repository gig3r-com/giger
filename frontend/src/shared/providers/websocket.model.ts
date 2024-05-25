import { IConversationConsumablePayload, IConversationUpdatePayload, INotificationPayload } from "../../models/websockets";

export interface IWebsocketContext {
    sendMessage: (message: IConversationUpdatePayload) => void;
    lastMessage: IConversationConsumablePayload | null,
    lastNotificationUpdate: INotificationPayload | null
}
