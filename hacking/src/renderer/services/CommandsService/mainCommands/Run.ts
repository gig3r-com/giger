import type CommandsServiceType from '../CommandsService';
import { getConnectedSubnetworkData } from '../../../Terminal/utils/store';
import * as EXPLOITS from '../../../Terminal/data/exploits';
import { ExploitType } from '../../../Terminal/data/types';
import {
  getErrorMessage,
  programNotFound,
  subnetworkNotFound,
} from '../responseLines/errors';
import { connectingLines } from '../../../Terminal/responseLines/runCommands';

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
      setInputDisabled(true);
      const exploit: ExploitType | undefined = this.getExploit(
        parsedCommand[0],
      );
      if (!exploit) {
        addLines(programNotFound);
        setInputDisabled(false);
        return;
      }

      if (exploit.type === 'breacher') await this.runBreacher(exploit);
      if (exploit.type === 'decrypter') this.runMonitor();
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
      ApiService,
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

  getSubnetworkId(isConnected: boolean, commandStatement: string) {
    const connectedSubnetwork = getConnectedSubnetworkData();
    if (isConnected && commandStatement === '.' && connectedSubnetwork)
      return connectedSubnetwork?.id;
    return commandStatement;
  }

  getExploit(programName: string) {
    return Object.values(EXPLOITS).find(
      (p) => p.name.toLowerCase() === programName,
    );
  }
}
