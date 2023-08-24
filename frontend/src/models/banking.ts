import { IUser } from "./user";

export interface ITransaction {
    id: string;
    to: IUser;
    from: IUser;
    amount: number;
    date: string; // date timestamp
}

export interface IAccount {
    balance: number;
    transactions: ITransaction[];
    id: string;
    owner: IUser;
    type: AccountType
    accountNumber: string;
}

export enum AccountType {
    PRIVATE = "private",
    BUSINESS = "business"
}
