import { FC } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { AccountType, ITransaction } from '../../../models/banking';
import { useUserService } from '../../../shared/services/user.service';
import IncomingTransfer from '../../../assets/incoming.svg?react';
import OutgoingTransfer from '../../../assets/outgoing.svg?react';

import './transaction.scss';

export const Transaction: FC<{
    transaction: ITransaction;
    accountType: AccountType;
}> = ({ transaction, accountType }) => {
    const { currentUser, getCurrentUserFaction } = useUserService();
    const sign = transaction.to === currentUser?.id ? '+' : '-';
    const ownId =
        accountType === AccountType.PRIVATE
            ? currentUser?.id
            : getCurrentUserFaction();
    const otherParty =
        transaction.to === ownId ? transaction.fromUser : transaction.toUser;
    const image =
        transaction.to === ownId ? <OutgoingTransfer /> : <IncomingTransfer />;

    return (
        <motion.li className="transaction">
            <span className="transaction__direction">{image}</span>
            <div className="transaction__meta">
                <span className="transaction__other-party">{otherParty}</span>
                <span className="transaction__title">
                    {transaction.title ?? 'No title'}
                </span>
                {transaction.orderingParty && (
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
