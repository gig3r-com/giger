import { MAIN_COMMANDS } from '../data/commands';
import { ApiService, ServerConnectionService } from '../../services';
import {
  useTransferCommands,
  useSendMsgCommands,
  useReadMsgCommands,
  useReadDataCommands,
  useProfileCommands,
  useLogCommands,
  useCopyDataCommands,
  useBalanceCommands,
} from './commandsHandlers';
import useListCommands from './commandsHandlers/list';
import useScanCommands from './commandsHandlers/scan';
import useRunCommands from './commandsHandlers/run';
import { unknownCommand } from '../responseLines/errors';

type OnCommandHandleType = {
  setLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  isConnected: boolean;
  isDecrypted: boolean;
  decryptSubnetwork: () => void;
  disconnectFromSubnetwork: () => void;
  setInputDisabled: (inputDisabled: boolean) => void;
  logout: () => void;
  toggleDebugMode: (debugModeOn: boolean) => void;
  refreshPrefix: () => void;
  isLoggedIn: boolean;
};

export default function useCommandHandler(props: OnCommandHandleType) {
  const {
    setLines,
    addErrors,
    addLines,
    removeLastLine,
    isConnected,
    isDecrypted,
    decryptSubnetwork,
    disconnectFromSubnetwork,
    setInputDisabled,
    logout,
    toggleDebugMode,
    refreshPrefix,
  } = props;

  /*
   * List commands
   */
  const { executeListCommand } = useListCommands({
    addLines,
    addErrors,
    isConnected,
    isDecrypted,
    setInputDisabled,
  });

  /*
   * Scan commands
   */
  const { executeScanCommand } = useScanCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });

  /*
   * Run commands
   */
  const { executeRunCommand } = useRunCommands({
    addLines,
    addErrors,
    removeLastLine,
    isConnected,
    decryptSubnetwork,
    setInputDisabled,
  });
  const { executeTransferCommand } = useTransferCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });
  const { executeSendMsgCommand } = useSendMsgCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });
  const { executeReadMsgCommand } = useReadMsgCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });

  /*
   * Read data commands
   */
  const { executeReadDataCommand } = useReadDataCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });

  /*
   * Profile commands
   */
  const { executeProfileCommand } = useProfileCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });
  const { executeLogCommand } = useLogCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });

  /*
   * Read data commands
   */
  const { executeCopyDataCommand } = useCopyDataCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });
  const { executeBalanceCommand } = useBalanceCommands({
    addLines,
    addErrors,
    setInputDisabled,
  });

  // eslint-disable-next-line consistent-return
  const executeCommand = (command: string) => {
    const parsedCommand = command.toLowerCase().split(' ');
    const mainCommand = parsedCommand[0];
    switch (mainCommand) {
      // case MAIN_COMMANDS.CLEAR:
      //   return setLines([]);
      // case MAIN_COMMANDS.END: {
      //   ServerConnectionService.disconnect();
      //   break;
      // }
      // case MAIN_COMMANDS.NAME:
      //   setInputDisabled(true);
      //   return ApiService.changeActiveUserHackingName(parsedCommand[1]).then(
      //     (newHackerName) => {
      //       setInputDisabled(false);
      //       addLines([newHackerName.hackerName]);
      //       refreshPrefix();
      //     },
      //   );
      // case MAIN_COMMANDS.LOOGUT:
      //   return logout();
      // case MAIN_COMMANDS.PROFILE:
      //   return executeProfileCommand(parsedCommand);
      // case MAIN_COMMANDS.LIST:
      //   return executeListCommand(parsedCommand);
      // case MAIN_COMMANDS.SCAN:
      //   return executeScanCommand(parsedCommand);
      // case MAIN_COMMANDS.RUN:
      //   return executeRunCommand(parsedCommand);
      case MAIN_COMMANDS.BALANCE:
        return executeBalanceCommand(parsedCommand);
      case MAIN_COMMANDS.TRANSFER:
        return executeTransferCommand(parsedCommand);
      case MAIN_COMMANDS.READMSG:
        return executeReadMsgCommand(parsedCommand);
      case MAIN_COMMANDS.SENDMSG:
        return executeSendMsgCommand(parsedCommand);
      case MAIN_COMMANDS.READDATA:
        return executeReadDataCommand(parsedCommand);
      case MAIN_COMMANDS.COPYDATA:
        return executeCopyDataCommand(parsedCommand);
      case MAIN_COMMANDS.LOG:
        return executeLogCommand(parsedCommand);
      case 'hedinon':
        toggleDebugMode(true);
        break;
      case 'hedinoff':
        toggleDebugMode(false);
        break;
      default:
        return addErrors(unknownCommand);
    }
  };

  return { executeCommand };
}
