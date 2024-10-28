import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { UserSelect } from '../../../shared/user-select/user-select';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useBankingService } from '../../../shared/services/banking.service';
import { Controls } from '../../../shared/components/controls/controls';
import { AccountType } from '../../../models/banking';

import './new-transaction.scss';
import { useHashService } from '../../../shared/services/hash.service';

export const NewTransaction: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { hashParams, setupStateChanger, setHash } = useHashService();
    const [amount, setAmount] = useState<number>(Number(hashParams.amount) || 0);
    const [lockButton, setLockButton] = useState<boolean>(false);
    const [transferTitle, setTransferTitle] = useState<string>(hashParams.transferTitle || '');
    const [selectedHandle, setSelectedHandle] = useState<string | null>(hashParams.selectedHandle || null);
    const [selectedAccount, setSelectedAccount] = useState<AccountType>(
        (state?.defaultAccountType as AccountType) ?? AccountType.PRIVATE
    );
    const { accounts, sendTransfer, fetchAccounts } = useBankingService();
    const handleSetAmount = setupStateChanger('amount', setAmount);
    const handleSetTitle = setupStateChanger('transferTitle', setTransferTitle);
    const handleSetSelectedHandle = (value) => {
        setHash('selectedHandle', value?.[0] ?? null);
        setSelectedHandle(value[0])
    }
    const handleSetSelectedAccount = setupStateChanger('selectedAccount', setSelectedAccount);

    const onTransfer = async () => {
        if (!selectedHandle || !selectedHandle.length) return;

        setLockButton(true);
        await sendTransfer(
            selectedHandle[0],
            amount,
            transferTitle,
            selectedAccount
        );
        fetchAccounts();
        setLockButton(false);
        navigate('/bank');
    };

    const onAmountChanged = (val: string): void => {
        const value = parseInt(val);
        handleSetAmount(Number.isNaN(value) ? null : value);
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
                onChange={(event) => handleSetTitle(event.target.value)}
            />
            {hasBusinessAccount && (
                <select
                    value={selectedAccount}
                    onChange={(event) =>
                        handleSetSelectedAccount(event.target.value as AccountType)
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
                onSelection={handleSetSelectedHandle}
                initialSelected={selectedHandle ? [selectedHandle] : undefined}
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
