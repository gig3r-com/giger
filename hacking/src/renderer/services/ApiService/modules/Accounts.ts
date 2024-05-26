import axios from 'axios';
import { BankAccountType } from '../../../types';
import mapAccount from '../mappers/account';

type SendTransactionType = {};

export default class Accounts {
  async getAccountByNumber(accountNumber: string): Promise<BankAccountType> {
    const { gigerApiUrl } = this.getUrls();
    const accountsUrl = `${gigerApiUrl}/Account/byAccountNumber?accountNumber=${accountNumber}`;
    const accountResponse = await axios.get(accountsUrl);
    return mapAccount(accountResponse.data);
  }

  async sendTransaction(
    transactionData: SendTransactionType,
  ): Promise<BankAccountType> {
    transactionData.amount = Number(transactionData.amount);
    transactionData.id = crypto.randomUUID();
    transactionData.null;
    const { gigerApiUrl } = this.getUrls();
    const accountsUrl = `${gigerApiUrl}/Account/transaction`;
    return axios.post(accountsUrl, transactionData);
  }
}
