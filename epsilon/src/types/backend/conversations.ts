export type Message = {
    id: string;
    timestamp: string;
    sender: string; // user handle
    type: string;
    data: string;
    readBy: string[]; // user handles
    hacker?: string; // user handle
    epsilonNote?: string;
}

export type Conversation = {
    id: string;
    title?: string;
    participants: string[]; // user handles
    anonymizedUsers: string[]; // user handles
    gigConversation: boolean;
    messages: Message[];
    hackers: string[]; // user handles
}