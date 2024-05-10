import { ExploitType } from '../../data/types';
import {
  decryptingLines,
  decryptingSuccessLines,
} from '../../responseLines/runCommands';

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
  // const decryptingEffect = exploit.effect[subnetwork.operatingSystem];
  setInputDisabled(true);

  // function endDisabler() {
  //   addLines(decryptingSuccessLines);
  //   decryptSubnetwork();
  //   setInputDisabled(false);
  // }
  //
  // function stepDisabler(time) {
  //   if (time !== decryptingEffect.decryptingTime) removeLastLine();
  //   addLines([makeLoaderLine(time, decryptingEffect.decryptingTime)]);
  //   if (time === 0) removeLastLine();
  // }
}
