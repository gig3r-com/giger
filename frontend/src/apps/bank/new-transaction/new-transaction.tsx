import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { UserSelect } from '../../../shared/user-select/user-select';
import { IUserBase } from '../../../models/user';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useBankingService } from '../../../shared/services/banking.service';
import { Controls } from '../../../shared/components/controls/controls';
import { AccountType } from '../../../models/banking';

import './new-transaction.scss';

export const NewTransaction: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number>(0);
    const [transferTitle, setTransferTitle] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<IUserBase[] | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<AccountType>(
        AccountType.PRIVATE
    );
    const { accounts, sendTransfer } = useBankingService();

    const onTransfer = async () => {
        await sendTransfer(
            selectedUser![0].handle,
            amount,
            transferTitle,
            selectedAccount
        );
        navigate('/bank');
    };

    const onAmountChanged = (val: string): void => {
        const value = parseInt(val);
        setAmount(Number.isNaN(value) ? 0 : value);
    };

    const hasBusinessAccount = !!accounts.business;

    return (
        <div className="new-transaction">
            <Controls leftSideOption="back" />
            <input
                type="number"
                placeholder={intl.formatMessage({ id: 'AMOUNT' })}
                value={amount}
                onChange={(event) => onAmountChanged(event.target.value)}
            />
            <input
                type="text"
                placeholder={intl.formatMessage({ id: 'TITLE' })}
                value={transferTitle}
                onChange={(event) => setTransferTitle(event.target.value)}
            />
            {hasBusinessAccount && (
                <select
                    onChange={(event) =>
                        setSelectedAccount(event.target.value as AccountType)
                    }
                >
                    <option value={AccountType.PRIVATE}>
                        {intl.formatMessage({ id: 'PRIVATE' })}
                    </option>
                    <option value={AccountType.BUSINESS}>
                        {intl.formatMessage({ id: 'BUSINESS' })}
                    </option>
                </select>
            )}
            <UserSelect
                mode="single"
                onSelection={(val) => setSelectedUser(val)}
            />
            <BigButton
                onClick={() => onTransfer()}
                disabled={!amount || !selectedUser}
                text={intl.formatMessage({ id: 'TRANSFER' })}
            />
        </div>
    );
};
