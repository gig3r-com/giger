import axios from 'axios';
import mapGig from '../mappers/gig';
import { mapFullConversation } from '../mappers/conversation';

export default class Log {
  async getGigById(id: string): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Gig/get/${id}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error(
        `<span class="secondary-color">Error: </span>gig not found`,
      );
    }
    return mapGig(response.data);
  }

  async getGigConversationById(id: string): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Conversation/${id}`;
    const response = await axios.get(url);
    return mapFullConversation(response.data);
  }
}
