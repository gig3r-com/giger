import ApiService from '../../../apiService/apiService';

type UseLogCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useLogCommands({ addLines, addError, }: UseLogCommandsType) {
  const executeLogCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeLogCommand, };
}
