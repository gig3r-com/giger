import { canTabSelector } from '../hooks/useKeyHandler';

export function title(value: string): string {
  return `<span class="secondary-color">${value}</span> found!`;
}
export function field(key: string, value: string): string {
  return `<span>${key}:</span> <span>${value}</span>`;
}

export function tabField(key: string, value: string): string {
  return `<span>${key}:</span> ${onlyTab(value)}`;
}

export function onlyTab(children: string): string {
  return `<span class="accent-color-2" ${canTabSelector}>${children}</span>`;
}

export function array(key: string, value: string[]): string {
  return `<span>${key}:</span> <span>${value.join(', ')}</span>`;
}

export function tabArray(key: string, value: string[]): string {
  return `<span>${key}:</span> ${value.map((v) => onlyTab(v)).join(', ')}`;
}
