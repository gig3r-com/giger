import type CommandsServiceType from '../CommandsService';

export default class Logout {
  private readonly Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { logout, fireInitError, setLines } = this.Service;
    if (!logout || !setLines) {
      fireInitError();
      return;
    }

    setLines([]);
    logout();
  }
}
