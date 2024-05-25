import axios from 'axios';
import mapProfile from './mappers/profile';
import mapExploits from './mappers/exploits';
import { ProfileType, ProgramCodeInfoType, SubnetworkType } from '../../types';
import mapSubnetwork from './mappers/subnetwork';
import mapRecordToApi from './mappers/record';
import { getLoginUserData, setLoginUserData } from '../../Terminal/utils/store';
import ProfileModule from './modules/Profile';
import ScanModule from './modules/Scan';
import AccountsModule from './modules/Accounts';
import LogsModule from './modules/Log';
import HackConfigModule from './modules/HackConfig';
import ConversationsModule from './modules/Conversations';
import LoginModule from './modules/Login';
import GigsModule from './modules/Gigs';

export default class ApiService {
  constructor() {
    window.config = {
      // gigerApiUrl: 'http://localhost:9090/api',
      // gigerUrl: 'http://localhost:9090',
      // gigerApiUrl: 'http://192.168.50.100:9090/api',
      // gigerUrl: 'http://192.168.50.100:9090',
      gigerApiUrl: 'https://dev.gig3r.com/api',
      gigerUrl: 'https://dev.gig3r.com',
    };
    window.electron.ipcRenderer.on('config-app', (data) => {
      const config = {};
      data.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          config[key.trim()] = value.trim();
        }
      });
      if (config.API_URL) {
        window.config = {
          gigerApiUrl: `${config.API_URL}/api`,
          gigerUrl: config.API_URL,
        };
      }
    });
  }

  getUrls() {
    return {
      gigerApiUrl: window.config.gigerApiUrl,
      gigerUrl: window.config.gigerUrl,
    };
  }

  private isConfigLoaded: boolean = false;

  private authToken = null;

  profileModule = new ProfileModule();

  scanModule = new ScanModule();

  accountsModule = new AccountsModule();

  logsModule = new LogsModule();

  hackConfigModule = new HackConfigModule();

  conversationsModule = new ConversationsModule();

  loginModule = new LoginModule();

  gigsModule = new GigsModule();

  /*
   ************************************************************************************************
   * LOGIN METHODS
   ************************************************************************************************
   */

  login = this.loginModule.login.bind(this);

  /*
   ************************************************************************************************
   * GIG METHODS
   ************************************************************************************************
   */

  getGigById = this.gigsModule.getGigById.bind(this);

  getGigConversationById = this.gigsModule.getGigConversationById.bind(this);

  /*
   ************************************************************************************************
   * CONVERSATIONS METHODS
   ************************************************************************************************
   */

  getConversationById = this.conversationsModule.getConversationById.bind(this);

  sendMsg = this.conversationsModule.sendMsg.bind(this);

  createConversation = this.conversationsModule.createConversation.bind(this);

  sendMsgFromTerminal = this.conversationsModule.sendMsgFromTerminal.bind(this);

  /*
   ************************************************************************************************
   * HACK CONFIG METHODS
   ************************************************************************************************
   */

  getConfig = this.hackConfigModule.getConfig.bind(this);

  /*
   ************************************************************************************************
   * LOGS METHODS
   ************************************************************************************************
   */

  addLog = this.logsModule.addLog.bind(this);

  addBreachLog = this.logsModule.addBreachLog.bind(this);

  addDecryptLog = this.logsModule.addDecryptLog.bind(this);

  addHackLog = this.logsModule.addHackLog.bind(this);

  addICELog = this.logsModule.addICELog.bind(this);

  getSubnetworksLogs = this.logsModule.getSubnetworksLogs.bind(this);

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

  getSubnetworkByName(subnetworkName: string): Promise<SubnetworkType | any> {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/Networks/subnetwork/all`;
    return axios.get(url).then((response) => {
      const foundSubnetwork = response.data.find(
        (subnetwork: any) =>
          subnetwork.name.toLowerCase() === subnetworkName.toLowerCase(),
      );
      if (foundSubnetwork) return mapSubnetwork(foundSubnetwork);
      throw new Error(`Subnetwork with id ${subnetworkName} not found`);
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
    return axios.patch(url, record);
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

  createRandomString(length) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getMasterMinds(userId) {
    const { gigerApiUrl } = this.getUrls();
    const url = `${gigerApiUrl}/User/${userId}/mindHack/enabledUsers`;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  }

  async getProfileByHandle(handle) {
    const { data } = await this.scanForUserIdByUsername(handle);
    return this.getUserProfile(data.id);
  }

  async addMasterMind(userHandle, masterHandle) {
    const { gigerApiUrl } = this.getUrls();
    const subjectProfile = await this.getProfileByHandle(userHandle);
    const userId = subjectProfile.id;
    if (!subjectProfile) {
      throw new Error(
        `<span class="secondary-color">Error:</span> Can't find subject data`,
      );
    }
    if (subjectProfile.mindHack === 'BANNED') {
      throw new Error(
        `<span class="secondary-color">Error:</span> Cant mindhack this subject`,
      );
    }
    const data = await this.getMasterMinds(userId);
    data.push(masterHandle);
    const url = `${gigerApiUrl}/User/${userId}/mindHack/enabledUsers`;
    const url2 = `${gigerApiUrl}/User/${userId}/mindHack`;
    const response = await axios.put(url, data);
    await axios.patch(url2, 'ENABLED');
    return response.data;
  }
}
