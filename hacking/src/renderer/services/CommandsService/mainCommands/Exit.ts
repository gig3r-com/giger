import type CommandsServiceType from '../CommandsService';

export default class Exit {
  private readonly Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { ServerConnectionService, mainCommandsTable } = this.Service;
    mainCommandsTable.logout.execute();
    ServerConnectionService.disconnect();
    window.close();
  }
}
