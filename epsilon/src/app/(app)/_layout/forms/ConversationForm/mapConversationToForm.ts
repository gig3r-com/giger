import { initialValues } from './initialValues';

export const mapConversationToForm = (data: Conversation) => {
    console.log({ data });
    return {
        ...initialValues,
        ...data,
        messages: data?.messages.map((message) => ({
            id: message.id,
            timestamp: message.date,
            sender: message.sender,
            type: 'TEXT',
            data: message.text,
            readBy: [],
            hacker: null,
            epsilonNote: null,
        })),
    };
}