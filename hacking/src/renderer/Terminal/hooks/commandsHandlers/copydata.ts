import { ApiService } from '../../../services';
import { ProfileType } from '../../../types';

type UseCopyDataCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useCopyDataCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseCopyDataCommandsType) {
  const executeCopyDataCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      const userId = parsedCommand[1];
      const eventId = parsedCommand[2];
      if (userId === '.') {
        throw 'Cant copy from your own profile';
      } else {
        const profile = await ApiService.getUserProfile(userId);
        const event = getEvent(profile, eventId);
        await ApiService.addRecordToLoginUser(event);
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeCopyDataCommand };

  function getEvent(profileData: ProfileType, eventId: string) {
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

    return foundEvent;
  }
}
