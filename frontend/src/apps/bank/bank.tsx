import { FC, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useBankingService } from '../../shared/services/banking.service';
import { BigButton } from '../../shared/components/big-button/big-button';
import { Transaction } from './transaction/transaction';
import { Cards } from './cards/cards';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AccountType, IAccount, ITransaction } from '../../models/banking';
import { standardTimingFunction } from '../../shared/constants';
import { LoadingBar } from '../../shared/components/loading-bar/loading-bar';

import './bank.scss';

export const Bank: FC = () => {
    const location = useLocation();
    const intl = useIntl();
    const navigate = useNavigate();
    const { accounts, fetchAccounts } = useBankingService();
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState<IAccount | undefined>(undefined);
    const showCards = useMemo(
        () => accounts.private || accounts.business,
        [accounts]
    );

    const balanceClasses = (type: AccountType) =>
        classNames({
            [`bank__${type.toLocaleLowerCase()}-balance`]: true,
            [`bank__${type.toLocaleLowerCase()}-balance--active`]:
                account?.type === type
        });

    const transfer = () => navigate('/bank/new', { state: { defaultAccountType: account?.type } });

    const cardAccounts = useMemo(() => {
        return Object.values(accounts).filter(
            (acc) => acc !== undefined && acc !== null
        ) as IAccount[];
    }, [accounts]);

    const sortedTransactions = (transactions: ITransaction[]) => {
        return [...transactions].sort((a, b) =>
            dayjs(b.timestamp).diff(a.timestamp)
        );
    };

    useEffect(function fetchAccountsOnMount() {
        setLoading(true);
        fetchAccounts().then(() => setLoading(false));
    }, []);

    useEffect(
        function setAccountAfterFetching() {
            accounts.private && !account && setAccount(accounts.private);
        },
        [accounts, account]
    );

    return (
        <>
            {location.pathname === '/bank' && (
                <article className="bank">
                    <span className="bank__balance-label">
                        <MemoizedFormattedMessage id="ACCOUNT_BALANCE" />
                    </span>
                    <div className="bank__balance">
                        {accounts.private && (
                            <span
                                className={balanceClasses(AccountType.PRIVATE)}
                            >
                                {accounts.private?.balance.toFixed(2) ?? '-'} ¤
                            </span>
                        )}
                        {accounts.business && (
                            <span
                                className={balanceClasses(AccountType.BUSINESS)}
                            >
                                {accounts.business?.balance.toFixed(2) ?? '-'} ¤
                            </span>
                        )}
                    </div>

                    {showCards && (
                        <Cards
                            accounts={cardAccounts}
                            onAccountChange={setAccount}
                        />
                    )}

                    <BigButton
                        text={intl.formatMessage({ id: 'TRANSFER' })}
                        color="primary"
                        onClick={() => transfer()}
                    />

                    <h4 className="bank__transfer-history-label">
                        <MemoizedFormattedMessage id="TRANSFER_HISTORY" />
                    </h4>
                    <AnimatePresence mode="sync">
                        {account && (
                            <motion.ol
                                className="bank__transactions"
                                key={account?.id}
                                transition={{
                                    ease: standardTimingFunction,
                                    duration: 3.2
                                }}
                            >
                                {account &&
                                    sortedTransactions(
                                        account.transactions
                                    ).map((transaction) => (
                                        <Transaction
                                            key={transaction.id}
                                            transaction={transaction}
                                            accountType={account.type}
                                        />
                                    ))}
                            </motion.ol>
                        )}
                    </AnimatePresence>

                    {loading && (
                        <LoadingBar isLoading={loading} text="LOADING" />
                    )}
                </article>
            )}
            <Outlet />
        </>
    );
};
