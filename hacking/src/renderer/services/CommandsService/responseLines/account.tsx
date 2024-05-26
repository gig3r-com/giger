import { BankAccountType, TransactionType } from '../../../types';
import { onlyTab } from './utils';

export function getAccountMessage(account: BankAccountType): string[] {
  const lines = [
    `<span class="secondary-color">Bank Account</span> nr ${onlyTab(account.accountNumber)}`,
    `Type: ${account.type}`,
    `Balance: ${account.balance}`,
  ];

  //  Transfers
  if (account.transactions?.length > 0) {
    let tableContent = '';
    tableContent += `<tr class="secondary-color table-title"><td colspan="5">History</td></tr>`;
    account.transactions.forEach((transaction) => {
      tableContent += printTransaction(transaction);
    });
    lines.push(`<table class="account-table">${tableContent}</table>`);
  }

  return lines;

  function printTransaction(transaction: TransactionType): string {
    return `<tr>
        <td>${transaction.title}</td>
        <td>${transaction.amount}</td>
        <td><span class="accent-color">${transaction.date}</span></td>
        </tr>`;
  }
}
