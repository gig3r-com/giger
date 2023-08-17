import { IUser } from "./user";

export interface IMessage {
    id: string;
    date: string; // Date timestamp
    sender: IUser;
    text: string;
    status?: IMessageStatus;
}

export interface IConversation {
    id: string;
    messages: IMessage[];
    participants: IUser[];
    gigConversation?: boolean;
}

export enum IMessageStatus {
    SENT = 'sent',
    RECEIVED = 'received',
    READ = 'read',
    ERROR = 'error',
    AWAITING = 'awaiting'
}
