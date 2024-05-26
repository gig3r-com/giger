import {
  Clear,
  End,
  List,
  Scan,
  Name,
  Profile,
  Run,
  Logout,
  Doc,
  Install,
  CopyData,
  Balance,
  Transfer,
  Log,
  Exit,
  ReadMsg,
  SendMsg,
  Gig,
} from './mainCommands';
import {
  getErrorMessage,
  notConnectedError,
  noUserIdError,
  userNotFoundInSubnetworkError,
  wrongCommandError,
} from './responseLines/errors';
import type ApiServiceType from '../ApiService/ApiService';
import type ConfigServiceType from '../ConfigService/ConfigService';
import type MonitorServiceType from '../MonitorService/MonitorService';
import type ServerConnectionServiceType from '../ServerConnectionService/ServerConnectionService';
import type LineStateServiceType from '../LineStateService/LineStateService';
import { getLoginUserData } from '../../Terminal/utils/store';
import { ProfileType } from '../../types';

type InitType = {
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[]) => void;
  setLines: (lines: string[]) => void;
  setInputDisabled: (value: boolean) => void;
  logout: () => void;
  refreshPrefix: () => void;
  removeLastLine: () => void;
};

export type MainCommandsTableType = {
  [key: string]: { execute: () => void };
};

export type CommandsTableType = {
  [key: string]: () => void;
};

export default class CommandsService {
  public mainCommandsTable: MainCommandsTableType = {
    clear: new Clear(this),
    end: new End(this),
    list: new List(this),
    scan: new Scan(this),
    name: new Name(this),
    profile: new Profile(this),
    run: new Run(this),
    logout: new Logout(this),
    doc: new Doc(this),
    help: new Doc(this),
    info: new Doc(this),
    install: new Install(this),
    copydata: new CopyData(this),
    balance: new Balance(this),
    // transfer: new Transfer(this),
    log: new Log(this),
    exit: new Exit(this),
    readmsg: new ReadMsg(this),
    sendmsg: new SendMsg(this),
    gig: new Gig(this),
  };

  public activeCommand: string = '';

  public addLines: ((lines: string[]) => void) | undefined;

  public addErrors: ((lines: string[]) => void) | undefined;

  public setLines: ((lines: string[]) => void) | undefined;

  public parsedCommand: string[] = [];

  public parsedCommandRaw: string[] = [];

  public ConfigService: ConfigServiceType;

  public ApiService: ApiServiceType;

  public MonitorService: MonitorServiceType;

  public LineStateService: LineStateServiceType;

  public ServerConnectionService: ServerConnectionServiceType;

  public setInputDisabled: ((value: boolean) => void) | undefined;

  public logout: (() => void) | undefined;

  public refreshPrefix: (() => void) | undefined;

  public removeLastLine: (() => void) | undefined;

  // eslint-disable-next-line no-underscore-dangle
  public getProfile = this._getProfile.bind(this);

  // eslint-disable-next-line no-underscore-dangle
  public startProcess = this._startProcess.bind(this);

  // eslint-disable-next-line no-underscore-dangle
  public getDirectLine = this._getDirectLine.bind(this);

  constructor(
    ConfigService: ConfigServiceType,
    ApiService: ApiServiceType,
    MonitorService: MonitorServiceType,
    ServerConnectionService: ServerConnectionServiceType,
    LineStateService: LineStateServiceType,
  ) {
    this.ConfigService = ConfigService;
    this.ApiService = ApiService;
    this.MonitorService = MonitorService;
    this.ServerConnectionService = ServerConnectionService;
    this.LineStateService = LineStateService;
    this.mainCommandsTable.help = this.mainCommandsTable.doc;
  }

  init({
    addLines,
    addErrors,
    setLines,
    setInputDisabled,
    logout,
    refreshPrefix,
    removeLastLine,
  }: InitType) {
    this.addLines = addLines.bind(this);
    this.addErrors = addErrors.bind(this);
    this.setLines = setLines.bind(this);
    this.setInputDisabled = setInputDisabled.bind(this);
    this.logout = logout.bind(this);
    this.refreshPrefix = refreshPrefix.bind(this);
    this.removeLastLine = removeLastLine.bind(this);
  }

