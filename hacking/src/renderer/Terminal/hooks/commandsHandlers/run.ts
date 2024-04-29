import { ApiService } from '../../../services';
import * as EXPLOITS from '../../data/exploits';
import { ExploitType, SubnetworkType } from '../../data/types';
import { runBreacher } from './runBreacher';
import { runDecrypter } from './runDecrypter';
import {
  programNotFound,
  subnetworkNotFound,
} from '../../responseLines/errors';
import { getConnectedSubnetworkData } from '../../utils/store';

export type UseRunCommandsType = {
  isConnected: boolean;
  addLines: (lines: string[]) => void;
  addErrors: (lines: string | string[]) => void;
  removeLastLine: () => void;
  decryptSubnetwork: () => void;
  setInputDisabled: (value: boolean) => void;
};

export default function useRunCommands({
  addLines,
  addErrors,
  removeLastLine,
  isConnected,
  decryptSubnetwork,
  setInputDisabled,
}: UseRunCommandsType) {
  const executeRunCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      const exploit: ExploitType | undefined = getExploit(parsedCommand[1]);

      if (!exploit) return addErrors(programNotFound);

      switch (exploit.type) {
        case 'breacher': {
          const subnetworkId = getSubnetworkId(isConnected, parsedCommand[2]);
          const subnetwork = await ApiService.getSubnetworkById(subnetworkId);
          if (!subnetwork) return addErrors(subnetworkNotFound);
          runBreacher({
            addLines,
            exploit,
            isConnected,
            removeLastLine,
            subnetwork,
          });
          break;
        }
        case 'decrypter': {
          const subnetworkId = getSubnetworkId(isConnected, parsedCommand[2]);
          const subnetwork = await ApiService.getSubnetworkById(subnetworkId);
          if (!subnetwork) return addErrors(subnetworkNotFound);
          runDecrypter({
            addLines,
            exploit,
            isConnected,
            removeLastLine,
            subnetwork,
            setInputDisabled,
          });
          break;
        }
        case 'monitor': {
          console.log('MON');
          break;
        }
        default: {
          addErrors(programNotFound);
        }
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addErrors(String(err));
    }
  };

  return { executeRunCommand };
}

function getSubnetworkId(isConnected: boolean, commandStatement: string) {
  const connectedSubnetwork = getConnectedSubnetworkData();
  if (isConnected && commandStatement === '.' && connectedSubnetwork)
    return connectedSubnetwork?.id;
  return commandStatement;
}

function getExploit(programName: string) {
  return Object.values(EXPLOITS).find(
    (p) => p.name.toLowerCase() === programName,
  );
}
