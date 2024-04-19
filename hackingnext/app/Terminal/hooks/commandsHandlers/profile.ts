import { getLoginUserData } from '../../utils/store';
import {
  getBaseProfileLines,
} from '../../responseLines/profileCommands';
import apiService from '../../../apiService/apiService';

type UseProfileCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[] | string) => void;
};

export function useProfileCommands({
  addLines,
  addErrors,
}: UseProfileCommandsType) {
  const executeProfileCommand = async (parsedCommand: string[]) => {
    const userId = parsedCommand[1];

    if (userId === '.') {
      const loginUserData = getLoginUserData();
      if (!loginUserData) return addErrors('No login user');
      addLines(getBaseProfileLines(loginUserData));
    } else {
      const profile = await apiService.getUserProfile(userId);
      addLines(getBaseProfileLines(profile));
    }
  };

  return { executeProfileCommand };
}
