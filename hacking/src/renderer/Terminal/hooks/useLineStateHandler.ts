import { useState } from 'react';
import { gigerArt } from '../data/gigerAsciArt';

type LineStatHandlerTypes = {
  prefixType: string;
};

export default function useLineStateHandler({
  prefixType,
}: LineStatHandlerTypes) {
  const [lines, setLines] = useState<any[]>(gigerArt);
  const [userLines, setUserLines] = useState<any[]>([]);

  const mapLines = (linesToMap: string[]) => {
    return linesToMap.map((line) => ` ${line}`);
  };
  const mapUserLine = (userLine: string) => {
    const d = new Date();
    const datetext = d.toTimeString().split(' ')[0];
    return `<span class="user-line">${prefixType}<span class="accent-color date"> ${datetext}</span> ${userLine}</span>`;
  };

  const addLine = (lineToAdd: string) => {
    setLines((oldLines) => [...oldLines, lineToAdd]);
  };
  const addLines = (linesToAdd: string[]) => {
    setTimeout(
      // @ts-ignore
      () => window.scroll(0, document.getElementById('root').clientHeight),
      10,
    );
    setLines((oldLines) => [...oldLines, ...mapLines(linesToAdd)]);
  };
  const addUserLine = (userLineToAdd: string) => {
    addLine(mapUserLine(userLineToAdd));
    setUserLines((oldUserLines) => [...oldUserLines, userLineToAdd]);
  };
  const addErrors = (errorLines: string[] | string | object) => {
    if (Array.isArray(errorLines)) {
      errorLines.forEach((line: string) => {
        addLine(`<span class="error">${line}</span>`);
      });
    } else if (typeof errorLines === 'string') {
      addLine(`<span class="error">${errorLines}</span>`);
    } else if (typeof errorLines?.message === 'string') {
      addLine(`<span class="error">${errorLines}</span>`);
    }
  };
  const removeLastLine = () =>{
    setLines((oldLines) => {
      oldLines.pop();
      return [...oldLines];
    });}

  return {
    lines,
    setLines,
    userLines,
    setUserLines,
    addLines,
    addUserLine,
    addErrors,
    removeLastLine,
  };
}
