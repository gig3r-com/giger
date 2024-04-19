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
  setInputDisabled: (value: boolean) => void;
};

export default function useRunCommands({
  addLines,
  addErrors,
  removeLastLine,
  connectToSubnetwork,
  isConnected,
  decryptSubnetwork,
  setInputDisabled,
}: UseRunCommandsType) {
  const executeRunCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      const subnetworkId = getSubnetworkId(isConnected, parsedCommand[2]);
      const subnetwork = await ApiService.getSubnetworkById(subnetworkId);
      const exploit: ExploitType | undefined = getExploit(parsedCommand[1]);

      if (!exploit) return addErrors(programNotFound);
      if (!subnetwork) return addErrors(subnetworkNotFound);

      const runProgramProps = {
        addLines,
        exploit,
        isConnected,
        removeLastLine,
        subnetwork,
        setInputDisabled,
      };

      switch (exploit.type) {
        case 'breacher': {
          runBreacher({ connectToSubnetwork, ...runProgramProps });
          break;
        }
        case 'decrypter': {
          runDecrypter({ decryptSubnetwork, ...runProgramProps });
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
