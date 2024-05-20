import type CommandsServiceType from '../CommandsService';
import { getErrorMessage, notConnectedError } from '../responseLines/errors';
import { getFullConversationLines } from '../responseLines/conversations';
import {ApiService, ConfigService} from '../../index';

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
      parsedCommand,
      setInputDisabled,
    } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    // if (!ServerConnectionService.isConnected) {
    //   addLines(notConnectedError);
    //   return;
    // }
    try {
      await ConfigService.checkHacking('readmsg');
      setInputDisabled(true);
      const conversation = await ApiService.getConversationById(parsedCommand[0]);
      addLines(getFullConversationLines(conversation));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
