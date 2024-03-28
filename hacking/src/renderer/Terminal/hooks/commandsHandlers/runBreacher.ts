import {
  connectingFailedLines,
  connectingLines,
  connectingSuccessLines,
} from '../../responseLines/runCommands';
import { addTimeline, makeLoaderLine } from '../../utils/timelines';
import { ExploitType, SubnetworkType } from '../../data/types';

export type RunBreacherType = {
  isConnected: boolean;
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  connectToSubnetwork: (subnetwork: SubnetworkType, timer: number) => void;
  exploit: ExploitType;
  subnetwork: any;
};
export function runBreacher({
  isConnected,
  addLines,
  removeLastLine,
  connectToSubnetwork,
  exploit,
  subnetwork,
}: RunBreacherType) {
  if (isConnected)
    throw new Error(
      'Cannot connect while still connected to a subnetwork. Use END command to disconnect.',
    );
  addLines(connectingLines(subnetwork.name));
  const breachTime = 200;
  const breachEffect = exploit.effect[subnetwork.firewall.name];
  const timeInSubnetwork = breachEffect.perfect
    ? subnetwork.system.timeOnPerfectBreach
    : subnetwork.system.timeOnImperfectBreach;

  addTimeline(breachTime, stepBreach, endBreach);

  function endBreach() {
    if (!breachEffect.isConnected) {
      addLines(connectingFailedLines);
    } else {
      addLines(connectingSuccessLines);
      connectToSubnetwork(subnetwork, timeInSubnetwork);
    }
  }

  function stepBreach(time) {
    if (time !== breachTime) removeLastLine();
    addLines([makeLoaderLine(time, breachTime)]);
    if (time === 0) removeLastLine();
  }
}
