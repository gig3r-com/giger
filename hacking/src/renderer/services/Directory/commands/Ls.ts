// eslint-disable-next-line import/no-cycle
import { BaseCommand } from '../../CommandsService/CommandsService';
import Directory from '../index';

export default class Ls extends BaseCommand {
  execute = () => {
    const server = Directory.servers[Directory.activeServer];
    server.listAvailableFiles();
  };
}
