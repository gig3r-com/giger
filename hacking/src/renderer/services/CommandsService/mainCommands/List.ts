import type CommandsServiceType from '../CommandsService';
import type { CommandsTableType } from '../CommandsService';
import {
  getEncodedListCmdLines,
  getListCmdLines,
  getListProgramLines,
  noProgramsAvailable,
} from '../../../Terminal/responseLines/listCommands';
import {
  getErrorMessage,
  wrongListCommandError,
} from '../responseLines/errors';

export default class List {
  private Service: CommandsServiceType;

  private subcommandsTable: CommandsTableType = {
    cmd: this.listCommands,
    prog: this.listPrograms,
  };

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { addLines, fireInitError, parsedCommand } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    const [subCommand] = parsedCommand;

    if (this.subcommandsTable[subCommand]) {
      this.subcommandsTable[subCommand].bind(this)();
    } else {
      addLines(wrongListCommandError);
    }
  }

  listCommands() {
    if (!this.Service.ServerConnectionService.isConnected) {
      this.listDisconnectedCommands();
      return;
    }
    this.listConnectedCommands();
  }

  listDisconnectedCommands(): void {
    const { addLines, fireInitError } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    addLines(getListCmdLines());
  }

  listConnectedCommands(): void {
    const { ServerConnectionService, addLines, fireInitError } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    const system = ServerConnectionService.connectedSubnetworkSystem;
    if (!system || !system?.encryptedCommands) {
      console.error('PROBLEM');
      return;
    }
    addLines(getEncodedListCmdLines(system.encryptedCommands));
  }

  async listPrograms() {
    const { addLines, fireInitError, ApiService, setInputDisabled } =
      this.Service;
    if (!addLines || !setInputDisabled) {
      fireInitError();
      return;
    }

    try {
      setInputDisabled(true);
      const programs = await ApiService.getAvailablePrograms();
      if (programs.length) {
        addLines(getListProgramLines(programs));
      } else {
        addLines(noProgramsAvailable);
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
