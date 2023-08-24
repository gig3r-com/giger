import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useBankingService } from '../../shared/services/banking.service';
import { BigButton } from '../../shared/components/big-button/big-button';
import { Transaction } from './transaction/transaction';
import { Card } from './card/card';
import MemoizedFormattedMessage from 'react-intl/src/components/message';

import './bank.scss';
import { IAccount } from '../../models/banking';

export const Bank: FC = () => {
    const intl = useIntl();
    const { accounts, fetchAccounts } = useBankingService();
    const [account, setAccount] = useState<IAccount | undefined>(undefined);

    useEffect(function fetchAccountsOnMount() {
        fetchAccounts();
    }, []);

    useEffect(function setAccountAfterFetching() {
        accounts.private && !account && setAccount(accounts.private);
    }, [accounts, account]);

    return (
        <article className="bank">
            <span className="bank__balance-label">
                <MemoizedFormattedMessage id="ACCOUNT_BALANCE" />
            </span>
            <div className="bank__balance">{account?.balance.toFixed(2)} ¤</div>

            <Card />
            <BigButton
                text={intl.formatMessage({ id: 'TRANSFER' })}
                color="primary"
                onClick={() => {}}
            />

            <h4 className="bank__transfer-history-label">
                <MemoizedFormattedMessage id="TRANSFER_HISTORY" />
            </h4>
            <ol className="bank__transactions">
                {account?.transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </ol>
        </article>
    );
};
