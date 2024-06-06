import { ApiService } from '../../index';
import { NodeType } from '../types';
import Console from '../../Console';
import { onlyTab } from '../../CommandsService/responseLines/utils';
import Directory from '../index';
import makeProfileTree from '../utils/TreeMaker';

type ServerPropsType = {
  id: string;
  type: 'network' | 'profile';
};

export default class Server {
  private readonly id: string;

  private adminId?: string;

  private subnetworks?: string[];

  public name: string = '';

  public rootNode?: NodeType;

  constructor(props: ServerPropsType) {
    this.id = props.id;
  }

  async init() {
    const networkData = await ApiService.getNetworkById(this.id);
    this.name = networkData.name;
    this.adminId = networkData.adminId;
    this.subnetworks = networkData.subnetworks;
    this.rootNode = {
      name: networkData.name,
      type: 'folder',
      files: [],
    };
  }

  async initSubnetworks() {
    if (!this.subnetworks || !this.rootNode) {
      return;
    }
    const subnetworks = await Promise.all(
      this.subnetworks.map((subnetworkId) =>
        ApiService.getSubnetworkById(subnetworkId),
      ),
    );

    subnetworks.forEach((subnetwork) => {
      this.rootNode?.files?.push({
        name: subnetwork.name,
        type: 'folder',
        files: subnetwork.users?.map((user: string) => ({
          name: user,
          needFetching: true,
          type: 'folder',
          files: [],
        })),
      });
    });
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

  async prepareFolder(node: NodeType) {
    if (!this.rootNode) {
      return;
    }
    const path: string[] = [];
    let activeTree: NodeType[] | undefined = this.rootNode.files;
    if (Directory.currentPath.length) {
      Directory.currentPath.forEach((pathName: string) => {
        const newNode = activeTree?.filter(
          (node: NodeType) => node.name === pathName,
        )[0];
        const newIndex = activeTree?.indexOf(newNode);
        path.push(newIndex);
        activeTree = newNode.files;
      });
    }

    const userProfile = await ApiService.getProfileByHandle(node.name);
    const files = makeProfileTree(userProfile);
    // Yes, I know it's ugly. I don't care. It works.
    if (path.length === 1) {
      // @ts-ignore
      this.rootNode.files[path[0]].files = files;
      // @ts-ignore
      this.rootNode.files[path[0]].needFetching = false;
    } else if (path.length === 2) {
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files = files; // eslint-disable-line
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].needFetching = false; // eslint-disable-line
    } else if (path.length === 3) {
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files[path[2]].files = files; // eslint-disable-line
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files[path[2]].needFetching = false; // eslint-disable-line
    } else if (path.length === 4) {
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files[path[2]].files[path[3]].files = files; // eslint-disable-line
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files[path[2]].files[path[3]].needFetching = false; // eslint-disable-line
    } else if (path.length === 5) {
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files[path[2]].files[path[3]].files[path[4]].files = files; // eslint-disable-line
      // @ts-ignore
      this.rootNode.files[path[0]].files[path[1]].files[path[2]].files[path[3]].files[path[4]].needFetching = false; // eslint-disable-line
    }
  }
}
