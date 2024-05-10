import axios from 'axios';
import { BankAccountType } from '../../../types';
import mapAccount from '../mappers/account';

type SendTransactionType = {

}

export default class Accounts {
  async getAccountByNumber(accountNumber: string): Promise<BankAccountType> {
    const { gigerApiUrl } = this.getUrls();
    const accountsUrl = `${gigerApiUrl}/Account/byId?id=${accountNumber}`; // todo id => number
    const accountResponse = await axios.get(accountsUrl);
    return mapAccount(accountResponse.data);
  }

  async sendTransaction(transactionData: SendTransactionType): Promise<BankAccountType> {
    const { gigerApiUrl } = this.getUrls();
    const accountsUrl = `${gigerApiUrl}/Account/transaction`; // todo id => number
    const accountResponse = await axios.post(accountsUrl, transactionData);
    return mapAccount(accountResponse.data);
  }
}
