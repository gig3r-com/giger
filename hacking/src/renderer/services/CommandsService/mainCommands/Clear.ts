import type CommandsServiceType from '../CommandsService';

export default class Clear {
  private readonly Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { setLines, fireInitError } = this.Service;
    if (!setLines) {
      fireInitError();
      return;
    }
    setLines([]);
  }
}
