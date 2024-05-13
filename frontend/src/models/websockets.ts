import { ITransaction } from "./banking";
import { IMessage } from "./message";

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

export interface ISocketMessage<T = IMessage | ITransaction | IHashUpdatePayload> {
    type: SocketMessageType;
    payload: T;
} 

export interface ISocketHashUpdate extends ISocketMessage<IHashUpdatePayload> {
    type: SocketMessageType.HASH_UPDATE;
    payload: IHashUpdatePayload
}

export interface ISocketNewChatMessage extends ISocketMessage<IMessage> {
    type: SocketMessageType.NEW_MESSAGE;
    payload: IMessage;
}

export interface ISocketNewGigMessage extends ISocketMessage<IMessage> {
    type: SocketMessageType.NEW_GIG_MESSAGE;
    payload: IMessage;
}

// export interface ISocketGigStatusUpdate extends ISocketMessage<ITransaction>{
//     type: SocketMessageType.GIG_STATUS_UPDATE;
//     payload: ITransaction;
// }
