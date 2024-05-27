import { ServerConnectionService } from '../../index';
import CommandsServiceType from '../CommandsService';

export default class Ap {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { addLines, fireInitError, parsedCommand, setAccessPoint } =
      this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }

    if (parsedCommand[0] === 'green') {
      setAccessPoint('Green-AP');
      ServerConnectionService.accessPoint = { type: 'green' };
      addLines([
        `<span class="accent-color-2">Green</span> access point engaged.`,
      ]);
      return;
    }

    if (parsedCommand[0] === 'red') {
      setAccessPoint('Red-AP');
      ServerConnectionService.accessPoint = { type: 'red' };
      addLines([
        `<span class="accent-color-2">Red</span> access point engaged.`,
      ]);
      return;
    }

    if (parsedCommand[0] === 'off') {
      setAccessPoint(null);
      ServerConnectionService.accessPoint = null;
      addLines([`Access point disengaged.`]);
      return;
    }

    setAccessPoint(null);
    ServerConnectionService.accessPoint = null;
    addLines([`Access point disengaged.`]);
  }
}
