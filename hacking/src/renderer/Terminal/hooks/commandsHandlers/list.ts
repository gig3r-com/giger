import ApiService from '../../../apiService/apiService';
import { LIST_COMMANDS, } from '../../data/commands';
import { getDecodedListCmdLines, getEncodedListCmdLines, getListProgramLines, getListCmdLines, } from '../../responseLines/listCommands';

type UseListCommandType = {
  addLines: ([string]) => void,
  addError: (string) => void,
  isConnected: boolean,
  isDecrypted: boolean,
  connectedSubnetwork: any,
};

export function useListCommands({ addLines, addError, isConnected, connectedSubnetwork, isDecrypted, }: UseListCommandType) {
  const executeListCommand = (parsedCommand) => {
    try {
      switch (parsedCommand[1]) {
        case (LIST_COMMANDS.CMD): {
          if (!isConnected) addLines(getListCmdLines());
          else if (isDecrypted) addLines(getDecodedListCmdLines());
          else addLines(getEncodedListCmdLines(connectedSubnetwork.system.encryptedCommands));
          break;
        }
        case (LIST_COMMANDS.PROG): {
          ApiService
            .getAvailablePrograms()
            .then((programs) => {
              addLines(getListProgramLines(programs));
            });
          break;
        }
      }
    } catch (error) {
      addError(error);
    }
  };

  return { executeListCommand, };
}
