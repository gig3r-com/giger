import { useState } from 'react';
import { gigerArt, } from '../../../../assets/gigerAsciArt';

type LineStatHandlerTypes = {
  prefixType: string,
};

export function lineStateHandler({ prefixType, }: LineStatHandlerTypes) {
  const [lines, setLines] = useState(gigerArt);
  const [userLines, setUserLines] = useState([]);

  const mapLines = (lines = []) => {
    const d = new Date();
    const datetext = d.toTimeString().split(' ')[0];
    return lines.map(line => `${prefixType}<span class="accent-color">(${datetext})</span> ${line}`);
  }
  const mapUserLine = (line = '') => {
    const d = new Date();
    const datetext = d.toTimeString().split(' ')[0];
    return `<span class="user-line">${prefixType}<span class="accent-color">(${datetext})</span> ${line}</span>`;
  }

  const addLine = (line) => {
    setLines(lines => [ ...lines, line]);
  }
  const addLines = (lines) => {
    setLines(oldLines => [ ...oldLines, ...mapLines(lines)]);
  }
  const addUserLine = (line) => {
    addLine(mapUserLine(line));
    setUserLines(lines => [ ...lines, line]);
  }
  const addError = (line) => {
    addLine(`<span class="error">${line}</span>`);
  }
  const removeLastLine = () => setLines(lines => {
    lines.pop();
    return [ ...lines ];
  });

  return { lines, setLines, userLines, setUserLines, addLines, addUserLine, addError, removeLastLine, };
}
