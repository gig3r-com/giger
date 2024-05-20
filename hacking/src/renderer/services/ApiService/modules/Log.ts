import axios from 'axios';
import { getLoginUserData } from '../../../Terminal/utils/store';
import mapLog from '../mappers/log';
import { ServerConnectionService } from '../../index';

export default class Log {
  async addBreachLog({ breachEffect, subnetwork }): Promise<void> {
    const data = {
      id: crypto.randomUUID(),
      targetUserId: '',
      targetUserName: '',
      logType: 'SUBNETWORK_SECURITY_BREACH',
      logData: JSON.stringify({
        breachEffect,
      }),
      subnetworkId: subnetwork.id,
      subnetworkName: subnetwork.name,
    };
    await this.addLog(data);
  }

  async addLog(logData = {}): Promise<void> {
    const loginUserData = getLoginUserData();
    const { connectedSubnetwork } = ServerConnectionService;
    const { gigerApiUrl } = this.getUrls();
    const logUrl = `${gigerApiUrl}/Log/hack`;
    const data = {
      id: crypto.randomUUID(),
      sourceUserId: loginUserData.id,
      sourceUserName: loginUserData.handle,
      sourceHackerName: loginUserData.hackerName,
      subnetworkId: connectedSubnetwork?.id,
      subnetworkName: connectedSubnetwork?.name,
      ...logData,
    };
    await axios.post(logUrl, data);
  }

  async getSubnetworksLogs(subnetworkId): Promise<> {
    const { gigerApiUrl } = this.getUrls();
    const logUrl = `${gigerApiUrl}/Log/${subnetworkId}/all`;
    const respone = await axios.get(logUrl);
    return respone.data.map(mapLog);
  }
}
