import * as Yup from 'yup';
import { message } from '@/configs/conversation';

const str = () => Yup.string().defined();
const bool = () => Yup.boolean().defined();

const messageSchema = Yup.object(({
    id: str().required(),
    timestamp: str().required(),
    sender: str().required(),
    type: str().required(),
    data: str().required(),
    readBy: Yup.array().of(Yup.string().oneOf(message.types)),
    hacker: str(),
    epsilonNote: str(),
}));

export const conversationSchema = Yup.object({
    id: str().required(),
    title: str(),
    participants: Yup.array().of(Yup.string()),
    anonymizedUsers: Yup.array().of(Yup.string()),
    gigConversation: bool(),
    messages: Yup.array().of(messageSchema),
    hackers: Yup.array().of(Yup.string()),

    // Form only
    epsilonMainParticipant: str(),
});
