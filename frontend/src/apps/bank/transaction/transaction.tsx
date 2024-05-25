import { FC, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { AccountType, ITransaction } from '../../../models/banking';
import IncomingTransfer from '../../../assets/incoming.svg?react';
import OutgoingTransfer from '../../../assets/outgoing.svg?react';
import { useBankingService } from '../../../shared/services/banking.service';
import { useDispatch } from 'react-redux';
import { setSeenTransferHash } from '../../../store/bank.slice';

import './transaction.scss';

export const Transaction: FC<{
    transaction: ITransaction;
    accountType: AccountType;
}> = ({ transaction, accountType }) => {
    const dispatch = useDispatch();
    const { accounts, isNewTransaction } = useBankingService();
    const currentNumber = useMemo(() => {
        return accountType === AccountType.PRIVATE
            ? accounts.private?.accountNumber
            : accounts.business?.accountNumber;
    }, [accounts, accountType]);
    const sign = transaction.to === currentNumber ? '+' : '-';
    const otherParty =
        transaction.to === currentNumber
            ? transaction.fromUser
            : transaction.toUser;
    const image =
        transaction.to !== currentNumber ? (
            <OutgoingTransfer />
        ) : (
            <IncomingTransfer />
        );

    useEffect(() => {
        return () => {
            dispatch(setSeenTransferHash({ id: transaction.id }));
        };
    }, []);

    return (
        <motion.li className="transaction">
            <span className="transaction__direction">{image}</span>
            <div className="transaction__meta">
                <span className="transaction__heading">
                    <span className="transaction__other-party">
                        {otherParty}
                    </span>
                    {isNewTransaction(transaction.id) && (
                        <span className="transaction__is-new">
                            <FormattedMessage id="NEW" />
                        </span>
                    )}
                </span>
                <span className="transaction__title">
                    {transaction.title ?? 'No title'}
                </span>
                {accountType === AccountType.BUSINESS &&
                    transaction.orderingParty && (
                        <span className="transaction__title">
                            <FormattedMessage id="ORDERING_PARTY" />:{' '}
                            {transaction.orderingParty}
                        </span>
                    )}
                <span className="transaction__date">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                </span>
            </div>
            <span className="transaction__amount">
                {sign}
                {transaction.amount} ¤
            </span>
        </motion.li>
    );
};
