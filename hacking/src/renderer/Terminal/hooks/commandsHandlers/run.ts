import ApiService from '../../../apiService/apiService';
import * as EXPLOITS from '../../data/exploits';
import { ExploitType, SubnetworkType } from '../../data/types';
import { runBreacher } from './runBreacher';
import { runDecrypter } from './runDecrypter';
import {
  programNotFound,
  subnetworkNotFound,
} from '../../responseLines/errors';

export type UseRunCommandsType = {
  isConnected: boolean;
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[]) => void;
  removeLastLine: () => void;
  connectToSubnetwork: (subnetwork: SubnetworkType, timer: number) => void;
  connectedSubnetwork: any;
  decryptSubnetwork: () => void;
};

export default function useRunCommands({
  addLines,
  addErrors,
  removeLastLine,
  connectToSubnetwork,
  isConnected,
  connectedSubnetwork,
  decryptSubnetwork,
}: UseRunCommandsType) {
  const executeRunCommand = async (parsedCommand: string[]) => {
    try {
      const subnetworkName = getSubnetworkName(
        isConnected,
        parsedCommand[1],
        connectedSubnetwork,
      );
      const { data } = await ApiService.getSubnetworkById(subnetworkName);
      const exploit: ExploitType | undefined = getExploit(parsedCommand);

      if (!data) return addErrors(subnetworkNotFound);
      if (!exploit) return addErrors(programNotFound);

      switch (exploit.type) {
        case 'breacher': {
          runBreacher({
            addLines,
            connectToSubnetwork,
            exploit,
            isConnected,
            removeLastLine,
            subnetwork: data,
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
            subnetwork: data,
          });
          break;
        }
        default: {
          throw new Error(programNotFound);
        }
      }
    } catch (error) {
      addErrors(error)
    }
  };

  return { executeRunCommand };
}

function getSubnetworkName(isConnected, commandStatement, connectedSubnetwork) {
  if (isConnected && commandStatement === '.') return connectedSubnetwork.name;
  return commandStatement;
}

function getExploit(parsedCommand) {
  parsedCommand.shift();
  parsedCommand.shift();
  const programName = parsedCommand.join(' ').toLowerCase();
  return Object.values(EXPLOITS).find(
    (p) => p.name.toLowerCase() === programName,
  );
}
