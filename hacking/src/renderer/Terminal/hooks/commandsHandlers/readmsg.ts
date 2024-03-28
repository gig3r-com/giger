import ApiService from '../../../apiService/apiService';

type UseReadMsgCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useReadMsgCommands({ addLines, addError, }: UseReadMsgCommandsType) {
  const executeReadMsgCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeReadMsgCommand, };
}
