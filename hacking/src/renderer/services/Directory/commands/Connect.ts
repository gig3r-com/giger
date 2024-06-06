import { BaseCommand } from '../../CommandsService/CommandsService';
import Directory from '../index';
import Console from '../../Console';
import { CommandsService } from '../../index';
import {onlyTab} from "../../CommandsService/responseLines/utils";

export default class Connect extends BaseCommand {
  execute = () => {
    if (CommandsService.parsedCommandRaw[1]) {
      Directory.enterServer(CommandsService.parsedCommandRaw[1]);
    } else {
      Object.keys(Directory.servers).forEach((serverName) => {
        if (serverName !== 'home') {
          Console.addLines(onlyTab(serverName));
        }
      });
    }
  };
}
