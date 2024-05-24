import { types } from 'sass';
import type CommandsServiceType from '../CommandsService';
import { getErrorMessage } from '../responseLines/errors';
import { ApiService, ConfigService, ServerConnectionService } from '../..';
import { getLoginUserData } from '../../../Terminal/utils/store';

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
    };
    let fromAccount;
    let toAccount;
    let hackerIsOwner = false;

    try {
      await ConfigService.checkHacking('transfer');
      ServerConnectionService.checkCommand('transfer');

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
      transactionData.amount = parseInt(transactionData.amount, 10);
      if (isNaN(transactionData.amount)) {
        throw new Error(
          `<span class="secondary-color">Error:</span>: Amount must be a number`,
        );
      }
      if (!transactionData.title) {
        transactionData.title = await getDirectLine('Enter title:');
      }

      fromAccount = await ApiService.getAccountByNumber(transactionData.from);
      transactionData.fromUser = fromAccount.owner;

      toAccount = await ApiService.getAccountByNumber(transactionData.to);
      transactionData.toUser = toAccount.owner;

      const isBusinessAccount = fromAccount.type === 'BUSINESS';
      if (isBusinessAccount) {
        transactionData.orderingParty = await getDirectLine(
          `Account ${fromAccount.accountNumber} is a business account, provide owner user handle:`,
        );
      }
      await checkAccounts(fromAccount, toAccount, isBusinessAccount);
      const callback = sendTransaction.bind(this);
      startTransaction(callback);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function startTransaction(callback) {
      return startProcess(
        ['Processing Transaction...'],
        ['Transaction resolved!'],
        callback,
        true,
        3000,
        [`Transaction failed`],
      );
    }

    async function sendTransaction() {
      try {
        await ApiService.sendTransaction(transactionData);
        if (!hackerIsOwner) {
          await ApiService.addHackLog({
            targetUserId: fromAccount.ownerId,
            targetUserName: fromAccount.owner,
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    }

    async function checkAccounts(fromAccount, toAccount, transactionData) {
      if (!fromAccount) {
        throw new Error(
          `<span class="secondary-color">Error:</span>: Wrong FROM account number`,
        );
      }
      if (!toAccount) {
        throw new Error(
          `<span class="secondary-color">Error:</span>: Wrong TO account number`,
        );
      }
      const loginUserData = getLoginUserData();
      if (fromAccount.owner === loginUserData.handle) {
        hackerIsOwner = true;
        return;
      }
      if (ServerConnectionService.isConnected) {
        const serverUsers =
          ServerConnectionService.connectedSubnetwork?.users || [];
        if (!serverUsers.includes(fromAccount.owner)) {
          throw new Error(
            `<span class="secondary-color">Error:</span>: You don't have access to this account`,
          );
        }
      } else {
        throw new Error(
          `<span class="secondary-color">Error:</span>: You don't have access to this account`,
        );
      }
      if (transactionData.orderingParty) {
        const orderingUser = await ApiService.getUserProfile(
          transactionData.orderingParty,
        );

        if (!orderingUser) {
          throw new Error(
            `<span class="secondary-color">Error:</span>: Wrong owner user handle, no user found.`,
          );
        }

        if (
          orderingUser.accounts.filter(
            (account) => account.id === fromAccount.id,
          ).length <= 0
        ) {
          throw new Error(
            `<span class="secondary-color">Error:</span>: You don't have access to this account'`,
          );
        }
      }
      if (transactionData.amount > fromAccount.balance) {
        throw new Error(
          `<span class="secondary-color">Error:</span>: You don't have enough money in selected account`,
        );
      }
    }
  }
}
