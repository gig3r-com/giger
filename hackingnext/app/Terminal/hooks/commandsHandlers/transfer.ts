import ApiService from '../../../apiService/apiService';

type UseTransferCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useTransferCommands({ addLines, addError, }: UseTransferCommandsType) {
  const executeTransferCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeTransferCommand, };
}
