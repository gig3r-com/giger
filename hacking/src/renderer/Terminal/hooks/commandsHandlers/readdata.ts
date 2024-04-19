import { getLoginUserData } from '../../utils/store';
import apiService from '../../../apiService/apiService';
import { getEventProfileLines } from '../../responseLines/profileCommands';
import { ProfileType } from '../../../apiService/types';

type UseReadDataCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useReadDataCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseReadDataCommandsType) {
  const executeReadDataCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      const userId = parsedCommand[1];
      const eventId = parsedCommand[2];
      if (userId === '.') {
        const loginUserData = getLoginUserData();
        if (!loginUserData) return addErrors('No login user');
        printEvent(loginUserData, eventId);
      } else {
        const profile = await apiService.getUserProfile(userId);
        printEvent(profile, eventId);
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeReadDataCommand };

  function printEvent(profileData: ProfileType, eventId: string) {
    let foundEvent;
    profileData.medicalEvents.forEach((event) => {
      if (event.id === eventId) foundEvent = event;
    });
    profileData.criminalEvents.forEach((event) => {
      if (event.id === eventId) foundEvent = event;
    });
    profileData.privateRecords.forEach((event) => {
      if (event.id === eventId) foundEvent = event;
    });

    if (foundEvent) addLines(getEventProfileLines(foundEvent));
  }
}
