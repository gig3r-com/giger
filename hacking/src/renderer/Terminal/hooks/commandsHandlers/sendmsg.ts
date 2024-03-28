import ApiService from '../../../apiService/apiService';

type UseSendMsgCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useSendMsgCommands({ addLines, addError, }: UseSendMsgCommandsType) {
  const executeSendMsgCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeSendMsgCommand, };
}
