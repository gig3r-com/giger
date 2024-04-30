import axios from 'axios';
import {
  getLoginUserData,
  setLoginUserData,
} from '../../../Terminal/utils/store';
import { ProfileType } from '../../../types';
import mapProfile from '../mappers/profile';

export default class Profile {
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

  resetExploits(userId: string, exploits: string[] = []) {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData() || {};
    const newLoginUserData = {
      ...loginUserData,
      exploits,
    };
    const url = `${gigerApiUrl}/User/${userId}/exploits`;
    return axios.patch(url, newLoginUserData.exploits).then(() => {
      if (loginUserData.id) {
        setLoginUserData(newLoginUserData);
      }
    });
  }

  resetHackingName(userId: string, hackerName: string) {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData() || {};
    const newLoginUserData = {
      ...loginUserData,
      hackerName,
    };
    const url = `${gigerApiUrl}/User/${userId}/hackerName?newName=${hackerName}`;
    return axios.patch(url, newLoginUserData.exploits).then(() => {
      if (loginUserData.id) {
        setLoginUserData(newLoginUserData);
      }
    });
  }
}
