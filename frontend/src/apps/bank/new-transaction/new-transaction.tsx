import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { UserSelect } from '../../../shared/user-select/user-select';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useBankingService } from '../../../shared/services/banking.service';
import { Controls } from '../../../shared/components/controls/controls';
import { AccountType } from '../../../models/banking';

import './new-transaction.scss';

export const NewTransaction: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [amount, setAmount] = useState<number>(0);
    const [lockButton, setLockButton] = useState<boolean>(false);
    const [transferTitle, setTransferTitle] = useState<string>('');
    const [selectedHandle, setSelectedHandle] = useState<string[] | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<AccountType>(
        (state?.defaultAccountType as AccountType) ?? AccountType.PRIVATE
    );
    const { accounts, sendTransfer } = useBankingService();

    const onTransfer = async () => {
        if (!selectedHandle || !selectedHandle.length) return;

        setLockButton(true);
        try {
            await sendTransfer(
                selectedHandle[0],
                amount,
                transferTitle,
                selectedAccount
            );
            navigate('/bank');
        } catch (error) {
            console.error('Transfer failed:', error);
        } finally {
            setLockButton(false);
        }
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
                    value={selectedAccount}
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
                onSelection={setSelectedHandle}
                allowFindingSelf={true}
                includeFactions={true}
            />
            <BigButton
                onClick={() => onTransfer()}
                disabled={!amount || !selectedHandle || lockButton}
                text={intl.formatMessage({ id: 'TRANSFER' })}
            />
        </div>
    );
};
