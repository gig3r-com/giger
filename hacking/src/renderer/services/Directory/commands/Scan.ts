import { BaseCommand } from '../../CommandsService/CommandsService';
import Directory from '../index';
import Console from '../../Console';
import { getBaseProfileLines } from '../utils/scanLines';

export default class Scan extends BaseCommand {
  execute = () => {
    const server = Directory.servers[Directory.activeServer];
    const { files } = server.getAvailableNodes();
    const profileFile = files.filter((file) => file.name === 'profile');
    if (profileFile.length) {
      Console.addLines(getBaseProfileLines(profileFile[0].profileData));
    } else {
      Console.addLines(['no profile file found']);
    }
  };
}
