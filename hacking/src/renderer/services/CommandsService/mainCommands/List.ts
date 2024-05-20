import type CommandsServiceType from '../CommandsService';
import type { CommandsTableType } from '../CommandsService';
import {
  getEncodedListCmdLines,
  getListProgramLines,
  noProgramsAvailable,
} from '../../../Terminal/responseLines/listCommands';
import {
  getErrorMessage,
  wrongListCommandError,
} from '../responseLines/errors';
import { getListLines } from '../responseLines/list';

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
    addLines(
      getListLines(this.commands.filter((command) => command.onDisconnected)),
    );
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
    if (ServerConnectionService.isDecrypted) {
      addLines(
        getListLines(this.commands.filter((command) => command.onConnected)),
      );
    } else {
      addLines(
        getListLines(
          this.commands.filter(
            (command) =>
              command.onConnected ||
              !system.encryptedCommands?.includes(command.disableCode),
          ),
        ),
      );
    }
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

  commands = [
    {
      title: 'list cmd',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: '',
      description: 'Lists all available commands',
    },
    {
      title: 'list prog',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: '',
      description: 'Lists all available exploits',
    },
    {
      title: 'clear',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: '',
      description: 'Clears console',
    },
    {
      title: 'exit',
      onDisconnected: true,
      onConnected: false,
      special: '',
      disableCode: '',
      description: 'Exit terminal',
    },
    {
      title: 'logout',
      onDisconnected: true,
      onConnected: false,
      special: '',
      disableCode: '',
      description: 'Logout from this terminal',
    },
    {
      title: 'end',
      onDisconnected: false,
      onConnected: true,
      special: '',
      disableCode: '',
      description: 'End connection to currently connected subnetwork',
    },
    {
      title: 'name [newName]',
      onDisconnected: true,
      onConnected: false,
      special: '',
      disableCode: '',
      description: 'Change your hacker name to [newName]',
    },
    {
      title: 'install [programKey] [options]',
      onDisconnected: true,
      onConnected: false,
      special: '',
      disableCode: '',
      description: 'Install program using [programKey]',
    },
    {
      title: 'doc [option]',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: '',
      description: 'Shows documentation about [option]',
    },
    {
      title: 'scan [options]',
      onDisconnected: true,
      onConnected: true,
      special: 'scan',
      disableCode: '',
      description: 'Retrieve data with provided [option]',
    },
    {
      title: 'run [programName] [subnetworkId]',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: '',
      description: 'Runs [programName] on the specified [subnetworkId]',
    },
    {
      title: 'profile [userId] [recordId]',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: '',
      description:
        'Retrieve data about user (from [userId]) or its record if [recordId] is provided',
    },
    {
      title: 'copydata [userId] [recordId]',
      onDisconnected: false,
      onConnected: true,
      special: '',
      disableCode: 'copydata',
      description:
        'Copy record data from user (from [userId]) to your account (into Private Records)',
    },
    {
      title: 'balance',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: 'balance',
      description: 'Get balance records about account',
    },
    {
      title: 'transfer',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: 'transfer',
      description: 'Transfer founds',
    },
    {
      title: 'readMsg [conversationId]',
      onDisconnected: true,
      onConnected: true,
      special: '',
      disableCode: 'readMsg',
      description: 'Read conversation',
    },
  ];
}
