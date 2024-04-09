import {canTabSelector} from "../hooks/useKeyHandler";
import {ProfileType} from "../../apiService/types";

export function getBaseProfileLines(data: ProfileType): string[] {
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
