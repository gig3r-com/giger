import ApiService from '../../../apiService/apiService';

type UseBalanceCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useBalanceCommands({ addLines, addError, }: UseBalanceCommandsType) {
  const executeBalanceCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeBalanceCommand, };
}
