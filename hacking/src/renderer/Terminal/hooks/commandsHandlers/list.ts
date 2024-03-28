import ApiService from '../../../apiService/apiService';
import { LIST_COMMANDS } from '../../data/commands';
import {
  getDecodedListCmdLines,
  getEncodedListCmdLines,
  getListProgramLines,
  getListCmdLines,
} from '../../responseLines/listCommands';
import { unknownCommand } from '../../responseLines/errors';

type UseListCommandType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[]) => void;
  isConnected: boolean;
  isDecrypted: boolean;
  connectedSubnetwork: any;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function useListCommands({
  addLines,
  addErrors,
  isConnected,
  connectedSubnetwork,
  isDecrypted,
  setInputDisabled,
}: UseListCommandType) {
  const executeListCommand = (parsedCommand: string[]): void => {
    try {
      switch (parsedCommand[1]) {
        case LIST_COMMANDS.CMD: {
          if (!isConnected) addLines(getListCmdLines());
          else if (isDecrypted) addLines(getDecodedListCmdLines());
          else
            addLines(
              getEncodedListCmdLines(
                connectedSubnetwork.system.encryptedCommands,
              ),
            );
          break;
        }
        case LIST_COMMANDS.PROG: {
          setInputDisabled(true);
          ApiService.getAvailablePrograms().then((programs) => {
            setInputDisabled(false);
            addLines(getListProgramLines(programs));
          });
          break;
        }
        default: {
          addErrors(unknownCommand);
        }
      }
    } catch (error: any) {
      addErrors(error);
    }
  };

  return { executeListCommand };
}
