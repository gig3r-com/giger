import { canTabSelector } from '../hooks/useKeyHandler';

export function getUserIdLines(userId: string | object): string[] {
  return [
    `User ID: <span class="accent-color-2" ${canTabSelector}>${userId}</span>`,
  ];
}
export function getUserDataLines(data) {
  const lines = [
    `<span class="secondary-color">User</span> found!`
  ];
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
  const lines = [
    `<span class="secondary-color">Subnetwork</span> found!`
  ];
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

export function getNetworkDataLines(data) {
  console.log(data)
  const lines = [
    `<span class="secondary-color">Network</span> found!`
  ];
  Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === 'string')
      lines.push(
        `<span>${key}</span> <span class="accent-color-2" ${canTabSelector}>${data[key]}</span>`,
      );
    if (data[key] && typeof data[key] === 'object')
      if (Array.isArray(data[key])) {
        lines.push(
          `<span>${key}</span> <span class="accent-color-2" ${canTabSelector}>${data[key].join(`</span>, </span><span class="accent-color-2" ${canTabSelector}>`)}</span>`,
        );
      } else {
        lines.push(
          `<span>${key}</span> <span class="accent-color-2" ${canTabSelector}>${data[key].name}</span>`,
        );
      }
  });
  return lines;
}
