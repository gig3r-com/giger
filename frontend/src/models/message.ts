export interface IMessage {
    id: string;
    date: Date;
    sender: string;
    text: string;
    status?: IMessageStatus;
}

export enum IMessageStatus {
    SENT = 'sent',
    RECEIVED = 'received',
    ERROR = 'error'
}
