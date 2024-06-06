import { BaseCommand } from '../../CommandsService/CommandsService';
import Console from '../../Console';
import Directory from '../index';
import Minesweeper from '../../Games/Minesweeper';

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

    if (this.node.type === 'game') {
      await this.startGame();
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

  async startGame() {
    const { type } = this.node.data;
    if (type === 'minesweeper') {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1));
      const rows = await Console.engageDirectInput('Enter number of rows: ');
      if (!rows || Number(rows) <= 0) {
        Console.addLines('Wrong number of rows');
        return;
      }
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1));
      const col = await Console.engageDirectInput('Enter number of columns: ');
      if (!col || Number(col) <= 0) {
        Console.addLines('Wrong number of col');
        return;
      }
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1));
      const bombs = await Console.engageDirectInput('Enter number of bombs: ');
      if (!bombs || Number(bombs) <= 0) {
        Console.addLines('Wrong number of bombs');
        return;
      }

      Minesweeper.init(col, rows, bombs);
    }
  }
}
