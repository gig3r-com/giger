import React, { useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

import type { User, Account } from '@/notes';
import { accounts as mockAccounts } from '@/mockData/accounts';

import BankingSummary from './banking/BankingSummary';
import AccountsList from './banking/AccountsList';
import TransactionsTable from './banking/TransactionsTable';
import AddAccountDialog from './banking/AddAccountDialog';

const Root = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(2),
}));

const hasSameAccount = (a: Account, b: Account) => {
    if (a.id && b.id && a.id === b.id) return true;
    return a.accountNumber === b.accountNumber;
};

const BankingTab: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<User>();
    const accounts = values.accounts ?? [];
    const mainAccountNumber = values.mainAccount;

    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
        accounts[0]?.id ?? null,
    );
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        if (!accounts.length) {
            setSelectedAccountId(null);
            return;
        }
        if (!selectedAccountId || !accounts.some((a) => a.id === selectedAccountId)) {
            setSelectedAccountId(accounts[0].id);
        }
    }, [accounts, selectedAccountId]);

    const selectedAccount =
        accounts.find((a) => a.id === selectedAccountId) ?? accounts[0] ?? null;

    const totalBalance = useMemo(
        () => accounts.reduce((sum, acc) => sum + (acc.balance ?? 0), 0),
        [accounts],
    );

    const privateCount = accounts.filter((a) => a.type === 'PRIVATE').length;
    const businessCount = accounts.filter((a) => a.type === 'BUSINESS').length;

    const mainAccountOptions =
        accounts.map((account) => {
            const isBusiness = account.type === 'BUSINESS';
            const name = isBusiness ? ((account as any).name as string | undefined) : undefined;

            return {
                value: account.accountNumber,
                label: name
                    ? `${account.accountNumber} – ${name}`
                    : `${account.accountNumber} – ${isBusiness ? 'Business' : 'Private'}`,
            };
        }) ?? [];

    const availableAccounts: Account[] = useMemo(
        () =>
            mockAccounts.filter(
                (mockAcc) => !accounts.some((userAcc) => hasSameAccount(userAcc, mockAcc)),
            ),
        [accounts],
    );

    const handleAddAccount = (account: Account) => {
        const next = [...accounts, account];
        setFieldValue('accounts', next);

        if (!selectedAccountId) {
            setSelectedAccountId(account.id ?? null);
        }
        if (!mainAccountNumber) {
            setFieldValue('mainAccount', account.accountNumber);
        }
    };

    const handleRemoveAccount = (account: Account) => {
        const nextAccounts = accounts.filter((a) => !hasSameAccount(a, account));
        setFieldValue('accounts', nextAccounts);

        if (selectedAccountId && hasSameAccount(account, selectedAccount as Account)) {
            const nextSelected = nextAccounts[0];
            setSelectedAccountId(nextSelected ? nextSelected.id ?? null : null);
        }

        if (mainAccountNumber === account.accountNumber) {
            const nextMain = nextAccounts[0]?.accountNumber ?? '';
            setFieldValue('mainAccount', nextMain);
        }
    };

    const handleSetMainAccount = (account: Account) => {
        setFieldValue('mainAccount', account.accountNumber);
    };

    return (
        <Root>
            <BankingSummary
                totalBalance={totalBalance}
                accountCount={accounts.length}
                privateCount={privateCount}
                businessCount={businessCount}
                mainAccountNumber={mainAccountNumber}
                hasAccounts={accounts.length > 0}
                mainAccountOptions={mainAccountOptions}
            />

            <Stack direction="row" gap={2}>
                <AccountsList
                    accounts={accounts}
                    selectedAccountId={selectedAccountId}
                    mainAccountNumber={mainAccountNumber}
                    onSelectAccount={setSelectedAccountId}
                    onRemoveAccount={handleRemoveAccount}
                    onSetMainAccount={handleSetMainAccount}
                    onOpenAddDialog={() => setAddDialogOpen(true)}
                    canAdd={availableAccounts.length > 0}
                />
                <TransactionsTable account={selectedAccount} />
            </Stack>

            <AddAccountDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                availableAccounts={availableAccounts}
                onAdd={handleAddAccount}
            />
        </Root>
    );
};

export default BankingTab;
