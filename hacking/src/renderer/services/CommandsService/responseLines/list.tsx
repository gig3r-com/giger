export const getListLines = (list = []) => {
  const lines = [`<table class="list-table"><tbody>`];

  list.forEach(
    (command) =>
      lines.push(`<tr><td class="command-cell"><span class="secondary-color">${command.title}</span></td><td>${command.description}</td></tr>`),
  );

  lines.push(`</tbody></table>`);
  return [lines.join('')];
};
