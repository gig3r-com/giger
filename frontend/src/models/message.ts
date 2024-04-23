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
    /**
     * If this is set, only the participants in this list are allowed to send messages.
     * Used to send public information by game masters.
     */
    participantsAllowedToSendMsgs?: string[];
    gigConversation?: boolean;
}

export enum IMessageStatus {
    SENT = 'sent',
    RECEIVED = 'received',
    READ = 'read',
    ERROR = 'error',
    AWAITING = 'awaiting'
}
