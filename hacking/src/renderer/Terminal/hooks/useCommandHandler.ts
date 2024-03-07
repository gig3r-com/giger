import { MAIN_COMMANDS } from '../data/commands';
import {
  useListCommands,
  useScanCommands,
  useRunCommands,
  useTransferCommands,
  useSendMsgCommands,
  useReadMsgCommands,
  useReadDataCommands,
  useProfileCommands,
  useLogCommands,
  useCopyDataCommands,
  useBalanceCommands,
} from './commandsHandlers';

type OnCommandHandleType = {
  setLines: (line: string) => void;
  addError: (line: string) => void;
  addLines: (lines: []) => void;
  removeLastLine: () => void;
  connectToSubnetwork: () => void;
  isConnected: boolean;
  connectedSubnetwork: {};
  isDecrypted: boolean;
  decryptSubnetwork: () => void;
  disconnectFromSubnetwork: () => void;
};
export default function useCommandHandler(props: OnCommandHandleType) {
  const {
    setLines,
    addError,
    addLines,
    removeLastLine,
    connectToSubnetwork,
    isConnected,
    connectedSubnetwork,
    isDecrypted,
    decryptSubnetwork,
    disconnectFromSubnetwork,
  } = props;
  const { executeListCommand } = useListCommands({
    addLines,
    addError,
    isConnected,
    isDecrypted,
    connectedSubnetwork,
  });
  const { executeScanCommand } = useScanCommands({ addLines, addError });
  const { executeRunCommand } = useRunCommands({
    addLines,
    addError,
    removeLastLine,
    connectToSubnetwork,
    isConnected,
    connectedSubnetwork,
    decryptSubnetwork,
  });
  const { executeTransferCommand } = useTransferCommands({
    addLines,
    addError,
  });
  const { executeSendMsgCommand } = useSendMsgCommands({ addLines, addError });
  const { executeReadMsgCommand } = useReadMsgCommands({ addLines, addError });
  const { executeReadDataCommand } = useReadDataCommands({
    addLines,
    addError,
  });
  const { executeProfileCommand } = useProfileCommands({ addLines, addError });
  const { executeLogCommand } = useLogCommands({ addLines, addError });
  const { executeCopyDataCommand } = useCopyDataCommands({
    addLines,
    addError,
  });
  const { executeBalanceCommand } = useBalanceCommands({ addLines, addError });

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
        return addLines(['Command unknown']);
    }
  };

  return { executeCommand };
}
