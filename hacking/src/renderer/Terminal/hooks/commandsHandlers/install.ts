import ApiService from '../../../apiService/apiService';
import {
  provideKeyLines,
  keyIncorrectLines,
  makeProgramAddedLines,
} from '../../responseLines/installCommands';

type UseInstallCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useInstallCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseInstallCommandsType) {
  const executeInstallCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      const programKey = parsedCommand[1];
      if (!programKey) {
        addLines(provideKeyLines);
        return;
      }
      const programToAdd = getProgramFromProgramKey(programKey);
      if (!programToAdd) {
        addLines(keyIncorrectLines);
        return;
      }
      addLines(makeProgramAddedLines(programToAdd));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeInstallCommand };

  function getProgramFromProgramKey(programKey: string) {
    return '';
  }
}
