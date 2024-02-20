export interface ITransaction {
    id: string;
    to: string; //userId
    from: string; //userId
    amount: number;
    date: string; // date timestamp
}

export interface IAccount {
    balance: number;
    transactions: ITransaction[];
    id: string;
    owner: string; //userId
    type: AccountType
    accountNumber: string;
}

export enum AccountType {
    PRIVATE = "private",
    BUSINESS = "business"
}
