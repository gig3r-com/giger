import type CommandsServiceType from '../CommandsService';
import { getLoginUserData } from '../../../Terminal/utils/store';
import {
  getErrorMessage,
  noUserIdError,
  notConnectedError,
  userNotFoundInSubnetworkError,
  evenrNotFound,
  cantCopyFromSelf,
  noProfileError,
} from '../responseLines/errors';
import { EventType, ProfileType } from '../../../types';
import { getRecordCopiedMessage } from '../responseLines/misc';
import { ConfigService, ServerConnectionService } from '../../index';

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
      getDirectLine,
    } = this.Service;
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return;
    }
    // const { isConnected } = ServerConnectionService;
    // if (!isConnected) {
    //   addLines(notConnectedError);
    //   setInputDisabled(false);
    //   return;
    // }

    // if (!ServerConnectionService.isDecrypted) {
    //   addLines([
    //     `<span class="secondary-color">Error: </span>Access Denied! Command is encrypted.`,
    //   ]);
    //   setInputDisabled(false);
    //   return;
    // }
    try {
      // await ConfigService.checkHacking('copydata');
      // ServerConnectionService.checkCommand('copydata');
      setInputDisabled(true);
      let userHandle = parsedCommand[0];
      let eventId = parsedCommand[1];
      let userId;

      if (!userHandle) {
        userHandle = await getDirectLine('Enter username:');
      }

      if (!eventId) {
        eventId = await getDirectLine('Enter record/conversation/gig ID:');
      }

      const userProfile = await ApiService.getProfileByHandle(userHandle);

      if (!userProfile) {
        addLines(noProfileError);
        setInputDisabled(false);
        return;
      }

      userId = userProfile.id;
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

      // const { isConnected, connectedSubnetwork } = ServerConnectionService;
      // if (!isConnected) {
      //   addLines(notConnectedError);
      //   setInputDisabled(false);
      //   return;
      // }

      // if (!connectedSubnetwork?.users?.includes(userId)) {
      //   addLines(userNotFoundInSubnetworkError);
      //   setInputDisabled(false);
      //   return;
      // }

      let record;
      let gig;
      let conversation;

      try {
        record = await this.getEvent(userProfile, eventId);
      } catch (e) {
        console.log(e);
      }

      try {
        gig = await ApiService.getGigById(eventId);
      } catch (e) {
        console.log(e);
      }

      try {
        conversation = await ApiService.getConversationById(eventId);
      } catch (e) {
        console.log(e);
      }

      console.log(conversation);

      if (record) {
        // check if profile has record
        const event = this.getEvent(userProfile, eventId);
        if (!event) {
          addLines(evenrNotFound);
          setInputDisabled(false);
          return;
        }

        const title = record.name;
        record = mapRecord(record, userHandle);
        await ApiService.addRecordToLoginUser(record);
        addLines(getRecordCopiedMessage(title));
        setInputDisabled(false);
      }

      if (gig) {
        record = mapGig(gig);
        // await ApiService.addRecordToLoginUser(event);
        // addLines(getRecordCopiedMessage(event.name));
        setInputDisabled(false);
      }

      if (conversation) {
        conversation = mapConversation(conversation);
        await ApiService.addRecordToLoginUser(conversation);
        addLines(getRecordCopiedMessage('conversation'));
        setInputDisabled(false);
      }
      addLines[evenrNotFound];
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    function mapRecord(record, userHandle) {
      return {
        id: crypto.randomUUID(),
        isRevealed: true,
        description: `Copied from ${userHandle}: \n${record.description}`,
        recordType: 'PRIVATE_RECORD',
        title: `COPY: ${record.name}`,
      };
    }

    function mapGig(gig) {
      return {
        id: crypto.randomUUID(),
        isRevealed: true,
        description: gig,
        recordType: 'PRIVATE_RECORD',
        title: `Gig record copy: `,
      };
    }

    function mapConversation(conversation) {
      return {
        id: crypto.randomUUID(),
        isRevealed: true,
        description: conversation.messages.reduce((acc, curr) => {
          return `${acc}${curr.sender} (${curr.date}): ${curr.text} \n`;
        }, ''),
        recordType: 'PRIVATE_RECORD',
        title: `Conversation record copy: ${conversation.participants.join(
          ', ',
        )}`,
      };
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
