import moment from 'moment';
import { BankAccountType } from '../../../types';

type DataType = {
  id: string;
  ownerId: string;
  type: string;
  balance: number;
  accountNumber: string;
  transactions: any[];
};

export default function mapAccount(data: DataType): BankAccountType {
  return {
    id: data.id,
    owner: data.owner,
    ownerId: data.ownerId,
    type: data.type,
    balance: data.balance,
    accountNumber: data.accountNumber,
    transactions: data.transactions.map((transaction) =>
      mapTransaction(transaction, data.accountNumber),
    ),
  };
}

export function mapTransaction(data, accountNumber: number) {
  const isIncoming = accountNumber === data.to;
  return {
    id: data.id,
    title: data.title,
    fromUser: data.fromUser,
    toUser: data.toUser,
    amount: isIncoming ? String(data.amount) : `-${data.amount}`,
    date: moment(data.timestamp).format('DD/MM HH:mm:ss'),
    orderingParty: data.orderingParty,
  };
}
