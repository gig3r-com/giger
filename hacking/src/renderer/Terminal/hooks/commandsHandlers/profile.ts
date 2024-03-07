import ApiService from '../../../apiService/apiService';

type UseProfileCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useProfileCommands({ addLines, addError, }: UseProfileCommandsType) {
  const executeProfileCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      throw new Error('Not implemented: ' + subcommand);

    } catch (error) {
      addError(error);
    }
  };

  return { executeProfileCommand, };
}
