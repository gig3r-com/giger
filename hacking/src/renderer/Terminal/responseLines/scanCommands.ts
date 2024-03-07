export function getUserDataLines(data) {
  const lines = [];
  Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === 'string') lines.push(`<span class="secondary-color">${key}</span> ${data[key]}`);
    if (data[key] && typeof data[key] === 'object') lines.push(`<span class="secondary-color">${key}</span> ${data[key].name}`);
  });
  return lines;
}

export function getSubnetworkDataLines(data) {
  const lines = [];
  Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === 'string') lines.push(`<span class="secondary-color">${key}</span> ${data[key]}`);
    if (data[key] && typeof data[key] === 'object') lines.push(`<span class="secondary-color">${key}</span> ${data[key].name}`);
  });
  return lines;
}
