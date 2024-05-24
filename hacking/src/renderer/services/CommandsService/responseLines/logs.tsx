import { onlyTab } from './utils';
import { getLoginUserData } from '../../../Terminal/utils/store';

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
  const { type, time, sourceUserName, targetUserName, data, sourceUserId } =
    log;
  if (type === 'SUBNETWORK_HACKED') return getHackLogTableLine(log);
  if (type === 'SUBNETWORK_SECURITY_BREACH')
    return getSecurityBreachLogTableLine(log);

  return (
    `<tr>` +
    `<td>${type}</td>` +
    `<td class="accent-color">${time}</td>` +
    `<td>Source ID: ${onlyTab(sourceUserId)}</td>` +
    `<td>Source: ${onlyTab(sourceUserName)}</td>` +
    `<td>Target: ${onlyTab(targetUserName)}</td>` +
    `<td>${data}</td>` +
    `</tr>`
  );
}

export function getSecurityBreachLogTableLine(log) {
  const { type, time, sourceHackerName, targetUserName, data, sourceUserId } =
    log;
  const { scannerLvl, isRevealed } = JSON.parse(data);
  const loggerScannerLvl = getScannerLvl();
  const showHiddenData = isRevealed ? true : loggerScannerLvl >= scannerLvl;

  return (
    `<tr>` +
    `<td>${type}</td>` +
    `<td class="accent-color">${time}</td>` +
    `<td class=${showHiddenData ? 'secondary-color' : ''}>Source ID: ${
      showHiddenData
        ? onlyTab(sourceUserId)
        : `<span class="disabled-color">??#C!ORRUPT&$ED_DA#&TA_C#ANT_SH*OW!!</span>`
    }</td>` +
    `<td>Source: ${onlyTab(sourceHackerName)}</td>` +
    `<td>Target: ${
      targetUserName
        ? onlyTab(targetUserName)
        : `<span class="disabled-color">null</span>`
    }</td>` +
    `<td>${
      showHiddenData
        ? `<span class="secondary-color">Scanning seccefull - full data avaiable</span>`
        : ''
    }</td>` +
    `</tr>`
  );
}

export function getHackLogTableLine(log) {
  const { type, time, sourceHackerName, targetUserName, data } = log;
  const { additionalData } = JSON.parse(data);
  return (
    `<tr>` +
    `<td>${type}</td>` +
    `<td class="accent-color">${time}</td>` +
    `<td>Source ID: <span class="disabled-color">??#C!ORRUPT&$ED_DA#&TA_C#ANT_SH*OW!!</span></td>` +
    `<td>Source: ${onlyTab(sourceHackerName)}</td>` +
    `<td>Target: ${
      targetUserName
        ? onlyTab(targetUserName)
        : `<span class="disabled-color">null</span>`
    }</td>` +
    `<td>${additionalData || ''}</td>` +
    `</tr>`
  );
}

export function getScannerLvl() {
  const loginUserData = getLoginUserData();
  if (loginUserData.exploits.includes('SCANNER3')) return 3;
  if (loginUserData.exploits.includes('SCANNER2')) return 2;
  if (loginUserData.exploits.includes('SCANNER1')) return 1;
  return 0;
}
