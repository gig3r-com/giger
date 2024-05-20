import axios from 'axios';
import { FullConversationType } from '../../../types';
import { mapFullConversation } from '../mappers/conversation';

export default class Conversations {
  async getConversationById(id: string): Promise<FullConversationType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Conversation/${id}`;
    const conversationResponse = await axios.get(url);
    return mapFullConversation(conversationResponse.data);
  }

  async sendMsg(): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Conversation/${id}`;
    const conversationResponse = await axios.get(url);
    return mapFullConversation(conversationResponse.data);
  }
}
