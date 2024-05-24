import type CommandsServiceType from '../CommandsService';
import { getErrorMessage, noAccountFound } from '../responseLines/errors';
import { getAccountMessage } from '../responseLines/account';
import { ConfigService, ServerConnectionService } from '../../index';
import { getLoginUserData } from '../../../Terminal/utils/store';

export default class Balance {
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
      getDirectLine,
    } = this.Service;
    if (!addLines || !setInputDisabled) {
      fireInitError();
      return;
    }

    let hackerIsOwner = false;
    try {
      ServerConnectionService.checkCommand('balance');
      let accountNumber = parsedCommand[0];
      if (!accountNumber) {
        accountNumber = await getDirectLine(
          'You need to provide account number to check balance:',
        );
      }
      await ConfigService.checkHacking('balance', accountNumber);

      setInputDisabled(true);

      const account = await ApiService.getAccountByNumber(accountNumber);
      await checkAccount(account);
      if (!hackerIsOwner) {
        const userResponse = await ApiService.scanForUserById(account.ownerId);
        await ApiService.addHackLog({
          targetUserId: account.ownerId,
          targetUserName: account.owner,
          subnetworkId: userResponse.data.subnetworkId,
          subnetworkName: userResponse.data.subnetworkName,
          additionalData: `Balance check on account ${account.accountNumber}`,
        });
      }
      addLines(getAccountMessage(account));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function checkAccount(account) {
      if (!account) {
        addLines(noAccountFound);
        setInputDisabled(false);
        return;
      }
      const loginUserData = getLoginUserData();
      if (account.owner === loginUserData.handle) {
        hackerIsOwner = true;
        return;
      }
      if (ServerConnectionService.isConnected) {
        const serverUsers =
          ServerConnectionService.connectedSubnetwork?.users || [];
        if (!serverUsers.includes(account.owner)) {
          throw new Error(
            `<span class="secondary-color">Error:</span>: You don't have access to this account`,
          );
        }
      } else {
        throw new Error(
          `<span class="secondary-color">Error:</span>: You don't have access to this account`,
        );
      }
    }
  }
}
