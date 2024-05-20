import type CommandsServiceType from '../CommandsService';
import {
  getErrorMessage,
  noProfileError,
  noAccountFound,
} from '../responseLines/errors';
import { getAccountMessage } from '../responseLines/account';
import {ConfigService, ServerConnectionService} from '../../index';
import {getLoginUserData} from "../../../Terminal/utils/store";

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
      title: parsedCommand[3],
      id: `1234567890${new Date().getTime()}`,
      date: new Date().toISOString(),
    };

    try {
      await ConfigService.checkHacking('transfer');
      if (!transactionData.from) {
        transactionData.from = await getDirectLine(
          'Enter account your wont to transfer money FROM:',
        );
      }
      if (!transactionData.to) {
        transactionData.to = await getDirectLine(
          'Enter account your wont to transfer money TO:',
        );
      }
      if (!transactionData.amount) {
        transactionData.amount = await getDirectLine('Enter amount:');
      }
      if (!transactionData.title) {
        transactionData.title = await getDirectLine('Enter title:');
      }

      const fromAccount = await ApiService.getAccountByNumber(transactionData.from);

      if (!fromAccount) {
        addLines(['NO account'])
      }

      if (ServerConnectionService.isConnected && ServerConnectionService.connectedSubnetwork?.users?.includes(fromAccount.owner)) {
        startTransaction();
        setInputDisabled(false);
        return;
      }

      const loginUserData = getLoginUserData();
      if (fromAccount.owner === loginUserData.handle) {
        startTransaction();
        setInputDisabled(false);
        return;
      }

      addLines(['You dont have access to that account']);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function startTransaction() {
      return startProcess(
        ['Processing Transaction...'],
        ['Transaction resolved!'],
        sendTransaction.bind(this),
        true,
        3000,
      );
    }

    async function sendTransaction() {
      try {
        await ApiService.sendTransaction(transactionData);
      } catch (err) {
        console.log({ err }); // todo handle errors
        this.Service.setInputDisabled(false);
        this.Service.addLines(getErrorMessage(err));
      }
    }
  }
}
