import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    selectAccounts,
    addTransaction,
    setAccount
} from '../../store/bank.slice';
import {
    AccountType,
    IPrivateAccount,
    ITransaction
} from '../../models/banking';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Factions } from '../../models/companies';
import { useApiService } from './api.service';
import { useIntl } from 'react-intl';

type Holder = {
    id: string;
    handle: string;
};

export function useBankingService() {
    const intl = useIntl();
    const dispatch = useDispatch();
    const { api } = useApiService();
    const currentPrivateBalance = useSelector(
        (state: RootState) => state.bank.account?.balance ?? 0
    );
    const currentBusinessBalance = useSelector(
        (state: RootState) => state.bank.businessAccount?.balance ?? 0
    );
    const userList = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const accounts = useSelector(selectAccounts);
    const fetchAccounts = async () => {
        if (!currentUser) return;
        const privateAccount = (
            await api
                .query({ owner: currentUser?.handle })
                .get(`Account/byOwner`)
                .json<IPrivateAccount[]>()
        )[0];
        // const businessAccount = (await api
        //     .query({ owner: currentUser?.faction })
        //     .get(`Account/byOwner`)
        //     .json<IBusinessAccount[]>())[0];
        dispatch(setAccount(privateAccount));
        //dispatch(setBusinessAccount(businessAccount));
    };
    const hasCompanyAccount = !!accounts.business;

    const sendTransfer = (
        userId: string,
        amount: number,
        title: string,
        fromAccount: AccountType
    ) =>
        new Promise<void>((resolve) => {
            const account =
                accounts[
                    fromAccount.toLocaleLowerCase() as 'private' | 'business'
                ];

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
                date: dayjs().add(100, 'years').toISOString(),
                ...(fromAccount === AccountType.BUSINESS
                    ? {
                          orderingParty: currentUser?.id
                      }
                    : {})
            };

            api.url('Account/transaction')
                .post(transaction)
                .res(() => {
                    dispatch(
                        addTransaction({
                            //accountType: fromAccount,
                            transaction
                        })
                    );
                    resolve();
                });
        });

    const getAccountHolderName = (id: string): string => {
        const factionHolders = Object.values(Factions).map((faction) => ({
            id: faction,
            handle: faction
        }));
        const availableHolders: Holder[] = [...userList, ...factionHolders];
        const holder = availableHolders.find((holder) => holder.id === id);

        return holder?.handle ?? intl.formatMessage({ id: 'UNKNOWN_USER' });
    };

    return {
        accounts,
        hasCompanyAccount,
        fetchAccounts,
        sendTransfer,
        getAccountHolderName,
        currentPrivateBalance,
        currentBusinessBalance
    };
}
