import { canTabSelector } from '../../../Terminal/hooks/useKeyHandler';
import { ProfileType, EventType } from '../../../types';
import { field, tabField } from './utils';
import { HACKING_TYPE, MINDHACK_TYPE } from '../../ApiService/mappers/profile';

export function getBaseProfileLines(data: ProfileType): string[] {
  const lines = [
    `${tabField('id', data.id)}`,
    `${tabField('handle', data.handle)}`,
    `${tabField('name', data.name)}, ${tabField('surname', data.surname)}`,
    `${tabField('network', data.networkId)}`,
    `${tabField('subnetwork', data.subnetworkId)}`,
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

export function getEventProfileLines(event: EventType): string[] {
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
