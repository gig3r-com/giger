import type CommandsServiceType from '../CommandsService';
import { getConnectedSubnetworkData } from '../../../Terminal/utils/store';
import * as EXPLOITS from '../../../Terminal/data/exploits';
import { ExploitType } from '../../../Terminal/data/types';
import { ApiService, ConfigService } from '../../index';
import {
  getErrorMessage,
  programNotFound,
  subnetworkNotFound,
} from '../responseLines/errors';
import {
  connectingLines,
  decryptingLines,
} from '../../../Terminal/responseLines/runCommands';

export default class Run {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      setInputDisabled,
      addLines,
      fireInitError,
      parsedCommand,
      MonitorService,
    } = this.Service;
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return;
    }
    try {
      await ConfigService.checkHacking('run', parsedCommand[1]);
      setInputDisabled(true);
      const exploit: ExploitType | undefined = await ConfigService.getExploit(
        parsedCommand[0],
      );
      if (!exploit) {
        addLines(programNotFound);
        setInputDisabled(false);
        return;
      }

      if (exploit.type === 'breacher') await this.runBreacher(exploit);
      if (exploit.type === 'decrypter') await this.runDecrypter(exploit);
      if (exploit.type === 'monitor') MonitorService.enableMonitor();

      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }

  runMonitor() {
    console.log('MONITOR ON');
  }

  async runBreacher(exploit: ExploitType) {
    const {
      addErrors,
      addLines,
      fireInitError,
      parsedCommand,
      ServerConnectionService,
    } = this.Service;
    if (!addLines || !addErrors) {
      fireInitError();
      return;
    }
    const subnetworkId = this.getSubnetworkId(
      ServerConnectionService.isConnected,
      parsedCommand[1],
    );
    const subnetwork = await ApiService.getSubnetworkById(subnetworkId);
    if (!subnetwork) {
      addErrors(subnetworkNotFound);
      return;
    }
    if (ServerConnectionService.isConnected)
      throw new Error(
        'Cannot connect while still connected to a subnetwork. Use END command to disconnect.',
      );
    addLines(connectingLines(subnetwork.name));
    ServerConnectionService.breach(exploit.name, subnetwork);
  }

  async runDecrypter(exploit: ExploitType) {
    const {
      addErrors,
      addLines,
      fireInitError,
      parsedCommand,
      ServerConnectionService,
    } = this.Service;
    if (!addLines || !addErrors) {
      fireInitError();
      return;
    }
    const subnetworkId = this.getSubnetworkId(
      ServerConnectionService.isConnected,
      parsedCommand[1],
    );
    const subnetwork = await ApiService.getSubnetworkById(subnetworkId);
    if (!subnetwork) {
      addErrors(subnetworkNotFound);
      return;
    }
    if (!ServerConnectionService.isConnected)
      throw new Error(
        'Cannot decrypt while still not  connected to any subnetwork.',
      );
    addLines(decryptingLines(subnetwork.name));
    ServerConnectionService.decrypt(exploit.name, subnetwork);
  }

  getSubnetworkId(isConnected: boolean, commandStatement: string) {
    const connectedSubnetwork = getConnectedSubnetworkData();
    if (isConnected && commandStatement === '.' && connectedSubnetwork)
      return connectedSubnetwork?.id;
    return commandStatement;
  }
}
