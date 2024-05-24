import { ITransaction } from "./banking";
import { IMessage, IWebsocketMessage } from "./message";

export enum SocketMessageType {
    HASH_UPDATE = 'HASH_UPDATE',
    NEW_MESSAGE = 'NEW_MESSAGE',
    NEW_GIG_MESSAGE = 'NEW_GIG_MESSAGE',
    GIG_STATUS_UPDATE = 'GIG_STATUS_UPDATE',
}

export interface IHashUpdatePayload {
    privateAccountHash: number;
    businessAccountHash: number;
    conversationHashes: Record<string, number>; //conversationId: hash
    gigConversationHashes: Record<string, number>; //gigId: hash
    gigStatusHashes: Record<string, number>; //gigId: hash
}

export interface INotificationPayload {
    AccountId: string;
    TransactionId: string;
    GigIdConversation: string;
    GigIdStatus: string;
    ConversationId: string;
    UpdateRequired: boolean;
}

/**
 * ! these two have to go, it's a dirty workaround for backend giving PascalCase instead of camelCase
 */
export interface IConversationUpdatePayload {
    ConversationId: string;
    IsGigConveration: boolean;
    Message: IWebsocketMessage;
}

export interface IConversationConsumablePayload {
    conversationId: string;
    isGigConversation: boolean;
    message: IMessage;
}

export interface INotificationConsumablePayload {
    accountId: string;
    transactionId: string;
    gigIdConversation: string;
    gigIdStatus: string;
    conversationId: string;
    updateRequired: boolean;
}

export interface ISocketMessage<T = IConversationUpdatePayload | ITransaction | IHashUpdatePayload> {
    type: SocketMessageType;
    payload: T;
} 

export interface ISocketHashUpdate extends ISocketMessage<IHashUpdatePayload> {
    type: SocketMessageType.HASH_UPDATE;
}

export interface ISocketNewChatMessage extends ISocketMessage<IConversationUpdatePayload> {
    type: SocketMessageType.NEW_MESSAGE;
}

export interface ISocketNewGigMessage extends ISocketMessage<IMessage> {
    type: SocketMessageType.NEW_GIG_MESSAGE;
}

// export interface ISocketGigStatusUpdate extends ISocketMessage<ITransaction>{
//     type: SocketMessageType.GIG_STATUS_UPDATE;
//     payload: ITransaction;
// }
