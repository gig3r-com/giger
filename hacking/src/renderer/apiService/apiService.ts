import axios from 'axios';
import mapUser from './mappers/user';
import mapProfile from './mappers/profile';
import { UserType, ProfileType, NetworkType, SubnetworkType } from './types';
import * as EXPLOITS from '../Terminal/data/exploits';
import { getSavedSubnetworkData } from './utils';
import mapSubnetwork from './mappers/subnetwork';
import mapRecordToApi from './mappers/record';
import { getLoginUserData, setLoginUserData } from '../Terminal/utils/store';

class ApiService {
  constructor() {}

  getUrls() {
    return {
      gigerApiUrl: window.config.gigerApiUrl,
      gigerUrl: window.config.gigerUrl,
    };
  }

  /*
   ************************************************************************************************
   * ACTIVE USER PROFILE METHODS
   ************************************************************************************************
   */
  getActiveUserProfile(userId: string): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();

    return axios
      .get(`${gigerApiUrl}/User/private/byId?id=${userId}`)
      .then((response) => {
        return mapProfile(response.data);
      });
  }

  changeActiveUserHackingName(hackerName: string): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData();
    if (!loginUserData) throw new Error('No active login user');
    loginUserData.hackerName = hackerName;

    return axios
      .patch(
        `${gigerApiUrl}/User/${loginUserData.id}/hackerName?newName=${hackerName}`,
      )
      .then(() => {
        setLoginUserData(loginUserData);
        return mapProfile(loginUserData);
      });
  }

  getAvailablePrograms() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([EXPLOITS.Cybercracker, EXPLOITS.Sledgehammer]);
      }, 300);
    });
  }

  /*
   ************************************************************************************************
   * SCAN METHODS
   ************************************************************************************************
   */

  scan(id: string): Promise<{ type: string; data: string | object }> {
    return Promise.any([
      this.scanForSubnetworkById(id),
      this.scanForNetworkById(id),
      this.scanForUserIdByName(id),
      this.scanForUserById(id),
    ]);
  }

  scanForNetworkById(
    networkId: string,
  ): Promise<{ type: string; data: NetworkType }> {
    const { gigerUrl } = this.getUrls();
    const url = `${gigerUrl}/network?id=${networkId}`;
    return axios.get(url).then((response) => {
      if (response.data) return { type: 'network', data: response.data };
      throw new Error(`Network with id ${networkId} not found`);
    });
  }

  scanForSubnetworkById(
    subnetworkId: string,
  ): Promise<{ type: string; data: SubnetworkType }> {
    return this.getSubnetworkById(subnetworkId).then((subnetwork) => ({
      type: 'subnetwork',
      data: getSavedSubnetworkData(subnetwork),
    }));
  }

  scanForUserById(userId: string): Promise<{ type: string; data: UserType }> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/public/byId?id=${userId}`;
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

  /*
   ************************************************************************************************
   * Networks
   ************************************************************************************************
   */

  getSubnetworkById(subnetworkId: string): Promise<SubnetworkType | any> {
    const { gigerUrl } = this.getUrls();
    const url = `${gigerUrl}/subnetwork/all`;
    return axios.get(url).then((response) => {
      const foundSubnetwork = response.data.find(
        (subnetwork: any) =>
          subnetwork.id.toLowerCase() === subnetworkId.toLowerCase(),
      );
      if (foundSubnetwork) return mapSubnetwork(foundSubnetwork);
      throw new Error(`Subnetwork with id ${subnetworkId} not found`);
    });
  }

  /*
   ************************************************************************************************
   * Profile
   ************************************************************************************************
   */
  getUserProfile(userId: string): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/private/byId?id=${userId}`;
    return axios.get(url).then((response) => {
      return mapProfile(response.data);
    });
  }

  addRecordToLoginUser(record): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData();
    const url = `${gigerApiUrl}/User/${loginUserData.id}/privateRecord`;
    return axios.patch(url, mapRecordToApi(record, loginUserData.id)).then((response) => {
      console.log({response});
      return mapProfile(response.data);
    });
  }

  getCrawler() {}

  /*
   * Gigs
   */
  async getGigs(): void {
    const { gigerApiUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/Gig`,
    }).then((response) => {
      console.log(response);
    });
  }

  /*
   * Utils
   */
  async disableAuth(): void {
    const { gigerUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerUrl}/disableAuth`,
    }).then((response) => {
      console.log(response);
    });
  }
}

export default new ApiService();
