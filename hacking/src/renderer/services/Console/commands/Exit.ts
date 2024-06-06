import { BaseCommand } from '../../CommandsService/CommandsService';

export default class Exit extends BaseCommand {
  execute = () => {
    window.close();
  };
}
