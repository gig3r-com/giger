import { Dispatch, SetStateAction } from 'react';
import { makeLoaderLine } from '../../Terminal/utils/timelines';
import {
  connectingFailedLines,
  connectingSuccessLines,
  decryptingSuccessLines,
  decryptingFailedLines,
} from '../../Terminal/responseLines/runCommands';
import { SubnetworkType, ProgramType } from '../../types';

export default class ServerConnectionService {
  private breachTimer: ReturnType<typeof setInterval> | undefined;

  private connectionTimer: ReturnType<typeof setInterval> | undefined;

  private decryptTimer: ReturnType<typeof setInterval> | undefined;

  private addLines: ((lines: string[]) => void) | undefined;

  private removeLastLine: (() => void) | undefined;

  private setInputTimer: ((currentTime: number) => void) | undefined;

  private setPrefixType: ((prefixType: string) => void) | undefined;

  private ConfigService: any;

  public isConnected: boolean = false;

  public isDecrypted: boolean = false;

  public connectionTimeLeft: number | null = null;

  public connectedSubnetwork: SubnetworkType | null = null;

  public connectedSubnetworkSystem: ProgramType | null = null;

  public targetingICEs: { target: number; ice: ProgramType }[] = [];

  private timeInSubnetwork: number | undefined;

  private ApiService: any;

  private setLines: Dispatch<SetStateAction<any[]>> | undefined;

  private setInputDisabled: Dispatch<SetStateAction<boolean>> | undefined;

  private MonitorService: any;

  constructor(ConfigService: any, ApiService: any, MonitorService: any) {
    this.ConfigService = ConfigService;
    this.ApiService = ApiService;
    this.MonitorService = MonitorService;
  }

  init(
    addLines: (lines: string[]) => void,
    removeLastLine: () => void,
    setPrefixType: (prefixType: string) => void,
    setInputTimer: Dispatch<SetStateAction<number | null>>,
    setLines: Dispatch<SetStateAction<any[]>>,
    setInputDisabled: Dispatch<SetStateAction<boolean>>,
  ) {
    this.addLines = addLines;
    this.removeLastLine = removeLastLine;
    this.setPrefixType = setPrefixType;
    this.setInputTimer = setInputTimer;
    this.setLines = setLines;
    this.setLines = setLines;
    this.setInputDisabled = setInputDisabled;
  }

  initializeError() {
    // eslint-disable-next-line no-console
    console.error('Initialize service first!');
  }

  // eslint-disable-next-line consistent-return
  breach(exploitName: string, subnetwork: SubnetworkType) {
    const exploit = this.ConfigService.getExploit(exploitName);
    if (!exploit) {
      return new Error('No such exploit');
    }

    const breachEffect = exploit.effect[subnetwork.firewall];
    let currentTime = breachEffect.breachTime;

    // LOG BREACH
    console.log('LOG');
    this.ApiService.addLog();

    // END LOG

    // eslint-disable-next-line consistent-return
    this.breachTimer = setInterval(() => {
      this.setInputDisabled(true);
      if (!this.removeLastLine || !this.addLines) return this.initializeError();
      if (currentTime !== breachEffect.breachTime) this.removeLastLine();
      this.addLines([makeLoaderLine(currentTime, breachEffect.breachTime)]);
      currentTime -= 1;
      if (currentTime <= 0) {
        this.removeLastLine();
        if (!breachEffect.isConnected) {
          this.addLines(connectingFailedLines);
        } else {
          this.addLines(connectingSuccessLines);
          this.connect(subnetwork, breachEffect.perfect);
        }
        this.setInputDisabled(false);
        clearInterval(this.breachTimer);
      }
    }, 100);
  }

  decrypt(exploitName: string, subnetwork: SubnetworkType) {
    const exploit = this.ConfigService.getExploit(exploitName);
    if (!exploit) {
      return new Error('No such exploit');
    }

    const decryptionEffect = {
      decryptionTime: 100,
      willDecryptionWork: true,
      perfect: true,
    };
    let currentTime = decryptionEffect.decryptionTime;

    this.decryptTimer = setInterval(() => {
      this.setInputDisabled(true);
      if (!this.removeLastLine || !this.addLines) return this.initializeError();
      if (currentTime !== decryptionEffect.decryptionTime)
        this.removeLastLine();
      this.addLines([
        makeLoaderLine(currentTime, decryptionEffect.decryptionTime),
      ]);
      currentTime -= 1;
      if (currentTime <= 0) {
        this.removeLastLine();
        if (!decryptionEffect.willDecryptionWork) {
          this.addLines(decryptingFailedLines);
        } else {
          this.addLines(decryptingSuccessLines);
          this.decryptionDone(subnetwork, decryptionEffect.perfect);
        }
        this.setInputDisabled(false);
        clearInterval(this.decryptTimer);
      }
    }, 100);
  }

  // eslint-disable-next-line consistent-return
  connect(subnetwork: SubnetworkType, isPerfect: boolean) {
    this.setupConnectedSubnetwork(subnetwork, isPerfect);

    // eslint-disable-next-line consistent-return
    this.connectionTimer = setInterval(() => {
      if (!this.setInputTimer) return this.initializeError();
      this.connectionTimeLeft -= 1;

      this.checkTargets();
      this.setInputTimer(this.connectionTimeLeft);
      if (this.connectionTimeLeft <= 0) {
        clearInterval(this.connectionTimer);
      }
    }, 100);
  }

