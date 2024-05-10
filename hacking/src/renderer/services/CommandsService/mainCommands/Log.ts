import type CommandsServiceType from '../CommandsService';
import { getDisconectMessage } from '../responseLines/misc';
import { notConnectedError } from '../responseLines/errors';

export default class End {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { addLines, fireInitError, ServerConnectionService } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    if (!ServerConnectionService.isConnected) {
      addLines(notConnectedError);
      return;
    }
    addLines(
      getDisconectMessage(
        ServerConnectionService.connectedSubnetwork?.name || '',
      ),
    );
    ServerConnectionService.disconnect();
  }
}
