export function addTimeline(time: number, stepCallback: (number) => void, endCallback: () => void) {
  const interval = setInterval(() => {
    stepCallback && stepCallback(time);
    time-- || (clearInterval(interval), endCallback());
  }, 10);
}

export function makeLoaderLine(value, maxValue) {
  const lineLength = 100;
  const loaderLine = [];
  const percentReady = (1 - value / maxValue) * lineLength;
  for (let i = 0; i < lineLength; i++) {
    if (i <= percentReady) loaderLine.push('#');
    else loaderLine.push('-');
  }
  return loaderLine.join('');
}
