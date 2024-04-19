import { ExploitType } from '../../data/types';
import {
  decryptingLines,
  decryptingSuccessLines,
} from '../../responseLines/runCommands';
import * as PROGRAMS from '../../data/programs';
import * as EXPLOITS from '../../data/exploits';
import { addTimeline, makeLoaderLine } from '../../utils/timelines';

export type RunDecrypterType = {
  isConnected: boolean;
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  decryptSubnetwork: () => void;
  exploit: ExploitType;
  subnetwork: any;
  setInputDisabled: (value: boolean) => void;
};

export function runDecrypter({
  isConnected,
  addLines,
  removeLastLine,
  decryptSubnetwork,
  exploit,
  subnetwork,
                               setInputDisabled,
}: RunDecrypterType) {
  if (!isConnected) throw new Error('Need to be connected');
  addLines(decryptingLines(exploit));
  const decryptingEffect = exploit.effect[subnetwork.operatingSystem];
  setInputDisabled(true);
  console.log('now')
  addTimeline(decryptingEffect.decryptingTime, stepDecryption, endDecryption);

  function endDecryption() {
    addLines(decryptingSuccessLines);
    decryptSubnetwork();
    setInputDisabled(false);
  }

  function stepDecryption(time) {
    if (time !== decryptingEffect.decryptingTime) removeLastLine();
    addLines([makeLoaderLine(time, decryptingEffect.decryptingTime)]);
    if (time === 0) removeLastLine();
  }
}
