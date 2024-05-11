import axios from 'axios';

export default class Log {
  async addLog(): Promise<> {
    const { gigerApiUrl } = this.getUrls();
    const logUrl = `${gigerApiUrl}/Log`;
    const logData = {
      // id: 'string',
      // timestamp: '2024-05-10T12:59:37.761Z',
      sourceUserId: 'string',
      sourceUserName: 'string',
      sourceHackerName: 'string',
      targetUserId: 'string',
      targetUserName: 'string',
      logType: 'MESSAGE',
      logData: 'string',
      subnetworkId: 'string',
      subnetworkName: 'string',
    };
    const respone = await axios.post(logUrl, logData);
    console.log({ respone });
  }
}
