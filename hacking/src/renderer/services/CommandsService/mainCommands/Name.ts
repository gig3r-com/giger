import type CommandsServiceType from '../CommandsService';
import { ApiService } from '../../index';
import { getErrorMessage, noUserNameError } from '../responseLines/errors';
import { getNewNameLines } from '../responseLines/misc';

export default class Name {
  private readonly Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const {
      setInputDisabled,
      fireInitError,
      addLines,
      parsedCommand,
      refreshPrefix,
    } = this.Service;
    if (!setInputDisabled || !addLines || !refreshPrefix) {
      fireInitError();
      return;
    }
    if (!parsedCommand[0]) {
      addLines(noUserNameError);
      return;
    }
    try {
      setInputDisabled(true);
      ApiService.changeActiveUserHackingName(parsedCommand[0]).then(
        (newHackerName) => {
          setInputDisabled(false);
          addLines(getNewNameLines(newHackerName.hackerName));
          refreshPrefix();
        },
      );
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
