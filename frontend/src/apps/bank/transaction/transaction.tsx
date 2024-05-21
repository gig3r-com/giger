import { FC } from 'react';
import { motion } from 'framer-motion';
import { AccountType, ITransaction } from '../../../models/banking';
import { useUserService } from '../../../shared/services/user.service';
import { useBankingService } from '../../../shared/services/banking.service';
import IncomingTransfer from '../../../assets/incoming.svg?react';
import OutgoingTransfer from '../../../assets/outgoing.svg?react';

import './transaction.scss';

export const Transaction: FC<{
    transaction: ITransaction;
    accountType: AccountType;
}> = ({ transaction, accountType }) => {
    const { currentUser, getCurrentUserFaction } = useUserService();
    const { getAccountHolderName } = useBankingService();
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
                <span className="transaction__other-party">
                    {getAccountHolderName(otherParty)}
                </span>
                <span className="transaction__title">
                    {transaction.title ?? 'No title'}
                </span>
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