  decryptionDone(subnetwork: SubnetworkType, isPerfect: boolean) {
    this.isDecrypted = true;
  }

  // eslint-disable-next-line consistent-return
  setupConnectedSubnetwork(subnetwork: SubnetworkType, isPerfect: boolean) {
    if (!this.setPrefixType) return this.initializeError();
    this.setPrefixType(subnetwork.name);

    this.isConnected = true;
    this.connectedSubnetwork = subnetwork;
    this.connectedSubnetworkSystem = this.ConfigService.getProgram(
      subnetwork.operatingSystem,
    );
    this.timeInSubnetwork =
      (isPerfect
        ? this.connectedSubnetworkSystem.timeOnPerfectBreach
        : this.connectedSubnetworkSystem.timeOnImperfectBreach) || 0;
    this.connectionTimeLeft = this.timeInSubnetwork;

    subnetwork.ice.forEach((iceName) => {
      const ice = this.ConfigService.getProgram(iceName);
      if (!ice) return;
      if (
        !isPerfect &&
        (ice.targetModel === 'initial' || ice.targetModel === 'active&initial')
      ) {
        this.activateICE(ice);
      } else if (
        ice.targetModel === 'active' ||
        ice.targetModel === 'active&initial'
      ) {
        this.targetICE(ice);
      }
    });
  }

  targetICE(ice: ProgramType): void {
    const targetingNumber = this.getTargetingNumber();
    const stepsPerPercent = Math.floor(this.timeInSubnetwork / 100);
    const stagesBreaks = {
      '1': stepsPerPercent * 95,
      '2': stepsPerPercent * 75,
      '3': stepsPerPercent * 50,
      '4': stepsPerPercent * 25,
      '5': stepsPerPercent * 10,
      '6': 0,
    };
    if (targetingNumber <= ice.stage1SuccessRate) {
      this.addTarget(this.timeInSubnetwork, stagesBreaks['1'], ice);
    } else if (targetingNumber <= ice.stage2SuccessRate) {
      this.addTarget(stagesBreaks['1'], stagesBreaks['2'], ice);
    } else if (targetingNumber <= ice.stage3SuccessRate) {
      this.addTarget(stagesBreaks['2'], stagesBreaks['3'], ice);
    } else if (targetingNumber <= ice.stage4SuccessRate) {
      this.addTarget(stagesBreaks['3'], stagesBreaks['4'], ice);
    } else if (targetingNumber <= ice.stage5SuccessRate) {
      this.addTarget(stagesBreaks['4'], stagesBreaks['5'], ice);
    } else if (targetingNumber <= ice.finalStageSuccessRate) {
      this.addTarget(stagesBreaks['5'], stagesBreaks['6'], ice);
    }
  }

  addTarget(stageStart: number, stageEnd: number, ice: ProgramType): void {
    const target =
      Math.floor(Math.random() * (stageStart - stageEnd + 1)) + stageEnd;
    this.targetingICEs.push({ target, ice });
  }

  checkTargets(): void {
    this.targetingICEs.forEach(({ target, ice }) => {
      const percent = this.getPercent(
        this.connectionTimeLeft - target,
        this.timeInSubnetwork - target,
      );
      this.MonitorService.setICEValue(ice.name, percent);
      if (this.connectionTimeLeft <= target) {
        this.activateICE(ice);
      }
    });
  }

  // eslint-disable-next-line consistent-return
  activateICE(ice: ProgramType) {
    if (!this.addLines) return this.initializeError();
    switch (ice.name) {
      case 'Ping': {
        this.ApiService.sendPingMsg();
        this.addLines([`ICE: ${ice.name}`]);
        break;
      }
      case 'Cleaner': {
        if (!this.setLines) return this.initializeError();
        this.setLines([]);
        this.addLines([`ICE: ${ice.name}`]);
        break;
      }
      case 'Boost': {
        if (!this.connectionTimeLeft)
          return console.error(
            `Connection time is: ${this.connectionTimeLeft}`,
          );
        if (!ice.boostValue)
          return console.error(`Wrong boost value: ${ice.boostValue}`);
        this.speedConnection(ice.boostValue);
        this.addLines([`ICE: ${ice.name}`]);
        break;
      }
      default: {
        this.addLines([`ICE: ${ice.name}`]);
        break;
      }
    }

    this.targetingICEs = this.targetingICEs.filter(
      (targetIce) => ice.name !== targetIce.ice.name,
    );
  }

  speedConnection(value: number) {
    const newValue = this.connectionTimeLeft - value;

    if (newValue <= 0) this.connectionTimeLeft = 1;
    else this.connectionTimeLeft = newValue;
  }

  // eslint-disable-next-line consistent-return
  disconnect() {
    if (!this.setPrefixType) return this.initializeError();
    this.setPrefixType('admin');

    this.isConnected = false;
    this.isDecrypted = false;
    this.connectedSubnetwork = null;
    this.connectedSubnetworkSystem = null;
    this.timeInSubnetwork = 0;
    this.connectionTimeLeft = null;
    this.targetingICEs = [];
    this.MonitorService.clearICE();
  }

  getTargetingNumber(): number {
    return Math.floor(Math.random() * 100 + 1);
  }

  getPercent(value1, value2): number {
    return (1 - value1 / value2) * 100;
  }
}
