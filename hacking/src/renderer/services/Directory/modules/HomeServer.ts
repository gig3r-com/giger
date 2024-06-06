import { ApiService } from '../../index';
import { NodeType } from '../types';
import Console from '../../Console';
import { onlyTab } from '../../CommandsService/responseLines/utils';
import Directory from '../index';
import makeProfileTree from '../utils/TreeMaker';

type ServerPropsType = {
  handle: string;
};

export default class Server {
  private readonly name: string = '';

  public rootNode?: NodeType;

  constructor(props: ServerPropsType) {
    this.name = props.handle;
  }

  async init() {
    const userData = await ApiService.getProfileByHandle(this.name);
    this.rootNode = {
      name: userData.handle,
      type: 'folder',
      files: makeProfileTree(userData),
    };
  }

  getActiveTree(): NodeType[] | undefined {
    if (!this.rootNode) {
      return;
    }
    let activeTree: NodeType[] | undefined = this.rootNode.files;
    if (Directory.currentPath.length) {
      Directory.currentPath.forEach((pathName: string) => {
        activeTree = activeTree?.filter(
          (node: NodeType) => node.name === pathName,
        )[0].files;
      });
    }
    return activeTree;
  }

  getAvailableNodes(): { files: NodeType[]; folders: NodeType[] } {
    const files: NodeType[] = [];
    const folders: NodeType[] = [];
    const activeTree = this.getActiveTree();
    if (!activeTree) {
      return { files, folders };
    }
    activeTree?.forEach((node) => {
      if (node.type === 'folder') {
        folders.push(node);
      } else {
        files.push(node);
      }
    });
    return { files, folders };
  }

  listAvailableFiles() {
    const { files, folders } = this.getAvailableNodes();
    if (!files.length && !folders.length) {
      Console.addLines(['Folder empty']);
    }
    Console.addLines([
      ...files.map((file) => onlyTab(this.makeName(file))),
      ...folders.map((folder) => `&#128448; ${onlyTab(this.makeName(folder))}`),
    ]);
  }

  makeName(node: NodeType) {
    const { name, isLocked, type } = node;
    return `${name}${isLocked ? '.locked' : ''}${
      type === 'folder' ? '' : `.${type}`
    }`;
  }
}
