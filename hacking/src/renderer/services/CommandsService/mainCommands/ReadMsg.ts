import type CommandsServiceType from '../CommandsService';
import { getErrorMessage, notConnectedError } from '../responseLines/errors';
import { getFullConversationLines } from '../responseLines/conversations';
import {
  ApiService,
  ConfigService,
  ServerConnectionService,
} from '../../index';

export default class End {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      addLines,
      fireInitError,
      parsedCommand,
      parsedCommandRaw,
      setInputDisabled,
    } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    try {
      const subcommand = parsedCommand.join(' ');
      await ConfigService.checkHacking('readmsg', subcommand);
      ServerConnectionService.checkCommand('readmsg');
      setInputDisabled(true);
      const conversation = await ApiService.getConversationById(
        parsedCommandRaw[1],
      );
      addLines(['']);
      addLines(getFullConversationLines(conversation));
      addLines(['']);
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
