import ApiService from '../../../apiService/apiService';

type UseCopyDataCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useCopyDataCommands({ addLines, addError, }: UseCopyDataCommandsType) {
  const executeCopyDataCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeCopyDataCommand, };
}
