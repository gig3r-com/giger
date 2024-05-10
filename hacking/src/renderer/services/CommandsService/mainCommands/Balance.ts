import type CommandsServiceType from '../CommandsService';
import {
  getErrorMessage,
  noProfileError,
  noAccountFound,
} from '../responseLines/errors';
import { getAccountMessage } from '../responseLines/account';

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
      getProfile,
      getDirectLine,
    } = this.Service;
    if (!addLines || !setInputDisabled) {
      fireInitError();
      return;
    }

    try {
      let accountNumber = parsedCommand[0];
      if (!accountNumber) {
        accountNumber = await getDirectLine(
          'You need to provide account number to check balance:',
        );
      }

      setInputDisabled(true);

      const account = await ApiService.getAccountByNumber(accountNumber);

      if (!account) {
        addLines(noAccountFound);
        setInputDisabled(false);
        return;
      }

      const profile = await getProfile(account.ownerId);
      if (!profile) {
        addLines(noProfileError);
        setInputDisabled(false);
        return;
      }

      addLines(getAccountMessage(account));

      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }
}
