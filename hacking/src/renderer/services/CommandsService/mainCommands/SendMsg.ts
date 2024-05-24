import type CommandsServiceType from '../CommandsService';
import { getErrorMessage } from '../responseLines/errors';
import {
  ApiService,
  ConfigService,
  ServerConnectionService,
} from '../../index';
import { getLoginUserData } from '../../../Terminal/utils/store';
import { ProfileType } from '../../../types';

export default class SendMsg {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      addLines,
      fireInitError,
      parsedCommand,
      setInputDisabled,
      getDirectLine,
      removeLastLine,
    } = this.Service;
    if (!addLines || !setInputDisabled || !removeLastLine) {
      fireInitError();
      return;
    }
    const messageData = {
      from: parsedCommand[0],
      to: parsedCommand[1],
      text: parsedCommand[2],
    };
    try {
      await ConfigService.checkHacking('sendmsg');
      ServerConnectionService.checkCommand('sendmsg');
      if (!messageData.from) {
        messageData.from = await getDirectLine(
          'From who the message should come:',
        );
      }
      if (!messageData.to) {
        messageData.to = await getDirectLine(
          'Who is the recipient of the message:',
        );
      }
      if (!messageData.text) {
        messageData.text = await getDirectLine('Message:');
      }
      setInputDisabled(true);
      const sender = await ApiService.getUserProfile(messageData.from);
      const receiver = await ApiService.getUserProfile(messageData.to);
      await checkData(sender, receiver);
      await ApiService.sendMsgFromTerminal(sender, receiver, messageData);
      addLines(['Sending message...']);
      await wait(5000);
      removeLastLine();
      addLines(['Message sent']);
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function wait(time: number) {
      setInputDisabled(true);
      await new Promise((resolve) => setTimeout(resolve, time)).then(() => {
        setInputDisabled(false);
      });
    }

    async function checkData(
      sender: ProfileType | null,
      receiver: ProfileType | null,
    ) {
      if (!sender) {
        throw new Error(
          `<span>Error:</span>Wrong sender handle, profile ${messageData.from} not found`,
        );
      }
      if (!receiver) {
        throw new Error(
          `<span>Error:</span>Wrong receiver handle, profile ${messageData.to} not found`,
        );
      }
      if (ServerConnectionService.isConnected) {
        const serverUsers =
          ServerConnectionService.connectedSubnetwork?.users || [];
        if (!serverUsers.includes(sender.handle)) {
          throw new Error(
            `<span class="secondary-color">Error:</span>: You don't have access to sender's profile`,
          );
        }
      } else {
        const loginUserData = getLoginUserData();
        if (sender.handle !== loginUserData.handle) {
          throw new Error(
            `<span class="secondary-color">Error:</span>: You don't have access to sender's profile`,
          );
        }
      }
    }
  }
}
