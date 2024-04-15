import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    addTransaction,
    setAccount,
    setBusinessAccount
} from '../../store/bank.slice';
import { account as mockAccount, accountBusiness } from '../../mocks/banking';
import { AccountType, ITransaction } from '../../models/banking';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Factions } from '../../models/companies';

type Holder = {
    id: string;
    handle: string;
};

export function useBankingService() {
    const dispatch = useDispatch();
    const userList = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const accounts = useSelector((state: RootState) => ({
        private: state.bank.account,
        business: state.bank.businessAccount
    }));
    const fetchAccounts = () => {
        dispatch(setAccount(mockAccount));
        dispatch(setBusinessAccount(accountBusiness));
    };

    const sendTransfer = (
        userId: string,
        amount: number,
        title: string,
        fromAccount: AccountType
    ) =>
        new Promise<void>((resolve) => {
            const account = accounts[fromAccount];

            if (!account) {
                console.error('Account not found');
                return;
            }

            const transaction: ITransaction = {
                from: account.id,
                to: userId,
                amount,
                title,
                id: v4(),
                date: dayjs().toISOString(),
                ...(fromAccount === AccountType.BUSINESS
                    ? {
                          orderingParty: currentUser?.id
                      }
                    : {})
            };

            console.log('Sending transaction', transaction);
            dispatch(addTransaction({ accountType: fromAccount, transaction }));
            resolve();
        });

    const getAccountHolderName = (id: string): string => {
        const factionHolders = Object.values(Factions).map((faction) => ({
            id: faction,
            handle: faction
        }));
        const availableHolders: Holder[] = [...userList, ...factionHolders];
        const holder = availableHolders.find((holder) => holder.id === id);

        if (!holder) {
            console.error('Holder not found');
            return '';
        }

        return holder.handle;
    };

    return {
        accounts,
        fetchAccounts,
        sendTransfer,
        getAccountHolderName
    };
}
