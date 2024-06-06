// eslint-disable-next-line import/no-cycle
import { BaseCommand } from '../../CommandsService/CommandsService';
import Console from '..';

export default class Class extends BaseCommand {
  execute = () => {
    Console.clear();
  };
}
