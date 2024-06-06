import { BaseCommand } from '../../CommandsService/CommandsService';
import Directory from '../index';

export default class End extends BaseCommand {
  execute = async () => {
    await Directory.enterServer('home');
  };
}
