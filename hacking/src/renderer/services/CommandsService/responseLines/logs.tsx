export function getLogsMessage(logs): string[] {
  const lines = [
    // `Subnetwork ${logs[0].subnetworkName} logs:`
    `<table><tbody>`,
  ];
  logs.forEach((log) => {
    lines.push(getLogTableLine(log));
  });
  lines.push(`</tbody></table>`);
  return lines;
}

export function getLogTableLine(log) {
  return `<tr><td>${log.type}</td><td class="accent-color-2">${log.time}</td><td>${log.sourceHackerName}</td></tr>`;
}
