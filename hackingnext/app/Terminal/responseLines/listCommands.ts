import { canTabSelector } from '../hooks/useKeyHandler';
import {
  COMMANDS_DESCRIPTIONS,
  CONNECTED_COMMANDS_DESCRIPTIONS,
} from '../data/commands';

export function getListCmdLines() {
  const lines = [];
  const commandsKeys = Object.keys(COMMANDS_DESCRIPTIONS);
  for (let i = 0; i < commandsKeys.length; i++) {
    lines.push(
      `<span class="secondary-color">${commandsKeys[i]}</span> ${
        COMMANDS_DESCRIPTIONS[commandsKeys[i]]
      }`,
    );
  }
  return lines;
}

export function getEncodedListCmdLines(encryptedCommands: []) {
  const lines = [];
  const commandsKeys = Object.keys(CONNECTED_COMMANDS_DESCRIPTIONS);
  for (let i = 0; i < commandsKeys.length; i++) {
    if (encryptedCommands.includes(commandsKeys[i])) {
      lines.push(
        `<span class="disabled-color">${commandsKeys[i]}</span> ${
          CONNECTED_COMMANDS_DESCRIPTIONS[commandsKeys[i]]
        }`,
      );
    } else {
      lines.push(
        `<span class="secondary-color">${commandsKeys[i]}</span> ${
          CONNECTED_COMMANDS_DESCRIPTIONS[commandsKeys[i]]
        }`,
      );
    }
  }
  return lines;
}

export function getDecodedListCmdLines() {
  const lines = [];
  const commandsKeys = Object.keys(CONNECTED_COMMANDS_DESCRIPTIONS);
  for (let i = 0; i < commandsKeys.length; i++) {
    lines.push(
      `${commandsKeys[i]} <span class="secondary-color">${
        CONNECTED_COMMANDS_DESCRIPTIONS[commandsKeys[i]]
      }</span>`,
    );
  }
  return lines;
}

export function getListProgramLines(programs) {
  const lines = [];
  for (let i = 0; i < programs.length; i++) {
    lines.push(
      `<span class="accent-color-2" ${canTabSelector}>${programs[i].name}</span> ${programs[i].type}`,
    );
  }
  return lines;
}
