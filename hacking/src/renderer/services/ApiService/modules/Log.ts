import axios from 'axios';
import { getLoginUserData } from '../../../Terminal/utils/store';
import mapLog from '../mappers/log';
import { ServerConnectionService } from '../../index';

export default class Log {
  async addICELog({ ice }): Promise<void> {
    await this.addHackLog({
      logType: 'FIRED_ICE',
      isRevealed: true,
      additionalData: `${ice.name} fired`,
    });
  }

  async addDecryptLog({ decryptionEffect }): Promise<void> {
    await this.addHackLog({
      logType: 'SUBNETWORK_SECURITY_BREACH',
      isRevealed: decryptionEffect.perfect,
    });
  }

  async addBreachLog({ breachEffect, subnetwork }): Promise<void> {
    await this.addHackLog({
      logType: 'SUBNETWORK_SECURITY_BREACH',
      isRevealed: breachEffect.perfect,
      // targetUserId: subnetwork.id,
      // targetUserName: subnetwork.name,
      subnetworkId: subnetwork.id,
      subnetworkName: subnetwork.name,
    });
  }

  async addHackLog(logData = {}): Promise<void> {
    const loginUserData = getLoginUserData();
    const {
      logType = 'SUBNETWORK_HACKED',
      isRevealed = false,
      targetUserId = null,
      targetUserName = null,
      subnetworkId = null,
      subnetworkName = null,
      additionalData = null,
    } = logData;
    const data = {
      logType,
      logData: JSON.stringify({
        scannerLvl: getScannerLvl(),
        isRevealed,
        additionalData,
      }),
    };
    if (targetUserId) data.targetUserId = targetUserId;
    if (targetUserName) data.targetUserName = targetUserName;
    if (subnetworkId) data.subnetworkId = subnetworkId;
    if (subnetworkName) data.subnetworkName = subnetworkName;
    await this.addLog(data);

    function getScannerLvl() {
      if (loginUserData.exploits.includes('SCANNER3')) return 3;
      if (loginUserData.exploits.includes('SCANNER2')) return 2;
      if (loginUserData.exploits.includes('SCANNER1')) return 1;
      return 0;
    }
  }

  async addLog(logData = {}): Promise<void> {
    const loginUserData = getLoginUserData();
    const { connectedSubnetwork } = ServerConnectionService;
    const { gigerApiUrl } = this.getUrls();
    const logUrl = `${gigerApiUrl}/Log/hack`;
    const data = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
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
