import axios from 'axios';
import { NetworkType, SubnetworkType, UserType } from '../../../types';
import { ScanType } from '../../CommandsService/mainCommands/Scan';
import { getSavedSubnetworkData } from '../utils';
import mapUser from '../mappers/user';

export default class Scan {
  scan(id: string, scannerVersion: 1 | 2 | 3): Promise<ScanType> {
    try {
      return Promise.any([
        this.scanForSubnetworkById(id, scannerVersion),
        this.scanForNetworkById(id),
        this.scanForUserIdByName(id),
        this.scanForUserById(id),
        this.scanForUserIdByUsername(id),
      ]);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  scanForNetworkById(
    networkId: string,
  ): Promise<{ type: string; data: NetworkType }> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Networks/network/?id=${networkId}`;
    return axios.get(url).then((response) => {
      if (response.data) return { type: 'network', data: response.data };
      throw new Error(`Network with id ${networkId} not found`);
    });
  }

  scanForSubnetworkById(
    subnetworkId: string,
    scannerVersion: 1 | 2 | 3,
  ): Promise<{ type: string; data: SubnetworkType }> {
    return this.getSubnetworkById(subnetworkId).then((subnetwork) => ({
      type: 'subnetwork',
      data: subnetwork,
    }));
  }

  scanForUserById(userId: string): Promise<{ type: string; data: UserType }> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/public/byId?id=${userId}`;
    return axios.get(url).then((response) => {
      return { type: 'user', data: mapUser(response.data) };
    });
  }

  scanForUserIdByUsername(username: string): Promise<{ type: string; data: UserType }> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/simple/byUsername?username=${username}`;
    return axios.get(url).then((response) => {
      return { type: 'user', data: mapUser(response.data) };
    });
  }

  scanForUserIdByName(name: string): Promise<{ type: string; data: string }> {
    const { gigerApiUrl } = this.getUrls();
    const names = name.split(' ');
    const url = `${gigerApiUrl}/User/public/byName?firstName=${names[0]}&surname=${names[1]}`;
    return axios.get(url).then((response) => {
      return { type: 'userId', data: response.data.id };
    });
  }
}
