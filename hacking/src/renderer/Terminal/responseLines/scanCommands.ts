import { canTabSelector } from '../hooks/useKeyHandler';

export function getUserIdLines(userId: string): string[] {
  return [`User ID: <span class="accent-color-2" ${canTabSelector}>${userId}</span>`];
}
export function getUserDataLines(data) {
  const lines = [];
  Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === 'string')
      lines.push(
        `<span>${key}</span> <span class="accent-color-2" ${canTabSelector}>${data[key]}</span>`,
      );
    if (data[key] && typeof data[key] === 'object')
      lines.push(
        `<span>${key}</span> <span ${canTabSelector} class="accent-color-2">${data[key].name}</span>`,
      );
  });
  return lines;
}

export function getSubnetworkDataLines(data) {
  const lines = [];
  Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === 'string')
      lines.push(
        `<span>${key}</span> <span class="accent-color-2" ${canTabSelector}>${data[key]}</span>`,
      );
    if (data[key] && typeof data[key] === 'object')
      lines.push(
        `<span>${key}</span> <span class="accent-color-2" ${canTabSelector}>${data[key].name}</span>`,
      );
  });
  return lines;
}
