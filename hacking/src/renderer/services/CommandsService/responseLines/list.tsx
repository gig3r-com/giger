export const getListLines = (
  list: string[] = [],
  encryptedList: string[] = [],
) => {
  const lines = [`<table class="list-table"><tbody>`];

  list.forEach((command) => {
    const isEncrypted = encryptedList.includes(command.disableCode);
    lines.push(
      `<tr><td class="command-cell"><span class="${
        isEncrypted ? 'disabled-color' : 'secondary-color'
      }">${command.title}</span></td><td class="${
        isEncrypted ? 'disabled-color' : ''
      }">${isEncrypted ? 'COMMAND ENCRYPTED' : command.description}</td></tr>`,
    );
  });

  lines.push(`</tbody></table>`);
  return [lines.join('')];
};
