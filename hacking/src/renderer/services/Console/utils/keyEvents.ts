import { INPUT_ID } from '../constants';
// eslint-disable-next-line import/no-cycle
import Console from '..';
import { tab, clearTab } from './tabEvents';
import { CommandsService } from '../../index';
import Auth from '../../Auth';

const keyMap: { [key: number]: (event: KeyboardEvent) => void } = {
  9: tab,
  13: enter,
  // 32: space,
  38: upArrow,
  40: downArrow,
  // 67: c,
  120: f9,
};

export default function setupWindowListener() {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if ((!event.ctrlKey && !event.metaKey) || event.keyCode === 86) {
      const inputRef = document.getElementById(INPUT_ID);
      if (inputRef) inputRef.focus();
    }
    const keyAction = keyMap[event.keyCode];
    if (!keyAction || typeof keyAction !== 'function') return;
    keyAction(event);
  });
}

function enter(event: KeyboardEvent) {

  if (Console.isInputLoading || Console.isInputHidden) {
    event.preventDefault();
    return;
  }

  if (Console.isDirectInput) {
    event.preventDefault();
    CommandsService.executeCommand(Console.inputValue);
    return;
  }
  // Next line
  if (event.shiftKey) {
    Console.setInputRows((rows) => rows + 1);
    clearTab();
    return;
  }

  // Enter command
  event.preventDefault();
  Console.addToInputHistory(Console.inputValue);
  Console.addUserLine(`${Console.inputPrefix} ${Console.inputValue?.trim()}`);

  // Run command
  CommandsService.executeCommand(Console.inputValue);

  // Clear
  Console.setInputValue('');
  Console.setInputRows(1);
  Console.activeHistoryIndex = 0;
  clearTab();
}

function upArrow(event: KeyboardEvent) {
  event.preventDefault();
  Console.activeHistoryIndex += 1;
  const arrayIndex = Console.inputHistory.length - Console.activeHistoryIndex;
  const historyCommand = Console.inputHistory[arrayIndex];
  if (historyCommand) {
    const newLines = (historyCommand.match(/\n/g) || []).length;
    Console.setInputValue(historyCommand);
    Console.setInputRows(newLines + 1);
  } else {
    Console.activeHistoryIndex -= 1;
  }
}

function downArrow(event: KeyboardEvent) {
  event.preventDefault();
  Console.activeHistoryIndex -= 1;
  const arrayIndex = Console.inputHistory.length - Console.activeHistoryIndex;
  const historyCommand = Console.inputHistory[arrayIndex];
  if (historyCommand) {
    const newLines = (historyCommand.match(/\n/g) || []).length;
    Console.setInputValue(historyCommand);
    Console.setInputRows(newLines + 1);
  } else {
    Console.activeHistoryIndex += 1;
  }
}

function f9() {
  console.log('test');
  Auth.test();

  // Timelines.start('TestTimer', 21, { blockInput: true });

  // Console.addLines(
  //   `New random value: <span ${canTabSelector} class="accent-color-2">${
  //     Math.random() * 100
  //   }</span>`,
  // );

  // Console.setInputLoading((value) => !value);
  // Console.setInputHidden((value) => !value);
}
