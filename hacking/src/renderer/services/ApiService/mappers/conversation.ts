import moment from 'moment';
import {
  ConversationType,
  FullConversationType,
  MessageType,
} from '../../../types';

type MessageRawData = {
  id: string;
  date: string;
  sender: string;
  text: string;
  status: 'SENT' | 'RECEIVED' | 'READ' | 'ERROR' | 'AWAITING';
};

export default function mapConversation(data: {
  id: string;
  participants: string[];
}): ConversationType {
  return {
    id: data.id,
    participants: data.participants,
  };
}

export function mapFullConversation(data: {
  id: string;
  gigConversation: boolean;
  participants: string[];
  messages: MessageRawData[];
}): FullConversationType {
  return {
    id: data.id,
    isGigConversation: data.gigConversation,
    participants: data.participants,
    messages: data.messages.map(mapMessage),
  };
}

export function mapMessage(data: MessageRawData): MessageType {
  // eslint-disable-next-line no-empty-character-class
  const reg = /\[.+?\]/g;
  return {
    date: moment(data.date).format('DD/MM HH:mm:ss'),
    sender: data.sender,
    text: data.text.replace(reg, ''),
    status: data.status,
  };
}
