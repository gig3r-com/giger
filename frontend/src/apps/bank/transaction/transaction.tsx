import { FC } from 'react';
import { motion } from 'framer-motion';
import { ITransaction } from '../../../models/banking';
import { useAuthenticationService } from '../../../shared/services/authentication.service';
import { IUser } from '../../../models/user';

import './transaction.scss';

export const Transaction: FC<{ transaction: ITransaction }> = ({
    transaction
}) => {
    const { currentUser } = useAuthenticationService();

    const otherParty: IUser =
        transaction.to.id === currentUser().id
            ? transaction.from
            : transaction.to;

    const sign = transaction.to.id === currentUser().id ? '+' : '-';

    return (
        <motion.li
            className="transaction"
        >
            <span className="transaction__direction"></span>
            <div className="transaction__meta">
                <span className="transaction__other-party">
                    {otherParty.name}
                </span>
                <span className="transaction__date">
                    {new Date(transaction.date).toLocaleDateString()}
                </span>
            </div>
            <span className="transaction__amount">
                {sign}
                {transaction.amount} ¤
            </span>
        </motion.li>
    );
};
