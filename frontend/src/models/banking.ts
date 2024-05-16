import { Factions } from "./companies";

export interface ITransaction {
    id: string;
    to: string; //accountId
    from: string; //accountId
    amount: number;
    timestamp: string; // date timestamp
    title?: string;
}

export interface IBusinessTransaction extends ITransaction {
    orderingParty: string;
}

export interface IAccount {
    balance: number;
    transactions: ITransaction[];
    id: string;
    type: AccountType;
    accountNumber: string;
}

export interface IPrivateAccount extends IAccount {
    type: AccountType.PRIVATE;
    owner: string; // userId
}

export interface IBusinessAccount extends IAccount {
    type: AccountType.BUSINESS;
    owner: Factions; // userId
}

export enum AccountType {
    PRIVATE = 'PRIVATE',
    BUSINESS = 'BUSINESS'
}
