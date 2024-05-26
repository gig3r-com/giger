import type CommandsServiceType from '../CommandsService';
import { getLoginUserData } from '../../../Terminal/utils/store';
import {
  getBaseProfileLines,
  getEventProfileLines,
} from '../responseLines/profile';
import {
  getErrorMessage,
  noProfileError,
  evenrNotFound,
} from '../responseLines/errors';
import { ProfileType } from '../../../types';

export default class Profile {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      setInputDisabled,
      parsedCommand,
      addLines,
      fireInitError,
      ServerConnectionService,
      getProfile,
    } = this.Service;
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return;
    }
    try {
      setInputDisabled(true);
      const eventId = parsedCommand[1];
      const profile = await getProfile();

      if (!profile) {
        addLines(noProfileError);
        setInputDisabled(false);
        return;
      }

      if (eventId) {
        this.printEvent(profile, eventId);
      } else {
        this.printProfile(profile);
      }

      ServerConnectionService.speedConnection(100);
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }

  printProfile(profile: ProfileType) {
    const { addLines, fireInitError } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    addLines(getBaseProfileLines(profile));
  }

  printEvent(profile: ProfileType, eventId: string) {
    const { addLines, fireInitError } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }
    let foundEvent;
    profile.medicalEvents.forEach((event) => {
      if (event.id === eventId) foundEvent = event;
    });
    profile.criminalEvents.forEach((event) => {
      if (event.id === eventId) foundEvent = event;
    });
    profile.privateRecords.forEach((event) => {
      if (event.id === eventId) foundEvent = event;
    });

    if (foundEvent) {
      addLines(getEventProfileLines(foundEvent));
    } else {
      addLines(evenrNotFound);
    }
  }

  getUserId(): string {
    const { parsedCommand } = this.Service;
    return parsedCommand[0] === '.' ? getLoginUserData()?.id : parsedCommand[0];
  }
}
