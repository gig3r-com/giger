import axios from 'axios';

export default class HackConfig {
  async getConfig(type: 'main' | 'programs'): Promise<> {
    const { gigerApiUrl } = this.getUrls();
    const configUrl = `${gigerApiUrl}/HackConfig/get/${type}`;
    const respone = await axios.get(configUrl);
    return respone.data;
  }
}
