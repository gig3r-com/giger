import { onlyTab } from './utils';

export function getLogsMessage(logs: any[]): string[] {
  const lines = [
    `Subnetwork <span class="secondary-color">${logs[0].subnetworkName}</span> logs:`,
  ];
  let table = '<table class="log-table"><tbody>';
  logs.forEach((log) => {
    table += getLogTableLine(log);
  });
  table += `</tbody></table>`;
  lines.push(table);
  return lines;
}

export function getLogTableLine(log) {
  return `<tr><td>${log.type}</td><td class="accent-color">${
    log.time
  }</td><td>Source: ${onlyTab(log.sourceUserName)}</td></tr>`;
}
