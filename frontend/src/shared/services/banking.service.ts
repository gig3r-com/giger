import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    selectAccounts,
    setAccount,
    setBusinessAccount
} from '../../store/bank.slice';
import {
    AccountType,
    IBusinessAccount,
    IPrivateAccount,
    ITransaction
} from '../../models/banking';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Factions } from '../../models/companies';
import { useApiService } from './api.service';
import { useIntl } from 'react-intl';
import { selectTransferHashes } from '../../store/bank.selectors';

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
    const transferHashes = useSelector(selectTransferHashes);
    const userList = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const accounts = useSelector(selectAccounts);
    const fetchAccounts = async () => {
        if (!currentUser) return;
        const [privateAccount, businessAccount] = await api
            .query({ owner: currentUser?.handle })
            .get(`Account/byOwner`)
            .json<[IPrivateAccount, IBusinessAccount?]>();
        dispatch(setAccount(privateAccount));
        businessAccount && dispatch(setBusinessAccount(businessAccount));
    };
    const hasCompanyAccount = !!accounts.business;

    const getAccountByHandle = async (handle: string) => {
        return await api
            .query({ owner: handle })
            .get(`Account/byOwner`)
            .json<[IPrivateAccount, IBusinessAccount?]>();
    };

    const sendTransfer = async (
        receiverHandle: string,
        amount: number,
        title: string,
        fromAccount: AccountType
    ) => {
        const account =
            accounts[fromAccount.toLocaleLowerCase() as 'private' | 'business'];
        const receiverAccount = await getAccountByHandle(receiverHandle);

        if (!account) {
            console.error('Account not found');
            return;
        }

        const transaction: ITransaction = {
            from: account.accountNumber,
            to:
                receiverAccount[fromAccount === 'PRIVATE' ? 0 : 1]
                    ?.accountNumber ?? receiverAccount[0].accountNumber,
            fromUser:
                (fromAccount === 'PRIVATE'
                    ? currentUser?.handle
                    : currentUser?.faction) ?? '',
            toUser: receiverHandle,
            amount,
            title,
            id: v4(),
            timestamp: dayjs().add(100, 'years').toISOString(),
            orderingParty:
                fromAccount === AccountType.BUSINESS
                    ? currentUser?.handle ?? ''
                    : null
        };

        api.url('Account/transaction')
            .post(transaction)
            .res(() => {
                fetchAccounts();
            });
    };

    const getAccountHolderName = (handle: string): string => {
        const factionHolders = Object.values(Factions).map((faction) => ({
            id: faction,
            handle: faction
        }));
        const availableHolders: Holder[] = [...userList, ...factionHolders];
        const holder = availableHolders.find(
            (holder) => holder.handle === handle
        );

        return holder?.handle ?? intl.formatMessage({ id: 'UNKNOWN_USER' });
    };

    const isNewTransaction = (transactionId: string) => {
        return (
            transferHashes[transactionId]?.current !==
            transferHashes[transactionId]?.lastSeen
        );
    };

    return {
        accounts,
        hasCompanyAccount,
        fetchAccounts,
        sendTransfer,
        getAccountHolderName,
        currentPrivateBalance,
        currentBusinessBalance,
        isNewTransaction
    };
}
