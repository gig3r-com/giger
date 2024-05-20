import { Factions } from "./companies";

export interface ITransaction {
    id: string;
    to: string; //accountNo
    from: string; //accountNo
    toUser: string; //userHandle
    fromUser: string; //userHandle
    amount: number;
    timestamp: string; // date timestamp
    title?: string; 
    /**
     * Only for business accounts, when a business member makes a transaction from a business account
     */
    orderingParty: string | null;
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
