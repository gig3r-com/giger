import axios from 'axios';
import { AVAILABLE_PROGRAMS } from './mockData';
import mapUser from './mappers/user';
import mapProfile from './mappers/profile';
import { UserType, ProfileType, NetworkType, SubnetworkType } from './types';
import { getSubnetworkData } from './utils';

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
  getActiveUserProfile(userId: string): Promise<string> {
    const { gigerApiUrl } = this.getUrls();
    return axios
      .get(`${gigerApiUrl}/User/private/byId?id=${userId}`)
      .then((response) => {
        localStorage.setItem(
          'activeUserProfileRaw',
          JSON.stringify(response.data),
        );
        return mapProfile(response.data);
      });
  }

  changeActiveUserHackingName(hackingName: string): Promise<string> {
    const { gigerApiUrl } = this.getUrls();
    const profileRawData = JSON.parse(
      localStorage.getItem('activeUserProfileRaw'),
    );
    profileRawData.hackerName = hackingName;
    return axios
      .put(`${gigerApiUrl}/User/byId?id=${profileRawData.id}`, profileRawData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(
          'activeUserProfileRaw',
          JSON.stringify(response.data),
        );
        return mapProfile(response.data);
      });
  }

  getAvailablePrograms() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(AVAILABLE_PROGRAMS);
      }, 300);
    });
  }

  /*
   ************************************************************************************************
   * SCAN METHODS
   ************************************************************************************************
   */

  getNetworkById(
    networkId: string,
  ): Promise<{ type: string; data: NetworkType }> {
    const { gigerUrl } = this.getUrls();
    const url = `${gigerUrl}/all`;
    return axios.get(url).then((response) => {
      const foundNetwork = response.data.find(
        (network: any) => network.id === networkId,
      );
      if (foundNetwork) return { type: 'network', data: foundNetwork };
      throw new Error(`Network with id ${networkId} not found`);
    });
  }

  getSubnetworkById(
    networkId: string,
  ): Promise<{ type: string; data: SubnetworkType }> {
    const { gigerUrl } = this.getUrls();
    const url = `${gigerUrl}/subnetwork/all`;
    return axios.get(url).then((response) => {
      const foundSubnetwork = response.data.find(
        (subnetwork: any) => subnetwork.id === networkId,
      );
      if (foundSubnetwork)
        return { type: 'subnetwork', data: getSubnetworkData(foundSubnetwork) };
      throw new Error(`Subnetwork with id ${networkId} not found`);
    });
  }

  getUserById(userId: string): Promise<{ type: string; data: UserType }> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/public/byId?id=${userId}`;
    return axios.get(url).then((response) => {
      return { type: 'user', data: mapUser(response.data) };
    });
  }

  getUserIdByName(name: string): Promise<{ type: string; data: string }> {
    const { gigerApiUrl } = this.getUrls();
    const names = name.split(' ');
    const url = `${gigerApiUrl}/User/public/byName?firstName=${names[0]}&surname=${names[1]}`;
    return axios.get(url).then((response) => {
      return { type: 'user', data: response.data.id };
    });
  }

  /*
   ************************************************************************************************
   * TODO
   ************************************************************************************************
   */

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
    const { gigerApiUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/disableAuth`,
    }).then((response) => {
      console.log(response);
    });
  }
}

export default new ApiService();
