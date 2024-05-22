import { ExploitType, ProgramType } from '../../types';
import type ApiServiceType from '../ApiService/ApiService';

//  todo acces points
export default class ConfigService {
  private ApiService: ApiServiceType;

  private mainTimestamp;

  private main: {
    defencePrograms: number;
    exploits: number;
    testConfig: number;
  } = {};

  private exploits: {} = {};

  private defencePrograms: {} = {};

  private testConfig: {} = {};

  private commandsCheck = {
    scan: this.checkScan,
    run: this.checkScan,
    name: this.throwTestHackingError,
    transfer: this.throwTestHackingError,
    readmsg: this.throwTestHackingError,
    copydata: this.throwTestHackingError,
    sendmsg: this.throwTestHackingError,
  };

  constructor(ApiService: ApiServiceType) {
    this.ApiService = ApiService;
  }

  async init() {
    await this.loadMain();
  }

  async checkHacking(
    mainCommand: string,
    subCommand?: string | string[],
  ): Promise<void> {
    await this.loadMain();
    if (this.main.isTestHackingEnabled && this.commandsCheck[mainCommand]) {
      this.commandsCheck[mainCommand].bind(this)(subCommand);
    } else if (!this.main.isHackingEnabled) {
      throw new Error(
        `<span class="secondary-color">Error: </span>Hacking right now is disabled! If this error shows during the game contact you Assistant AI`,
      );
    }
  }

  throwTestHackingError() {
    throw new Error(
      `<span class="secondary-color">Error: </span>This command is outside the parameters of a test hacking`,
    );
  }

  async loadMain() {
    if (!this.mainTimestamp) {
      await this.fetchMain();
      return this.main;
    }

    const now = Date.now();
    if (this.mainTimestamp + Number(this.main.resetTimeInS * 1000) > now) {
      return this.main;
    }

    await this.fetchMain();
    return this.main;
  }

  async fetchMain() {
    try {
      const configResponse = await this.ApiService.getConfig('main');
      const newMain = JSON.parse(configResponse.config);
      const newConfig = { main: newMain };
      if (newMain.defencePrograms !== this.main.defencePrograms) {
        newConfig.defencePrograms = await this.loadDefencePrograms();
      }
      if (newMain.exploits !== this.main.exploits) {
        newConfig.exploits = await this.loadExploits();
      }
      if (newMain.testConfig !== this.main.testConfig) {
        newConfig.testConfig = await this.loadTestConfig();
      }
      this.main = newMain;
      this.mainTimestamp = Date.now();
      console.log('NEW MAIN LOADED', this.mainTimestamp, newConfig);
    } catch (e) {
      console.error(e);
    }
  }

  async loadDefencePrograms() {
    const configResponse = await this.ApiService.getConfig('defencePrograms');
    this.defencePrograms = JSON.parse(configResponse.config);
    return this.defencePrograms;
  }

  async loadTestConfig() {
    const configResponse = await this.ApiService.getConfig('testConfig');
    this.testConfig = JSON.parse(configResponse.config);
    return this.testConfig;
  }

  async loadExploits() {
    const configResponse = await this.ApiService.getConfig('exploits');
    this.exploits = JSON.parse(configResponse.config);
    return this.exploits;
  }

  async getExploit(exploitName: string): ExploitType | null {
    await this.loadMain();
    const exploit = this.exploits[exploitName.toUpperCase()];
    if (!exploit) return null;
    return exploit;
  }

  async getDefenceProgram(programName: string): ProgramType | null {
    await this.loadMain();
    const program = this.defencePrograms[programName];
    if (!program) return null;
    return program;
  }

  checkScan(subCommand: string) {
    if (subCommand.trim() === '.') {
      return;
    }
    const filtered = this.testConfig?.availableScans?.filter(
      (testScan: string) =>
        testScan.toLowerCase() === subCommand.toLowerCase().trim(),
    );
    if (!filtered.length) {
      this.throwTestHackingError();
    }
  }

  async getExploits() {
    await this.loadMain();
    return this.exploits;
  }
}
