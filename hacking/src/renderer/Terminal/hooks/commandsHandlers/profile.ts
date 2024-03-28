import ApiService from '../../../apiService/apiService';

type UseProfileCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[]) => void;
};

export function useProfileCommands({
  addLines,
  addErrors,
}: UseProfileCommandsType) {
  const executeProfileCommand = async (parsedCommand: string[]): void => {
    parsedCommand.shift();
    const subcommand = parsedCommand.join(' ');
    addLines(['Not Implemented Yet']);
  };

  return { executeProfileCommand };
}
