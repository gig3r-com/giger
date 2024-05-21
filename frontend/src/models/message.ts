export interface IMessage {
    id: string;
    date: string; // Date timestamp
    sender: string; // user handle
    text: string;
}

export interface IWebsocketMessage {
    Id: string;
    Date: string;
    Sender: string;
    Text: string;
}

export interface IConversation {
    id: string;
    messages: IMessage[];
    participants: string[]; // user handles
    anonymizedUsers: string[]; // user handles
    /**
     * If this is set, only the participants in this list are allowed to send messages.
     * Used to send public information by game masters.
     */
    participantsAllowedToSendMsgs?: string[];
    gigConversation?: boolean;
}
