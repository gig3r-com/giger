import {
  connectingLines,
} from '../../responseLines/runCommands';
import { ExploitType } from '../../data/types';
import { ServerConnectionService } from '../../../services';

export type RunBreacherType = {
  isConnected: boolean;
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  exploit: ExploitType;
  subnetwork: any;
};
export function runBreacher({
  isConnected,
  addLines,
  exploit,
  subnetwork,
}: RunBreacherType) {
  if (isConnected)
    throw new Error(
      'Cannot connect while still connected to a subnetwork. Use END command to disconnect.',
    );
  addLines(connectingLines(subnetwork.name));
  ServerConnectionService.breach(exploit.name, subnetwork);
}
