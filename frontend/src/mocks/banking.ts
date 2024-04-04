import { AccountType, IBusinessAccount, IPrivateAccount, ITransaction } from '../models/banking';
import { Factions } from '../models/companies';
import { users } from './users';

export const transactions: ITransaction[] = [
    {
        id: 'transaction1',
        to: users[35].id,
        from: users[5].id, // Example sender (change index as needed)
        amount: 500,
        date: '2023-08-11T15:20:32'
    },
    {
        id: 'transaction2',
        to: users[35].id,
        from: users[10].id, // Example sender (change index as needed)
        amount: 750,
        date: '2023-08-12T10:45:21'
    },
    {
        id: 'transaction3',
        to: users[35].id,
        from: users[15].id,
        amount: 300,
        date: '2023-08-13T08:15:10'
    },
    {
        id: 'transaction4',
        to: users[35].id, // NeonTiger as receiver
        from: users[20].id,
        amount: 250,
        date: '2023-08-14T14:30:05'
    },
    {
        id: 'transaction5',
        to: users[35].id,
        from: users[25].id,
        amount: 420,
        date: '2023-08-15T16:40:50'
    },
    {
        id: 'transaction6',
        to: users[35].id, // NeonTiger as receiver
        from: users[30].id,
        amount: 600,
        date: '2023-08-16T12:55:30'
    },
    {
        id: 'transaction7',
        to: users[35].id,
        from: users[5].id,
        amount: 200,
        date: '2023-08-17T09:10:20'
    },
    {
        id: 'transaction8',
        to: users[35].id, // NeonTiger as receiver
        from: users[10].id,
        amount: 800,
        date: '2023-08-18T18:25:15'
    },
    {
        id: 'transaction9',
        to: users[10].id,
        from: users[35].id, // NeonTiger as sender
        amount: 1000,
        date: '2023-08-19T07:30:12'
    },
    {
        id: 'transaction10',
        to: users[35].id,
        from: users[15].id,
        amount: 350,
        date: '2023-08-20T13:45:40'
    }
];

const businessAccountTransactions: ITransaction[] = [
    {
        id: 'Btransaction1',
        to: Factions.TAKAYAMA,
        from: users[12].id,
        amount: 11500,
        date: '2023-08-15T15:20:32'
    },
    {
        id: 'Btransaction2',
        to: users[7].id,
        from: Factions.TAKAYAMA,
        amount: 5000,
        date: '2023-08-15T16:45:10'
    },
    {
        id: 'Btransaction3',
        to: users[10].id,
        from: Factions.TAKAYAMA,
        amount: 12200,
        date: '2023-08-16T09:12:05'
    },
    {
        id: 'Btransaction4',
        to: users[15].id,
        from: Factions.TAKAYAMA,
        amount: 800,
        date: '2023-08-16T14:30:00'
    },
    {
        id: 'Btransaction5',
        to: Factions.TAKAYAMA,
        from: users[20].id,
        amount: 250,
        date: '2023-08-17T11:20:45'
    },
    {
        id: 'Btransaction6',
        to: users[25].id,
        from: Factions.TAKAYAMA,
        amount: 600,
        date: '2023-08-17T16:10:22'
    },
    {
        id: 'Btransaction7',
        to: users[30].id,
        from: Factions.TAKAYAMA,
        amount: 1000,
        date: '2023-08-18T09:05:15'
    },
    {
        id: 'Btransaction8',
        to: users[33].id,
        from: Factions.TAKAYAMA,
        amount: 300,
        date: '2023-08-18T14:40:30'
    },
    {
        id: 'Btransaction9',
        to: users[2].id,
        from: Factions.TAKAYAMA,
        amount: 700,
        date: '2023-08-19T12:15:18'
    },
    {
        id: 'Btransaction10',
        to: users[7].id,
        from: Factions.TAKAYAMA,
        amount: 450,
        date: '2023-08-19T17:30:25'
    },
    {
        id: 'Btransaction11',
        to: users[10].id,
        from: Factions.TAKAYAMA,
        amount: 900,
        date: '2023-08-20T10:25:40'
    },
    {
        id: 'Btransaction12',
        to: users[15].id,
        from: Factions.TAKAYAMA,
        amount: 350,
        date: '2023-08-20T15:50:10'
    }
];

export const account: IPrivateAccount = {
    balance: 5250.66,
    transactions,
    id: 'neonTiger69Account',
    owner: users[35].id,
    type: AccountType.PRIVATE,
    accountNumber: '1234 4456 6666 1234'
};

export const accountBusiness: IBusinessAccount = {
    balance: 71250,
    transactions: businessAccountTransactions,
    id: 'neonTiger69AccountBusiness',
    owner: Factions.TAKAYAMA,
    type: AccountType.BUSINESS,
    accountNumber: '1234 4456 6666 6969'
};
