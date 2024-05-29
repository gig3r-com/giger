import { renderConsole } from './utils/renders';
import type { LineType } from './components/Output';
import {setupWindowListener} from "./utils/keyEvents";

export default class Console {
  public setInputValue: (value: string) => void;

  public addLines: (
    newLines: LineType[] | string[] | LineType | string,
  ) => void;

  public addUserLines: (
    newLines: LineType[] | string[] | LineType | string,
  ) => void;

  public addErrorLines: (
    newLines: LineType[] | string[] | LineType | string,
  ) => void;

  public removeLine: (id: string) => void;

  public changeLine: (id, newLine) => void;

  public removeLastLine: () => void;

  public changeLastLine: (newLine) => void;

  init(container: HTMLElement) {
    renderConsole(container);
    setupWindowListener();
  }

  onInputChange = () => {};

  private keyMap: { [key: number]: (event: KeyboardEvent) => void } = {
    9: tab,
    13: enter,
    32: space,
    38: upArrow,
    67: c,
  };
}

/*
Basic commands:

pwd
cd -
ls - list
 */
