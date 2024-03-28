import { MAIN_COMMANDS } from '../data/commands';
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
  addErrors: (line: string[]) => void;
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  connectToSubnetwork: () => void;
  isConnected: boolean;
  connectedSubnetwork: {};
  isDecrypted: boolean;
  decryptSubnetwork: () => void;
  disconnectFromSubnetwork: () => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function useCommandHandler(props: OnCommandHandleType) {
  const {
    setLines,
    addErrors,
    addLines,
    removeLastLine,
    connectToSubnetwork,
    isConnected,
    connectedSubnetwork,
    isDecrypted,
    decryptSubnetwork,
    disconnectFromSubnetwork,
    setInputDisabled,
  } = props;

  /*
   * List commands
   */
  const { executeListCommand } = useListCommands({
    addLines,
    addErrors,
    isConnected,
    isDecrypted,
    connectedSubnetwork,
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
    connectToSubnetwork,
    isConnected,
    connectedSubnetwork,
    decryptSubnetwork,
  });
  const { executeTransferCommand } = useTransferCommands({
    addLines,
    addErrors,
  });
  const { executeSendMsgCommand } = useSendMsgCommands({ addLines, addErrors });
  const { executeReadMsgCommand } = useReadMsgCommands({ addLines, addErrors });
  const { executeReadDataCommand } = useReadDataCommands({
    addLines,
    addErrors,
  });
  const { executeProfileCommand } = useProfileCommands({ addLines, addErrors });
  const { executeLogCommand } = useLogCommands({ addLines, addErrors });
  const { executeCopyDataCommand } = useCopyDataCommands({
    addLines,
    addErrors,
  });
  const { executeBalanceCommand } = useBalanceCommands({ addLines, addErrors });

  const executeCommand = (command: string) => {
    const parsedCommand = command.toLowerCase().split(' ');
    const mainCommand = parsedCommand[0];

    switch (mainCommand) {
      case MAIN_COMMANDS.CLEAR:
        return setLines([]);
      case MAIN_COMMANDS.END:
        return disconnectFromSubnetwork();
      case MAIN_COMMANDS.PROFILE:
        return executeProfileCommand(parsedCommand);
      case MAIN_COMMANDS.LIST:
        return executeListCommand(parsedCommand);
      case MAIN_COMMANDS.SCAN:
        return executeScanCommand(parsedCommand);
      case MAIN_COMMANDS.RUN:
        return executeRunCommand(parsedCommand);
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
      default:
        return addErrors(unknownCommand);
    }
  };

  return { executeCommand };
}
