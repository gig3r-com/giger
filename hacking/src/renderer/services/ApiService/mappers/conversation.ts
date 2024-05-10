import { ConversationType } from '../../../types';

export default function mapConversation(data: {
  id: string;
  gigConversation: boolean;
  participants: string[];
}): ConversationType {
  return {
    id: data.id,
    isGigConversation: data.gigConversation,
    participants: data.participants,
  };
}
