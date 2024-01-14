export interface IMessage {
    id: string;
    date: string; // Date timestamp
    sender: string; // user id
    text: string;
    status?: IMessageStatus;
}

export interface IConversation {
    id: string;
    messages: IMessage[];
    participants: string[]; // user ids
    gigConversation?: boolean;
}

export enum IMessageStatus {
    SENT = 'sent',
    RECEIVED = 'received',
    READ = 'read',
    ERROR = 'error',
    AWAITING = 'awaiting'
}
