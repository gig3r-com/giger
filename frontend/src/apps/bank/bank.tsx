import { FC, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useBankingService } from '../../shared/services/banking.service';
import { BigButton } from '../../shared/components/big-button/big-button';
import { Transaction } from './transaction/transaction';
import { Cards } from './cards/cards';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AccountType, IAccount } from '../../models/banking';

import './bank.scss';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { standardTimingFunction } from '../../shared/constants';

export const Bank: FC = () => {
    const intl = useIntl();
    const { accounts, fetchAccounts } = useBankingService();
    const [account, setAccount] = useState<IAccount | undefined>(undefined);
    const showCards = useMemo(
        () => accounts.private && accounts.business,
        [accounts]
    );

    const balanceClasses = (type: AccountType) =>
        classNames({
            [`bank__${type}-balance`]: true,
            [`bank__${type}-balance--active`]: account?.type === type
        });

    useEffect(function fetchAccountsOnMount() {
        fetchAccounts();
    }, []);

    useEffect(
        function setAccountAfterFetching() {
            accounts.private && !account && setAccount(accounts.private);
        },
        [accounts, account]
    );

    return (
        <article className="bank">
            <span className="bank__balance-label">
                <MemoizedFormattedMessage id="ACCOUNT_BALANCE" />
            </span>
            <div className="bank__balance">
                {accounts.private && (
                    <span className={balanceClasses(AccountType.PRIVATE)}>
                        {accounts.private.balance.toFixed(2)} ¤
                    </span>
                )}
                {accounts.business && (
                    <span className={balanceClasses(AccountType.BUSINESS)}>
                        {accounts.business.balance.toFixed(2)} ¤
                    </span>
                )}
            </div>

            {showCards && (
                <Cards
                    accounts={[accounts.private!, accounts.business!]}
                    onAccountChange={setAccount}
                />
            )}

            <BigButton
                text={intl.formatMessage({ id: 'TRANSFER' })}
                color="primary"
                onClick={() => {}}
            />

            <h4 className="bank__transfer-history-label">
                <MemoizedFormattedMessage id="TRANSFER_HISTORY" />
            </h4>
            <AnimatePresence mode='sync'>
                {account && <motion.ol 
                    className="bank__transactions" 
                    key={account?.id}

                    transition={{ ease: standardTimingFunction, duration: 3.2 }}
                >
                    {account?.transactions.map((transaction) => (
                        <Transaction
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))}
                </motion.ol>}
            </AnimatePresence>
        </article>
    );
};
