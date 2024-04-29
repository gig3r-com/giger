import { ApiService } from '../../../services';
import { LIST_COMMANDS } from '../../data/commands';
import {
  getDecodedListCmdLines,
  getEncodedListCmdLines,
  getListProgramLines,
  getListCmdLines,
} from '../../responseLines/listCommands';
import { unknownCommand } from '../../responseLines/errors';
import * as PROGRAMS from '../../data/programs';
import { getConnectedSubnetworkData } from '../../utils/store';

type UseListCommandType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  isConnected: boolean;
  isDecrypted: boolean;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function useListCommands({
  addLines,
  addErrors,
  isConnected,
  isDecrypted,
  setInputDisabled,
}: UseListCommandType) {
  const executeListCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      switch (parsedCommand[1]) {
        case LIST_COMMANDS.CMD: {
          if (!isConnected) addLines(getListCmdLines());
          else if (isDecrypted) addLines(getDecodedListCmdLines());
          else {
            const connectedSubnetwork = getConnectedSubnetworkData();
            // @ts-ignore
            const system = PROGRAMS[connectedSubnetwork.operatingSystem];
            addLines(getEncodedListCmdLines(system.encryptedCommands));
          }
          break;
        }
        case LIST_COMMANDS.PROG: {
          ApiService.getAvailablePrograms().then((programs) => {
            addLines(getListProgramLines(programs));
          });
          break;
        }
        default: {
          addErrors(unknownCommand);
        }
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeListCommand };
}
