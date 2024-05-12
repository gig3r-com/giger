import type CommandsServiceType from '../CommandsService';
import { getErrorMessage, notConnectedError } from '../responseLines/errors';
import { getLogsMessage } from '../responseLines/logs';

export default class End {
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
      setInputDisabled(true);
      const logs = await ApiService.getSubnetworksLogs(
        ServerConnectionService.connectedSubnetwork?.id,
      );
      console.log(logs);
      addLines(getLogsMessage(logs));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
