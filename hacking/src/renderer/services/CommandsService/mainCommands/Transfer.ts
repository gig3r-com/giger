import type CommandsServiceType from '../CommandsService';
import {
  getErrorMessage,
  noProfileError,
  noAccountFound,
} from '../responseLines/errors';
import { getAccountMessage } from '../responseLines/account';

export default class Transfer {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      parsedCommand,
      addLines,
      fireInitError,
      ApiService,
      setInputDisabled,
      removeLastLine,
      getDirectLine,
      startProcess,
    } = this.Service;
    if (!addLines || !setInputDisabled || !removeLastLine) {
      fireInitError();
      return;
    }
    const transactionData = {
      from: parsedCommand[0],
      to: parsedCommand[1],
      amount: parsedCommand[2],
      title: '',
      id: `1234567890${new Date().getTime()}`,
      date: new Date().toISOString(),
    };

    try {
      if (!parsedCommand[0]) {
        transactionData.from = await getDirectLine(
          'Enter account your wont to transfer money FROM:',
        );
        transactionData.to = await getDirectLine(
          'Enter account your wont to transfer money TO:',
        );
        transactionData.amount = await getDirectLine('Enter amount:');
      }
      transactionData.title = await getDirectLine('Enter title:');
      await startProcess(
        ['Processing Transaction...'],
        ['Transaction resolved!'],
        sendTransaction,
        true,
        3000,
      );
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function sendTransaction() {
      await ApiService.sendTransaction(transactionData);
    }
  }
}
