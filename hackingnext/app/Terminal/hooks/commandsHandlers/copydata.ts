import ApiService from '../../../apiService/apiService';
import {getLoginUserData} from "../../utils/store";
import apiService from "../../../apiService/apiService";
import {ProfileType} from "../../../apiService/types";
import {getEventProfileLines} from "../../responseLines/profileCommands";

type UseCopyDataCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (error: string | string[]) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
}

export function useCopyDataCommands({ addLines, addErrors, setInputDisabled }: UseCopyDataCommandsType) {
  const executeCopyDataCommand = async (parsedCommand: string[]) => {
    const userId = parsedCommand[1];
    const eventId = parsedCommand[2];

    setInputDisabled(true);
    if (userId === '.') {
      return addErrors('Cant copy from your own profile');
    } else {
      const profile = await apiService.getUserProfile(userId);
      const event = getEvent(profile, eventId);
      await apiService.addRecordToLoginUser(event);
      console.log(event);
    }

    setInputDisabled(false);
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
