// eslint-disable-next-line import/no-cycle
import { renderConsole } from './utils/renders';
import type { LineType } from './components/Output';
import setupWindowListener from './utils/keyEvents';
import { CommandsService } from '../index';
import Clear from './commands/Clear';
import Exit from './commands/Exit';

export default class Console {
  async init(container: HTMLElement) {
    renderConsole(container);
    setupWindowListener.bind(this)();
    CommandsService.addCommand('clear', new Clear());
    CommandsService.addCommand('exit', new Exit());
  }

  public inputHistory: string[] = [];

  public activeHistoryIndex: number = 0;

  addToInputHistory(newLine: string) {
    this.inputHistory.push(newLine);
  }

  clear() {
    this.resetLines();
  }

  public engageDirectInput(startLine: string | string[]): Promise<string> {
    this.addLines(startLine);
    this.setEnableDirectInput(true);
    this.setInputPrefix('');

    return new Promise<string>((resolve) => {
      window.addEventListener('keydown', this.handleDirectKey.bind(this));
      this.enter = () => {
        const resolveInput = this.directInputValue;
        this.setEnableDirectInput(false);
        this.setDirectInputValue('');
        window.removeEventListener('keydown', this.handleDirectKey);
        resolve(resolveInput);
      };
    });
  }

  public handleDirectKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.enter(event);
    }
  }

  enter = () => {};

  /*
   * Input fields
   */
  public inputValue: string = '';

  public isDirectInput: boolean = false;

  public isInputHidden: boolean = false;

  public isInputLoading: boolean = false;

  public inputPrefix: string = '';

  public setInputValue: (value: string) => void = () => {};

  public setInputRows: (rows: number | ((rows: number) => number)) => void =
    () => {};

  public setInputPrefix: (value: string) => void = () => {};

  public setInputLoading: (
    value: boolean | ((value: boolean) => boolean),
  ) => void = () => {};

  public setInputHidden: (
    value: boolean | ((value: boolean) => boolean),
  ) => void = () => {};

  public setEnableDirectInput: (
    value: boolean | ((value: boolean) => boolean),
  ) => void = () => {};

  public setDirectInputValue: (value: string) => void = () => {};

  public directInputValue: string = '';

  /*
   * Output fields
   */
  public addLines: (
    newLines: LineType[] | string[] | LineType | string,
  ) => void = () => {};

  public addUserLine: (newLine: string) => void = () => {};

  public addErrorLines: (
    newLines: LineType[] | string[] | LineType | string,
  ) => void = () => {};

  public removeLine: (id: string) => void = () => {};

  public changeLine: (id: string, newLine: LineType) => void = () => {};

  public removeLastLine: () => void = () => {};

  public changeLastLine: (newLine: LineType) => void = () => {};

  public resetLines: () => void = () => {};
}
