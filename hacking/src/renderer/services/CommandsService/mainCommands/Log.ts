import type CommandsServiceType from '../CommandsService';
import { getErrorMessage, notConnectedError } from '../responseLines/errors';
import { getLogsMessage } from '../responseLines/logs';
import {ConfigService, ServerConnectionService} from "../../index";

export default class Log {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      addLines,
      fireInitError,
      ServerConnectionService,
      setInputDisabled,
      ApiService,
    } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    if (!ServerConnectionService.isConnected) {
      addLines(notConnectedError);
      return;
    }

    try {
      await ConfigService.checkHacking('log');
      ServerConnectionService.checkCommand('log');
      setInputDisabled(true);
      const logs = await ApiService.getSubnetworksLogs(
        ServerConnectionService.connectedSubnetwork?.id,
      );
      addLines(getLogsMessage(logs));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
