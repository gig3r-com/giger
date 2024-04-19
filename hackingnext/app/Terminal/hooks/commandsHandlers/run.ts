import ApiService from '../../../apiService/apiService';
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
  connectToSubnetwork: (subnetwork: SubnetworkType, timer: number) => void;
  decryptSubnetwork: () => void;
};

export default function useRunCommands({
  addLines,
  addErrors,
  removeLastLine,
  connectToSubnetwork,
  isConnected,
  decryptSubnetwork,
}: UseRunCommandsType) {
  const executeRunCommand = async (parsedCommand: string[]) => {
    try {
      const connectedSubnetwork = getConnectedSubnetworkData();
      const subnetworkName = getSubnetworkName(
        isConnected,
        parsedCommand[2],
        connectedSubnetwork,
      );
      const subnetwork = await ApiService.getSubnetworkById(subnetworkName);
      const exploit: ExploitType | undefined = getExploit(parsedCommand[1]);

      if (!subnetwork) return addErrors(subnetworkNotFound);
      if (!exploit) return addErrors(programNotFound);

      switch (exploit.type) {
        case 'breacher': {
          runBreacher({
            addLines,
            connectToSubnetwork,
            exploit,
            isConnected,
            removeLastLine,
            subnetwork,
          });
          break;
        }
        case 'decrypter': {
          runDecrypter({
            addLines,
            decryptSubnetwork,
            exploit,
            isConnected,
            removeLastLine,
            subnetwork,
          });
          break;
        }
        default: {
          addErrors(programNotFound);
        }
      }
    } catch (error: any) {
      addErrors(error);
    }
  };

  return { executeRunCommand };
}

function getSubnetworkName(isConnected: boolean, commandStatement: string, connectedSubnetwork: SubnetworkType | null) {
  if (isConnected && commandStatement === '.' && connectedSubnetwork) return connectedSubnetwork.name;
  return commandStatement;
}

function getExploit(programName: string) {
  return Object.values(EXPLOITS).find(
    (p) => p.name.toLowerCase() === programName,
  );
}
