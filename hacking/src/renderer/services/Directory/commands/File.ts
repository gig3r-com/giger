import { BaseCommand } from '../../CommandsService/CommandsService';
import Console from '../../Console';
import Directory from '../index';

export default class FileCommand extends BaseCommand {
  public node;

  constructor(props) {
    super();
    this.node = props.node;
  }

  async init() {}

  execute = async () => {
    if (this.node.type === 'folder') {
      await Directory.move(this.node.name);
      return;
    }

    if (this.node.type === 'info') {
      this.renderFileData();
    }
  };

  renderFileData() {
    Object.keys(this.node.data).forEach((key) => {
      const dataValue = this.node.data[key];
      switch (typeof dataValue) {
        case 'string':
        case 'number':
          Console.addLines([
            `<span class="secondary-color">${key}:</span> ${
              key === 'date'
                ? `<span class="accent-color">${this.node.data[key]}</span>`
                : this.node.data[key]
            }`,
          ]);
          break;
        case 'object':
          this.renderObject(dataValue);
          break;
        default:
          break;
      }
    });
  }

  renderObject(object) {
    if (Array.isArray(object)) {
      Console.addLines(object);
    } else if (object) {
      Object.keys(object).forEach((key) => {
        Console.addLines([`${key}: ${object[key]}`]);
      });
    }
  }
}
