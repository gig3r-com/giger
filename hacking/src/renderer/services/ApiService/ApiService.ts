import axios from 'axios';
import mapProfile from './mappers/profile';
import mapExploits from './mappers/exploits';
import { ProfileType, SubnetworkType, ProgramCodeInfoType } from '../../types';
import mapSubnetwork from './mappers/subnetwork';
import mapRecordToApi from './mappers/record';
import { getLoginUserData, setLoginUserData } from '../../Terminal/utils/store';
import ProfileModule from './modules/Profile';
import ScanModule from './modules/Scan';
import AccountsModule from './modules/Accounts';
import LogsModule from './modules/Log';

export default class ApiService {
  profileModule = new ProfileModule();

  scanModule = new ScanModule();

  accountsModule = new AccountsModule();

  logsModule = new LogsModule();

  /*
   ************************************************************************************************
   * LOGS METHODS
   ************************************************************************************************
   */

  addLog = this.logsModule.addLog.bind(this);

  /*
   ************************************************************************************************
   * ACCOUNTS METHODS
   ************************************************************************************************
   */

  getAccountByNumber = this.accountsModule.getAccountByNumber.bind(this);

  sendTransaction = this.accountsModule.sendTransaction.bind(this);

  /*
   ************************************************************************************************
   * PROFILE METHODS
   ************************************************************************************************
   */
  resetExploits = this.profileModule.resetExploits.bind(this);

  resetHackingName = this.profileModule.resetHackingName.bind(this);

  changeActiveUserHackingName =
    this.profileModule.changeActiveUserHackingName.bind(this);

  getUserProfile = this.profileModule.getUserProfile.bind(this);

  /*
   ************************************************************************************************
   * SCAN METHODS
   ************************************************************************************************
   */
  scan = this.scanModule.scan.bind(this);

  scanForNetworkById = this.scanModule.scanForNetworkById.bind(this);

  scanForSubnetworkById = this.scanModule.scanForSubnetworkById.bind(this);

  scanForUserById = this.scanModule.scanForUserById.bind(this);

  scanForUserIdByName = this.scanModule.scanForUserIdByName.bind(this);

  scanForUserIdByUsername = this.scanModule.scanForUserIdByUsername.bind(this);

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
  async getActiveUserProfile(
    userName: string,
    password: string,
  ): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Login/giger?userName=${userName}&password=${password}`;
    const loginResponse = await axios.get(url);
    const authToken = loginResponse.data;
    const userUrl = `${gigerApiUrl}/User/public/byUsername?userName=${userName}`;
    const publicUserDataResponse = await axios.get(userUrl);
    const userId = publicUserDataResponse.data.id;
    const profileUrl = `${gigerApiUrl}/User/private/byId?id=${userId}`;

    return axios.get(profileUrl).then((response) => {
      return mapProfile(response.data);
    });
  }

  getAvailablePrograms() {
    const { gigerApiUrl } = this.getUrls();
    const userId = getLoginUserData()?.id;
    const url = `${gigerApiUrl}/User/private/byId?id=${userId}`;
    return axios
      .get(url)
      .then((response) => {
        return mapExploits(response?.data?.exploits);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /*
   ************************************************************************************************
   * Networks
   ************************************************************************************************
   */

  getSubnetworkById(subnetworkId: string): Promise<SubnetworkType | any> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Networks/subnetwork/all`;
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

  addRecordToLoginUser(record): Promise<ProfileType> {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData();
    const url = `${gigerApiUrl}/User/${loginUserData.id}/privateRecords`;
    return axios
      .patch(url, mapRecordToApi(record, loginUserData.id))
      .then((response) => {
        console.log({ response });
        return mapProfile(response.data);
      });
  }

  addExploitToProfile(exploitName: string) {
    const { gigerApiUrl } = this.getUrls();
    const loginUserData = getLoginUserData();
    const newLoginUserData = {
      ...loginUserData,
      exploits: [...loginUserData.exploits, exploitName],
    };
    const url = `${gigerApiUrl}/User/${loginUserData.id}/exploits`;
    return axios.patch(url, newLoginUserData.exploits).then(() => {
      setLoginUserData(newLoginUserData);
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
   * Authentication
   */
  async disableAuth(): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/Login/disableAuth`,
    }).then((response) => {
      console.log(response);
    });
  }

  async login(username: string, password: string): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/Login/hacker?userName=${username}&password=${password}`,
    }).then((response) => {
      console.log(response);
    });
  }

  async logout(): Promise<void> {
    const { gigerApiUrl } = this.getUrls();
    return axios({
      method: 'GET',
      url: `${gigerApiUrl}/Login/logout`,
    }).then((response) => {
      console.log(response);
    });
  }

  /*
   * ICE Methods
   */
  async sendPingMsg(): Promise<void> {
    console.log('PING!');
  }

  /*
   * Program Codes
   */
  async getProgramCodeInfo(programCode: string): Promise<ProgramCodeInfoType> {
    return { isUsed: false };
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/ProgramCodes/get/isUsed?programCode=${programCode}`;
    return axios.get(url).then((response) => {
      console.log(response);
      return response.data;
    });
  }

  async useProgramCode(
    programCodeInfo: ProgramCodeInfoType,
  ): Promise<ProgramCodeInfoType> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/ProgramCodes/update`;
    return axios.post(url, programCodeInfo).then((response) => {
      console.log(response);
      return response.data;
    });
  }
}
