import ApiService from '../../../apiService/apiService';
import {
  provideKeyLines,
  keyIncorrectLines,
  makeProgramAddedLines,
} from '../../responseLines/installCommands';
import { programInstallTable } from '../../data/exploits';

type UseInstallCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[]) => void;
};

export function useInstallCommands({
  addLines,
  addErrors,
}: UseInstallCommandsType) {
  const executeInstallCommand = async (parsedCommand: string[]): void => {
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

    addLines(makeProgramAddedLines(programToAdd.name));
  };

  return { executeInstallCommand };

  function getProgramFromProgramKey(programKey: string) {
    // Example: PRD-MCK-SECV-03-13-TRX
    // STAGE 3 and 4 MUST be numbers
    const keyArray = programKey.split('-');
    const programModulo = (Number(keyArray[3]) + Number(keyArray[4])) % 100;
    return programInstallTable[programModulo];
  }
}
