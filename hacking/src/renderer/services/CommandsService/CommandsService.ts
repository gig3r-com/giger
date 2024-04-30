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
} from './mainCommands';
import { wrongCommandError } from './responseLines/errors';
import type ApiServiceType from '../ApiService/ApiService';
import type ConfigServiceType from '../ConfigService/ConfigService';
import type MonitorServiceType from '../MonitorService/MonitorService';
import type ServerConnectionServiceType from '../ServerConnectionService/ServerConnectionService';

type InitType = {
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[]) => void;
  setLines: (lines: string[]) => void;
  setInputDisabled: (value: boolean) => void;
  logout: () => void;
  refreshPrefix: () => void;
};

export type MainCommandsTableType = {
  [key: string]: { execute: () => void };
};

export type CommandsTableType = {
  [key: string]: () => void;
};

export default class CommandsService {
  private mainCommandsTable: MainCommandsTableType = {
    clear: new Clear(this),
    end: new End(this),
    list: new List(this),
    scan: new Scan(this),
    name: new Name(this),
    profile: new Profile(this),
    run: new Run(this),
    logout: new Logout(this),
    doc: new Doc(this),
    install: new Install(this),
    copydata: new CopyData(this),
  };

  public activeCommand: string = '';

  public addLines: ((lines: string[]) => void) | undefined;

  public addErrors: ((lines: string[]) => void) | undefined;

  public setLines: ((lines: string[]) => void) | undefined;

  public parsedCommand: string[] = [];

  public ConfigService: ConfigServiceType;

  public ApiService: ApiServiceType;

  public MonitorService: MonitorServiceType;

  public ServerConnectionService: ServerConnectionServiceType;

  public setInputDisabled: ((value: boolean) => void) | undefined;

  public logout: (() => void) | undefined;

  public refreshPrefix: (() => void) | undefined;

  constructor(
    ConfigService: ConfigServiceType,
    ApiService: ApiServiceType,
    MonitorService: MonitorServiceType,
    ServerConnectionService: ServerConnectionServiceType,
  ) {
    this.ConfigService = ConfigService;
    this.ApiService = ApiService;
    this.MonitorService = MonitorService;
    this.ServerConnectionService = ServerConnectionService;
  }

  init({
    addLines,
    addErrors,
    setLines,
    setInputDisabled,
    logout,
    refreshPrefix,
  }: InitType) {
    this.addLines = addLines;
    this.addErrors = addErrors;
    this.setLines = setLines;
    this.setInputDisabled = setInputDisabled;
    this.logout = logout;
    this.refreshPrefix = refreshPrefix;
  }

  executeCommand(command: string) {
    [this.activeCommand, ...this.parsedCommand] = command
      .toLowerCase()
      .split(' ');

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
}
