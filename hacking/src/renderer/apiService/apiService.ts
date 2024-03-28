import axios from 'axios';
import { AVAILABLE_PROGRAMS, SUBNETWORKS, USERS } from './mockData';
import { gigerApiUrl } from './constants';
import {subnetworkNotFound} from "../Terminal/responseLines/errors";

class ApiService {
  constructor() {}

  getAvailablePrograms() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(AVAILABLE_PROGRAMS);
      }, 300);
    });
  }

  getUserIdByName(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = USERS.find(
          (user) => user.username.toLowerCase() === name.toLowerCase(),
        );
        if (!user) reject('User not found');
        else resolve(user.id);
      }, 3000);
    });
  }

  getSubnetworkByName(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const subnetwork = SUBNETWORKS.find(
          (subnetwork) => subnetwork.name.toLowerCase() === name.toLowerCase(),
        );
        if (!subnetwork) reject(subnetworkNotFound);
        else resolve(subnetwork);
      }, 300);
    });
  }

  getUserById(userId: string): Promise<string> {

    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/User/public/byId?id=${userId}`,
    }).then((response) => {
      console.log(response);
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = USERS.find(
          (user) => user.id.toLowerCase() === userId.toLowerCase(),
        );
        if (!user) reject('User not found');
        else resolve(user);
      }, 300);
    });
  }

  getCrawler() {}

  /*
   * Gigs
   */
  async getGigs(): void {
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
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/disableAuth`,
    }).then((response) => {
      console.log(response);
    });
  }
}

export default new ApiService();
