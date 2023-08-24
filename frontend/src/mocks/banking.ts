import { AccountType, IAccount, ITransaction } from '../models/banking';
import { users } from './users';

export const transactions: ITransaction[] = [
    {
        id: 'transaction1',
        to: users[35],
        from: users[5], // Example sender (change index as needed)
        amount: 500,
        date: '2023-08-11T15:20:32'
    },
    {
        id: 'transaction2',
        to: users[35],
        from: users[10], // Example sender (change index as needed)
        amount: 750,
        date: '2023-08-12T10:45:21'
    },{
        id: 'transaction3',
        to: users[35],
        from: users[15],
        amount: 300,
        date: '2023-08-13T08:15:10',
      },
      {
        id: 'transaction4',
        to: users[35], // NeonTiger as receiver
        from: users[20],
        amount: 250,
        date: '2023-08-14T14:30:05',
      },
      {
        id: 'transaction5',
        to: users[35],
        from: users[25],
        amount: 420,
        date: '2023-08-15T16:40:50',
      },
      {
        id: 'transaction6',
        to: users[35], // NeonTiger as receiver
        from: users[30],
        amount: 600,
        date: '2023-08-16T12:55:30',
      },
      {
        id: 'transaction7',
        to: users[35],
        from: users[5],
        amount: 200,
        date: '2023-08-17T09:10:20',
      },
      {
        id: 'transaction8',
        to: users[35], // NeonTiger as receiver
        from: users[10],
        amount: 800,
        date: '2023-08-18T18:25:15',
      },
      {
        id: 'transaction9',
        to: users[10],
        from: users[35], // NeonTiger as sender
        amount: 1000,
        date: '2023-08-19T07:30:12',
      },
      {
        id: 'transaction10',
        to: users[35],
        from: users[15],
        amount: 350,
        date: '2023-08-20T13:45:40',
      },
];

export const account: IAccount = {
    balance: 5250.66, 
    transactions,
    id: 'neonTiger69Account',
    owner: users[35],
    type: AccountType.PRIVATE
};

export const accountBusiness: IAccount = {
  balance: 71250,
  transactions,
  id: 'neonTiger69AccountBusiness',
  owner: users[35],
  type: AccountType.PRIVATE
};
