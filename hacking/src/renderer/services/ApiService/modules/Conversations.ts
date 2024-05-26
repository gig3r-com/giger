import axios from 'axios';
import moment from 'moment';
import { FullConversationType, ProfileType } from '../../../types';
import { mapFullConversation } from '../mappers/conversation';

export default class Conversations {
  async getConversationById(id: string): Promise<FullConversationType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Conversation/${id}`;
    const conversationResponse = await axios.get(url);
    return mapFullConversation(conversationResponse.data);
  }

  async sendMsg(id: string, messageData): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Conversation/${id}/message`;
    const data = {
      id: crypto.randomUUID(),
      date: moment().add(100, 'y').toISOString(),
      sender: messageData.from,
      text: messageData.text,
    };
    await axios.post(url, data);
  }

  async createConversation(messageData): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Conversation/create`;
    const data = {
      id: crypto.randomUUID(),
      messages: [
        {
          id: crypto.randomUUID(),
          date: new Date(),
          sender: messageData.from,
          text: messageData.text,
        },
      ],
      participants: [messageData.from, messageData.to],
      anonymizedUsers: [],
      gigConversation: false,
    };
    await axios.post(url, data);
  }

  async sendMsgFromTerminal(
    sender: ProfileType,
    receiver: ProfileType,
    messageData,
  ) {
    const availableConversations = sender.conversations.filter(
      (conversation) =>
        conversation.participants.length === 2 &&
        conversation.participants.includes(receiver.handle) &&
        conversation.participants.includes(sender.handle),
    );
    if (availableConversations.length > 0) {
      const conversationId = availableConversations[0].id;
      await this.sendMsg(conversationId, messageData);
    } else {
      await this.createConversation(messageData);
    }
  }
}
