import { onlyTab } from './utils';

export function getProgramAvailableMessage(
  programName: string,
  programKey: string,
): string[] {
  return [
    `Program <span class="secondary-color">${programName}</span> with key: ${onlyTab(
      programKey,
    )} is available.`,
  ];
}

export function getProgramAddedMessage(programName: string): string[] {
  return [`Program ${programName} was installed successfully.`];
}
