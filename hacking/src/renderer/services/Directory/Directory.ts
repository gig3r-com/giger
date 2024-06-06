import Console from '../Console';
import { ApiService, CommandsService } from '../index';
import Ls from './commands/Ls';
import FileCommand from './commands/File';
import Back from './commands/Back';
import Scan from './commands/Scan';
import Connect from './commands/Connect';
import End from './commands/End';
import Server from './modules/Server';
import HomeServer from './modules/HomeServer';
import type ServerType from './modules/Server';
import { NodeType } from './types';
import Auth from '../Auth';

const testNetworks = [
  '0fdc0794-6c85-4c90-ba62-74383a045b86',
  'c65641b7-45d6-4efa-8bb0-6979eb8e23e0',
  'dd1d5109-368c-4270-8326-abef14f073be',
  '8d22da23-7698-44be-969a-aebfcaa02b6b',
  // '1beb97c4-99af-4a33-992a-4187c46bb9f9',
  'bf3c1c2c-7d6d-497b-92ea-27686980e5e6',
  'd3484b46-a31c-43b5-87fe-7465f5b3be3e',
];
export default class Directory {
  public currentPath: string[] = [];

  public activeFileCommands: string[] = [];

  public activeServer = 'home';

  public servers: { [serverName: string]: ServerType | HomeServer } = {};

  async build() {
    const { handle } = Auth.hackerData;
    this.servers.home = new HomeServer({ handle: 'hackerbot' });
    await this.servers.home.init();
    await Promise.all(
      testNetworks.map((networkId) => this.fetchServer(networkId)),
    );
    await this.enterServer('home');

    CommandsService.addCommand('ls', new Ls());
    CommandsService.addCommand('back', new Back());
    CommandsService.addCommand('b', new Back());
    CommandsService.addCommand('scan', new Scan());
    CommandsService.addCommand('connect', new Connect());
    CommandsService.addCommand('end', new End());
    this.resetCommands();
  }

  async fetchServer(id: string) {
    const server = new Server({ id, type: 'network' });
    await server.init();
    this.servers[server.name] = server;
  }

  async enterServer(name: string) {
    this.activeServer = name;
    this.currentPath = [];
    if (this.servers[name].initSubnetworks) {
      await this.servers[name].initSubnetworks();
    }
    Console.setInputPrefix(`${this.servers[name].name}:\\>`);
    this.resetCommands();
  }

  makeName(node: NodeType) {
    const { name, isLocked, type } = node;
    return `${name}${isLocked ? '.locked' : ''}${
      type === 'folder' ? '' : `.${type}`
    }`;
  }

  async move(folderName: string) {
    const server = this.servers[this.activeServer];
    const { folders } = server.getAvailableNodes();
    const filteredDolders = folders.filter((node) => node.name === folderName);
    if (!filteredDolders.length) {
      Console.addLines(['folderNotFound']);
      return;
    }
    const folder = filteredDolders[0];
    if (folder.type !== 'folder') {
      Console.addLines(['notAFolder']);
      return;
    }
    this.currentPath.push(folder.name);
    if (folder.needFetching && server.prepareFolder) {
      Console.setInputLoading(true);
      await server.prepareFolder(folder);
      Console.setInputLoading(false);
    }
    Console.setInputPrefix(
      `${this.activeServer}:\\${this.currentPath.join(`\\`)}>`,
    );
    this.resetCommands();
    CommandsService.mainCommandsTable.ls.execute();
  }

  moveBack() {
    if (!this.currentPath.length) {
      Console.addLines(['cantGoBack']);
    } else if (this.currentPath.length === 1) {
      this.currentPath = [];
      Console.setInputPrefix(`${this.activeServer}:\\>`);
      this.resetCommands();
    } else {
      this.currentPath.pop();
      Console.setInputPrefix(
        `${this.activeServer}:\\${this.currentPath.join(`\\`)}>`,
      );
      this.resetCommands();
    }
  }

  resetCommands() {
    this.activeFileCommands.forEach((command) => {
      CommandsService.removeCommand(command);
    });
    const server = this.servers[this.activeServer];
    const { files, folders } = server.getAvailableNodes();
    [...files, ...folders].forEach(async (node) => {
      const name = this.makeName(node);
      this.activeFileCommands.push(name);
      const file = new FileCommand({ node });
      file.init().then(() => {
        CommandsService.addCommand(name.toLowerCase(), file);
      });
    });
  }
}
