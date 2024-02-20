import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ITransaction } from '../../../models/banking';
import { IUserPublic } from '../../../models/user';
import { useUserService } from '../../../shared/services/user.service';

import './transaction.scss';

export const Transaction: FC<{ transaction: ITransaction }> = ({
    transaction
}) => {
    const { currentUser, getUserById } = useUserService();
    const [otherParty, setOtherParty] = useState<IUserPublic | null>(null);

    useEffect(
        function fetchOtherParty() {
            const otherPartyId =
                transaction.to === currentUser?.id
                    ? transaction.from
                    : transaction.to;
            getUserById(otherPartyId, 'public').then(setOtherParty);
        },
        [transaction, currentUser]
    );

    const sign = transaction.to === currentUser?.id ? '+' : '-';

    return (
        <motion.li className="transaction">
            <span className="transaction__direction"></span>
            <div className="transaction__meta">
                <span className="transaction__other-party">
                    {otherParty?.name}
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
