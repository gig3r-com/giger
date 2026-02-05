export type Transaction = {
    id: string;
    from: string; // accountNumber
    to: string; // accountNumber
    amount: number;
    timestamp: string;
    title: string;
    orderingUser: string; // user handle
    hackData?: string;
}

export type Account = {
    id: string;
    type: 'PRIVATE' | 'BUSINESS';
    name?: string;
    accountNumber: string;
    balance: number; // can be negative
    owners: string[]; // user handles
    transactions: Transaction[];
}