  executeCommand(command: string) {
    this.parsedCommandRaw = command
      .trim()
      .split(' ')
      .filter((s) => !!s);
    [this.activeCommand, ...this.parsedCommand] = command
      .trim()
      .toLowerCase()
      .split(' ')
      .filter((s) => !!s);

    if (this.mainCommandsTable[this.activeCommand]) {
      this.mainCommandsTable[this.activeCommand].execute();
    } else {
      if (!this.addLines) {
        this.fireInitError();
        return;
      }
      this.addLines(wrongCommandError);
    }
  }

  fireInitError() {
    console.error('Initialization error');
  }

  // eslint-disable-next-line no-underscore-dangle
  async _getProfile(id?: string): Promise<ProfileType | null> {
    const {
      setInputDisabled,
      parsedCommand,
      addLines,
      fireInitError,
      ServerConnectionService,
      ApiService,
    } = this;
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return null;
    }

    const profileId = id || parsedCommand[0];
    try {
      setInputDisabled(true);
      const { userId, isLoggedOnUser } = getUserId();
      const { isConnected, connectedSubnetwork } = ServerConnectionService;

      if (!userId) {
        addLines(noUserIdError);
        setInputDisabled(false);
        return null;
      }

      if (!isLoggedOnUser && !isConnected) {
        addLines(notConnectedError);
        setInputDisabled(false);
        return null;
      }

      const profile = await ApiService.getUserProfile(userId);

      if (!isLoggedOnUser && profile.subnetworkId !== connectedSubnetwork?.id) {
        addLines(userNotFoundInSubnetworkError);
        setInputDisabled(false);
        return null;
      }

      setInputDisabled(false);
      return profile;
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
      return null;
    }

    function getUserId(): { userId: string; isLoggedOnUser: boolean } {
      const loggedInUserId = getLoginUserData()?.id;
      const loggedInUserHandle = getLoginUserData()?.handle;
      if (
        loggedInUserId &&
        (profileId === '.' ||
          profileId === loggedInUserId ||
          profileId === loggedInUserHandle)
      ) {
        return {
          userId: loggedInUserId,
          isLoggedOnUser: true,
        };
      }
      return {
        userId: profileId,
        isLoggedOnUser: false,
      };
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  async _startProcess(
    initialMessage: string[],
    endMessage: string[],
    callback: (() => Promise<void>) | null,
    removeInitialMessage: boolean = false,
    processLength: number = 3000,
    errorMessage: string[],
  ): Promise<null> {
    if (!this.addLines || !this.setInputDisabled || !this.removeLastLine) {
      this.fireInitError();
      return null;
    }
    this.addLines(initialMessage);
    return new Promise((resolve) => {
      // @ts-ignore
      this.setInputDisabled(true);
      setTimeout(async () => {
        if (callback) {
          try {
            await callback();
          } catch (e) {
            // @ts-ignore
            this.setInputDisabled(false);
            // @ts-ignore
            if (removeInitialMessage) this.removeLastLine();
            // @ts-ignore
            this.addLines(errorMessage);
            return;
          }
        }
        // @ts-ignore
        this.setInputDisabled(false);
        // @ts-ignore
        if (removeInitialMessage) this.removeLastLine();
        // @ts-ignore
        this.addLines(endMessage);
        resolve(null);
      }, processLength);
    });
  }

  // eslint-disable-next-line no-underscore-dangle
  async _getDirectLine(message: string): Promise<string> {
    if (!this.addLines || !this.removeLastLine) {
      this.fireInitError();
      return '';
    }
    const inputValue = await this.LineStateService.getDirectLine(message);
    this.removeLastLine();
    this.addLines([
      `${message} <span class="secondary-color">${inputValue}</span>`,
    ]);
    return inputValue;
  }
}
