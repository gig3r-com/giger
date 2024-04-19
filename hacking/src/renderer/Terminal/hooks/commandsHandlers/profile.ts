import { getLoginUserData } from '../../utils/store';
import { getBaseProfileLines } from '../../responseLines/profileCommands';
import apiService from '../../../apiService/apiService';

type UseProfileCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useProfileCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseProfileCommandsType) {
  const executeProfileCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      const userId =
        parsedCommand[1] === '.' ? getLoginUserData()?.id : parsedCommand[1];
      if (!userId) throw new Error('NO ID'); // todo: error msg
      const profile = await apiService.getUserProfile(userId);
      addLines(getBaseProfileLines(profile));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeProfileCommand };
}
