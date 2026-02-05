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
import { useToastService } from './toast.service';
import { debugLog } from '../utils/debug';

type Holder = {
    id: string;
    handle: string;
};

export function useBankingService() {
    const intl = useIntl();
    const dispatch = useDispatch();
    const { api } = useApiService();
    const { displayToast } = useToastService();
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
        debugLog('sendTransfer called with:', { receiverHandle, amount, title, fromAccount });
        debugLog('Available accounts:', accounts);
        
        const account =
            accounts[fromAccount.toLocaleLowerCase() as 'private' | 'business'];
        
        if (!account) {
            console.error('Account not found. fromAccount:', fromAccount, 'accounts:', accounts);
            displayToast(intl.formatMessage({ id: 'ACCOUNT_NOT_FOUND' }));
            return;
        }
        
        debugLog('Sender account found:', account);
        debugLog('Fetching receiver account for:', receiverHandle);
        
        let receiverAccount;
        try {
            receiverAccount = await getAccountByHandle(receiverHandle);
        } catch (error) {
            console.error('Receiver account not found:', error);
            displayToast(`User ${receiverHandle} does not have a bank account`);
            throw error;
        }

        const transaction: ITransaction = {
            from: account.accountNumber,
            to: receiverAccount[0]?.accountNumber,
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

        try {
            debugLog('Starting transfer...', transaction);
            await api.url('Account/transaction')
                .post(transaction)
                .res();
            
            debugLog('Transfer posted, waiting 500ms...');
            // Wait for backend to process, then refresh accounts
            await new Promise<void>((resolve) => {
                setTimeout(async () => {
                    debugLog('Fetching accounts...');
                    await fetchAccounts();
                    debugLog('Accounts fetched, transfer complete');
                    resolve();
                }, 500);
            });
        } catch (error) {
            console.error('Transfer error:', error);
            displayToast(intl.formatMessage({ id: 'TRANSFER_FAILED' }));
            throw error;
        }
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
