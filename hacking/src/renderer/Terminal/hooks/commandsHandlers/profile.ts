import { getLoginUserData } from '../../utils/store';
import { getBaseProfileLines } from '../../responseLines/profileCommands';
import {ApiService, ServerConnectionService} from '../../../services';

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
      const profile = await ApiService.getUserProfile(userId);
      addLines(getBaseProfileLines(profile));
      ServerConnectionService.speedConnection(100);
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeProfileCommand };
}
