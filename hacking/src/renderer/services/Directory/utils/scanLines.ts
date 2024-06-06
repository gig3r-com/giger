import { ProfileType, EventType, BankAccountType } from '../../../types';

export function field(key: string, value: string): string {
  return `<span class="secondary-color">${key}:</span> <span>${value}</span>`;
}

export function getBaseProfileLines(data: ProfileType): string[] {
  const lines = [
    `${field('Handle', data.handle)}`,
    `${field('Surname', data.surname)}`,
    `${field('Type', data.typeActual)}`,
    `${field('Wealth', data.wealthLevel)}`,
    `${field('Vibe', data.wealthLevel)}`,
    `${field('Function', data.factionRankActual)}`,
    `${field('Insurance', data.insurance)}`,
    `${field('Network', data.networkName)}`,
    `${field('Subnetwork', data.subnetworkName)}`,
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

  // Accounts
  if (data.accounts.length)
    tableContent = `${tableContent}${printAccountTablePart(
      'Accounts',
      data.accounts,
    )}`;

  // Gigs
  if (data.gigs.length) {
    const createdGigs = data.gigs.filter((g) => g.authorId === data.id);
    const takenGigs = data.gigs.filter((g) => g.takenById === data.id);
    if (createdGigs.length)
      tableContent = `${tableContent}${printGigTablePart(
        'Authored gigs',
        createdGigs,
      )}`;
    if (createdGigs.length)
      tableContent = `${tableContent}${printGigTablePart(
        'Taken gigs',
        takenGigs,
      )}`;
  }

  if (tableContent)
    lines.push(`<table class="profile-table">${tableContent}</table>`);

  return lines;

  function printTablePart(title: string, children: EventType[]): string {
    return `<tr class="secondary-color table-title"><td colspan="5">${title}</td></tr> ${children
      .map(
        (event) =>
          `<tr>
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
        <td>${event.name}</td>
        <td><span class="accent-color">25.05.2077</span></td>
        <td></td>
        <td></td>
        </tr>`,
      )
      .join('')}`;
  }

  function printGigTablePart(title: string, gigs: any[]): string {
    return `<tr class="secondary-color table-title"><td colspan="5">${title}</td></tr> ${gigs
      .map(
        (gig) =>
          `<tr>
        <td>${gig.title}</td>
        <td><span>${gig.status}</span></td>
        <td>${gig.category}</td>
        <td>${gig.subcategory}</td>
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
        <td>${event.type}: ${event.accountNumber}</td>
        <td>Balance: <span class="secondary-color">${event.balance}</span></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>`,
      )
      .join('')}`;
  }
}
