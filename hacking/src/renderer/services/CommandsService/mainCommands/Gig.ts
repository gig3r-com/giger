import type CommandsServiceType from '../CommandsService';
import { getErrorMessage } from '../responseLines/errors';
import { ApiService, ConfigService, ServerConnectionService, } from '../../index';
import { getFullGigLines } from '../responseLines/gig';
import { getFullConversationLines } from '../responseLines/conversations';

export default class Gig {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      addLines,
      fireInitError,
      parsedCommand,
      setInputDisabled,
      getDirectLine,
    } = this.Service;
    if (!addLines || !setInputDisabled) {
      fireInitError();
      return;
    }
    let gigId = parsedCommand[0];
    if (!gigId) {
      gigId = await getDirectLine(`Enter gig's id:`);
    }
    try {
      await ConfigService.checkHacking('gig', parsedCommand.join(' '));
      ServerConnectionService.checkCommand('gig');
      const programs = await ApiService.getAvailablePrograms();
      const isGigerGate = !!programs.filter((p) => p.name === 'GigerGate')
        .length;
      setInputDisabled(true);
      const gig = await ApiService.getGigById(gigId.trim());
      let gigConversation;
      try {
        gigConversation = await ApiService.getGigConversationById(
          gig.conversasionId,
        );
      } catch (err) {
        console.error(err);
      }
      addLines(getFullGigLines(gig, isGigerGate));

      if (gigConversation && isGigerGate) {
        addLines(['']);
        addLines(getFullConversationLines(gigConversation));
      } else if (gigConversation && !isGigerGate) {
        addLines([
          '',
          `<span class="secondary-color">Error: </span>Unable to decrypt gig's conversation, you need a GigerGate exploit to see this conversation`,
        ]);
      } else {
        addLines([
          '',
          `<span class="secondary-color">Error: </span>No gig's conversation found`,
        ]);
      }
      addLines(['']);
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
