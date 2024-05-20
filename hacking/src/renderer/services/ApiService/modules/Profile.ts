import axios from 'axios';
import {
  getLoginUserData,
  setLoginUserData,
} from '../../../Terminal/utils/store';
import { ProfileType, BankAccountType, ConversationType } from '../../../types';
import mapProfile from '../mappers/profile';
import mapAccount from '../mappers/account';
import mapGig from '../mappers/gig';
import mapConversation from '../mappers/conversation';

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

  async getUserProfile(userId: string): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const profileData = await getProfileData(userId);
    const handle: string = String(profileData.data.handle);
    let accounts, conversations, gigs;
    try {
      accounts = await getAccounts(handle);
    } catch (e) {
      console.error(e);
    }
    try {
      conversations = await getConversations(handle);
    } catch (e) {
      console.error(e);
    }
    try {
      // const gigs = await getGigs(userId);
    } catch (e) {
      console.error(e);
    }

    return mapProfile(profileData.data, accounts, conversations, gigs);

    async function getAccounts(userHandle: string): Promise<BankAccountType[]> {
      const accountsUrl = `${gigerApiUrl}/Account/byOwner?owner=${userHandle}`;
      const accountResponse = await axios.get(accountsUrl);
      return accountResponse.data.map(mapAccount);
    }

    async function getConversations(
      userHandle: string,
    ): Promise<ConversationType[]> {
      const conversationsUrl = `${gigerApiUrl}/Conversation/byParticipant?participant=${userHandle}`;
      const conversationsResponse = await axios.get(conversationsUrl);
      return conversationsResponse?.data?.map(mapConversation);
    }

    async function getGigs(): Promise<any[]> {
      const gigsUrl = `${gigerApiUrl}/Gig/get/all`;
      const gigsResponse = await axios.get(gigsUrl);
      return [
        mapGig(
          gigsResponse.data?.filter((gig: any) => gig.authorId === userId),
        ),
      ];
    }

    async function getProfileData(id: string) {
      try {
        return Promise.any([
          getUserProfileById(id),
          getUserProfileByHandle(id),
        ]);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    function getUserProfileById(getByIdId: string): Promise<ProfileType> {
      const urlById = `${gigerApiUrl}/User/private/byId?id=${getByIdId}`;
      return axios.get(urlById);
    }

    function getUserProfileByHandle(handle: string): Promise<ProfileType> {
      const url = `${gigerApiUrl}/User/private/byUsername?userName=${handle}`;
      return axios.get(url);
    }
  }

  async getUserProfileByHandle(handle: string): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/private/byUsername?userName=${handle}`;
    const profileResponse = await axios.get(url);
    return profileResponse.data;
  }
}
