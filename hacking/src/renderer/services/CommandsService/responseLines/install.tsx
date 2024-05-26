import { onlyTab } from './utils';

export function getProgramAvailableMessage(
  program: any,
  programKey: string,
): string[] {
  return [
    `Program <span class="secondary-color">${program.name}</span> with key: ${onlyTab(
      programKey,
    )} is available. (type <span class="secondary-color">${program.type}</span>)`,
  ];
}

export function getProgramAddedMessage(programName: string): string[] {
  return [`Program ${programName} was installed successfully.`];
}
