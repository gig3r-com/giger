import axios from 'axios';
import mapProfile from '../mappers/profile';
import { ProfileType } from '../../../types';

export default class Login {
  async login(username: string, password: string): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Login/hacker?hackerName=${username}&password=${password}`;
    const loginResponse = await axios.get(url);
    this.authToken = loginResponse.data;
    axios.defaults.headers.common.AuthToken = this.authToken;
    const userUrl = `${gigerApiUrl}/User/public/byUsername?userName=${username}`;
    const publicUserDataResponse = await axios.get(userUrl);
    const userId = publicUserDataResponse.data.id;
    const profileUrl = `${gigerApiUrl}/User/private/byId?id=${userId}`;
    const profileResponse = await axios.get(profileUrl);
    return mapProfile(profileResponse.data);
  }

  async logout(): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/Login/logout`,
    }).then((response) => {
      const authToken = response.data;
      console.log({ authToken });
    });
  }
}
