import type CommandsServiceType from '../CommandsService';
import {ApiService, ConfigService, ServerConnectionService} from '../../index';
import { getErrorMessage } from '../responseLines/errors';
import { getNewNameLines } from '../responseLines/misc';

export default class Name {
  private readonly Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      setInputDisabled,
      fireInitError,
      addLines,
      parsedCommand,
      refreshPrefix,
      getDirectLine,
    } = this.Service;
    if (!setInputDisabled || !addLines || !refreshPrefix) {
      fireInitError();
      return;
    }
    if (ServerConnectionService.isConnected) {
      addLines(`<span class="secondary-color">Error: </span> You cant change your CIC Terminal name while connected to subntetwork`);
      return;
    }
    let name = parsedCommand[0];
    if (!name) {
      name = await getDirectLine(`Enter your new hacker name:`);
      return;
    }
    try {
      await ConfigService.checkHacking('name');
      setInputDisabled(true);
      ApiService.changeActiveUserHackingName(name).then((newHackerName) => {
        setInputDisabled(false);
        addLines(getNewNameLines(newHackerName.hackerName));
        refreshPrefix();
      });
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
