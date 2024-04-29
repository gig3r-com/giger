import { canTabSelector } from '../hooks/useKeyHandler';
import {
  ProfileType,
  EventType,
  SubnetworkType,
  NetworkType,
  UserType,
} from '../../types';
import {
  MINDHACK_TYPE,
  HACKING_TYPE,
} from '../../services/ApiService/mappers/profile';
import { field, tabField, title, tabArray, array, onlyTab } from './utils';

export function getBaseProfileLines(data: ProfileType): string[] {
  const lines = [
    // eslint-disable-next-line
    `${tabField('id', data.id)} ${tabField('handle', data.handle,)} ${field('name', data.name)} ${field('surname', data.surname,)}`,
    // eslint-disable-next-line
    `${tabField('network', data.networkId)} ${tabField('subnetwork', data.subnetworkId,)}`,
    // eslint-disable-next-line
    `${field('type', data.typeActual)} ${field('profession', data.professionActual,)} ${field('age', String(data.age))} ${field('wealth', data.wealthLevel,)}`,
  ];

  // Events
  let tableContent = '';
  if (data.medicalEvents.length)
    tableContent = `${tableContent}${printTablePart(
      'Medical',
      data.medicalEvents,
    )}`;
  if (data.criminalEvents.length)
    tableContent = `${tableContent}${printTablePart(
      'Criminal',
      data.criminalEvents,
    )}`;
  if (data.privateRecords.length)
    tableContent = `${tableContent}${printRecordTablePart(
      'Records',
      data.privateRecords,
    )}`;
  if (tableContent)
    lines.push(`<table class="profile-table">${tableContent}</table>`);

  // Accounts

  return lines;

  function printTabField(key: string, alias?: string): string {
    return `<span>${alias || key}:</span> ${withTab(data[key])}`;
  }
  function printField(key: string, alias?: string): string {
    return `<span>${alias || key}:</span> <span>${data[key]}</span>`;
  }

  function withTab(children: string): string {
    return `<span class="accent-color-2" ${canTabSelector}>${children}</span>`;
  }

  function printTablePart(title: string, children: EventType[]): string {
    return `<tr class="secondary-color table-title"><td colspan="5">${title}</td></tr> ${children
      .map(
        (event) =>
          `<tr>
        <td>${withTab(event.id)}</td>
        <td>${event.name}</td>
        <td><span class="accent-color">${event.date}</span></td>
        <td>${event.type}</td>
        <td>${event.status}</td>
        </tr>`,
      )
      .join('')}`;
  }

  function printRecordTablePart(title: string, children: EventType[]): string {
    return `<tr class="secondary-color table-title"><td colspan="5">${title}</td></tr> ${children
      .map(
        (event) =>
          `<tr>
        <td>${withTab(event.id)}</td>
        <td>${event.name}</td>
        <td><span class="accent-color">${event.date}</span></td>
        <td></td>
        <td></td>
        </tr>`,
      )
      .join('')}`;
  }
}

export function getEventProfileLines(event: Event): string[] {
  const lines: string[] = [
    `<span class="accent-color-2" ${canTabSelector}>${event.id}</span> <span class="secondary-color">${event.name}</span> <span class="accent-color">${event.date}</span> <span>${event.type}</span> <span>${event.status}</span>`,
  ];

  if (event.additionalData) {
    if (event.additionalData.type === HACKING_TYPE) {
      lines.push(
        `<span class="secondary-color">Alias:</span> <span>${event.additionalData.alias}</span>`,
      );
      lines.push(
        `<span class="secondary-color">Exploits:</span> <span>${event.additionalData.exploits.join(
          ', ',
        )}</span>`,
      );
    } else if (event.additionalData.type === MINDHACK_TYPE) {
      lines.push(
        `<span class="secondary-color">Remote control:</span> <span>${event.additionalData.mindHack}</span>`,
      );
    }
  }

  lines.push(
    `<span class="secondary-color">Description:</span> <span>${event.description}</span>`,
  );

  return lines;
}
