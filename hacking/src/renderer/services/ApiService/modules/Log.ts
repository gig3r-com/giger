import axios from 'axios';
import {getLoginUserData} from "../../../Terminal/utils/store";
import mapLog from "../mappers/log";

export default class Log {
  async addLog({ type, breachEffect, subnetwork }): Promise<> {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData();
    const logUrl = `${gigerApiUrl}/Log/hack`;
    const logData = {
      id: crypto.randomUUID(),
      sourceUserId: loginUserData.id,
      sourceUserName: loginUserData.handle,
      sourceHackerName: loginUserData.hackerName,
      targetUserId: '',
      targetUserName: '',
      logType: 'SUBNETWORK_SECURITY_BREACH',
      logData: 'Breach',
      subnetworkId: subnetwork.id,
      subnetworkName: subnetwork.name,
    };
    const respone = await axios.post(logUrl, logData);
    return respone.data;
  }

  async getSubnetworksLogs(subnetworkId): Promise<> {
    const { gigerApiUrl } = this.getUrls();
    const logUrl = `${gigerApiUrl}/Log/${subnetworkId}/all`;
    const respone = await axios.get(logUrl);
    return respone.data.map(mapLog);
  }
}
