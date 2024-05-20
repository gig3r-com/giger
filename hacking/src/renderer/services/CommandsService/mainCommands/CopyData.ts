import type CommandsServiceType from '../CommandsService';
import { getLoginUserData } from '../../../Terminal/utils/store';
import {
  getErrorMessage,
  noUserIdError,
  notConnectedError,
  userNotFoundInSubnetworkError,
  evenrNotFound,
  cantCopyFromSelf,
} from '../responseLines/errors';
import { EventType, ProfileType } from '../../../types';
import { getRecordCopiedMessage } from '../responseLines/misc';
import { ConfigService } from '../../index';

export default class CopyData {
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
      ApiService,
    } = this.Service;
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return;
    }

    const { isConnected } = ServerConnectionService;
    if (!isConnected) {
      addLines(notConnectedError);
      setInputDisabled(false);
      return;
    }

    if (!ServerConnectionService.isDecrypted) {
      addLines([
        `<span class="secondary-color">Error: </span>Access Denied! Command is encrypted.`,
      ]);
      setInputDisabled(false);
      return;
    }
    try {
      await ConfigService.checkHacking('copydata');
      setInputDisabled(true);
      const userId = parsedCommand[0];
      const eventId = parsedCommand[1];

      const loginUserId = getLoginUserData()?.id;
      if (loginUserId === userId || userId === '.') {
        addLines(cantCopyFromSelf);
        setInputDisabled(false);
        return;
      }

      if (!userId) {
        addLines(noUserIdError);
        setInputDisabled(false);
        return;
      }

      const { isConnected, connectedSubnetwork } = ServerConnectionService;
      if (!isConnected) {
        addLines(notConnectedError);
        setInputDisabled(false);
        return;
      }

      const profile = await ApiService.getUserProfile(userId);
      if (!connectedSubnetwork?.users?.includes(profile.id)) {
        addLines(userNotFoundInSubnetworkError);
        setInputDisabled(false);
        return;
      }

      // check if profile has record
      const event = this.getEvent(profile, eventId);
      if (!event) {
        addLines(evenrNotFound);
        setInputDisabled(false);
        return;
      }

      await ApiService.addRecordToLoginUser(event);
      addLines(getRecordCopiedMessage(event.name));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }

  getEvent(profile: ProfileType, eventId: string): EventType | undefined {
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
    return foundEvent;
  }
}
