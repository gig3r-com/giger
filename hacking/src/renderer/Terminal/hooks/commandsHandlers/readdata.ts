import ApiService from '../../../apiService/apiService';

type UseReadDataCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useReadDataCommands({ addLines, addError, }: UseReadDataCommandsType) {
  const executeReadDataCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeReadDataCommand, };
}
