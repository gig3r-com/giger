import type CommandsServiceType from '../CommandsService';
import { getErrorMessage, notConnectedError } from '../responseLines/errors';
import { getLogsMessage } from '../responseLines/logs';
import { ConfigService, ServerConnectionService } from '../../index';
import { getLoginUserData } from '../../../Terminal/utils/store';

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
      parsedCommand,
    } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }

    try {
      await ConfigService.checkHacking('log');
      if (parsedCommand[0]) {
        // check if admin
        const subnetwork = await ApiService.getSubnetworkById(parsedCommand[0]);
        if (!subnetwork) {
          throw new Error(
            `<span class="secondary-color">Error:</span> Subnetwork not found`,
          );
        }
        const networkResponse = await ApiService.scanForNetworkById(
          subnetwork?.networkId,
        );
        if (!networkResponse?.data) {
          throw new Error(
            `<span class="secondary-color">Error:</span> Network not found`,
          );
        }
        if (networkResponse.data.adminId !== getLoginUserData().handle) {
          throw new Error(
            `<span class="secondary-color">Error:</span> You dont have Netops access to this subnetwork`,
          );
        }
        const logs = await ApiService.getSubnetworksLogs(parsedCommand[0]);
        addLines(getLogsMessage(logs));
        setInputDisabled(false);
        return;
      }

      if (!ServerConnectionService.isConnected) {
        addLines(notConnectedError);
        return;
      }
      ServerConnectionService.checkCommand('log');lo

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
