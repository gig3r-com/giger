import { ExploitType } from '../../data/types';
import {
  decryptingLines,
  decryptingSuccessLines,
} from '../../responseLines/runCommands';
import { addTimeline, makeLoaderLine } from '../../utils/timelines';

export type RunDecrypterType = {
  isConnected: boolean;
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  decryptSubnetwork: () => void;
  exploit: ExploitType;
  subnetwork: any;
};

export function runDecrypter({
  isConnected,
  addLines,
  removeLastLine,
  decryptSubnetwork,
  exploit,
  subnetwork,
}: RunDecrypterType) {
  if (!isConnected)
    throw new Error('Cannot decrypt while not connected to a subnetwork.');

  addLines(decryptingLines(subnetwork.name));
  const decryptingEffect = exploit.effect[subnetwork.system.name];

  addTimeline(decryptingEffect.decryptingTime, stepDecryption, endDecryption);

  function endDecryption() {
    addLines(decryptingSuccessLines);
    decryptSubnetwork();
  }

  function stepDecryption(time) {
    if (time !== decryptingEffect.decryptingTime) removeLastLine();
    addLines([makeLoaderLine(time, decryptingEffect.decryptingTime)]);
    if (time === 0) removeLastLine();
  }
}
