import { canTabSelector } from '../../../Terminal/hooks/useKeyHandler';
import {
  ProfileType,
  EventType,
  BankAccountType,
  ConversationType,
} from '../../../types';
import { field, tabField } from './utils';
import { HACKING_TYPE, MINDHACK_TYPE } from '../../ApiService/mappers/profile';

export function getBaseProfileLines(data: ProfileType): string[] {
  const lines = [
    `${tabField('id', data.id)}`,
    `${tabField('handle', data.handle)}`,
    `${tabField('name', data.name)}, ${tabField('surname', data.surname)}`,
    `${tabField('network', data.networkName)} ${tabField('id', data.networkId)}`,
    `${tabField('subnetwork', data.subnetworkName)} ${tabField('id', data.subnetworkId)}`,
    // eslint-disable-next-line
    `${field('type', data.typeActual)} ${field('wealth', data.wealthLevel,)}`,
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

  // Conversations
  // if (data.conversations.length)
  //   tableContent = `${tableContent}${printConversationTablePart(
  //     'Conversations',
  //     data.conversations,
  //   )}`;

  // Accounts
  if (data.accounts.length)
    tableContent = `${tableContent}${printAccountTablePart(
      'Accounts',
      data.accounts,
    )}`;

  // Gigs
  if (data.gigs.length)
    tableContent = `${tableContent}${printRecordTablePart('Gigs', data.gigs)}`;

  if (tableContent)
    lines.push(`<table class="profile-table">${tableContent}</table>`);

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
        <td><span class="accent-color">25.05.2077</span></td>
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
        <td><span class="accent-color">25.05.2077</span></td>
        <td></td>
        <td></td>
        </tr>`,
      )
      .join('')}`;
  }

  function printAccountTablePart(
    title: string,
    children: BankAccountType[],
  ): string {
    return `<tr class="secondary-color table-title"><td colspan="5">${title}</td></tr> ${children
      .map(
        (event) =>
          `<tr>
        <td>${event.type}: ${withTab(event.accountNumber)}</td>
        <td>Ballance: <span class="secondary-color">${event.balance}</span></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>`,
      )
      .join('')}`;
  }
  function printConversationTablePart(
    title: string,
    children: ConversationType[],
  ): string {
    return `<tr class="secondary-color table-title"><td colspan="5">${title}</td></tr> ${children
      .map(
        (event) =>
          `<tr>
        <td>${withTab(event.id)}</td>
        <td>${event.participants ? event.participants.join(', ') : ''}</td>
        <td></td>
        <td></td>
        <td></td>
        </tr>`,
      )
      .join('')}`;
  }
}

export function getEventProfileLines(event: EventType): string[] {
  const lines: string[] = [
    `<span class="accent-color-2" ${canTabSelector}>${event.id}</span> <span class="secondary-color">${event.name}</span> <span class="accent-color">25.05.2077</span> `, // todo <span>${event.type}</span> <span>${event.status}</span>
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
