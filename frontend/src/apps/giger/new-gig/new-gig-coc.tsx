import { FC, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { GigModes, IDraftGig } from '../../../models/gig';
import { INewGigProps } from './new-gig.model';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { useGigsService } from '../../../shared/services/gigs.service';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { Controls } from '../../../shared/components/controls/controls';
import { Slider } from '../../../shared/components/slider/slider';
import { useBankingService } from '../../../shared/services/banking.service';
import { AccountType } from '../../../models/banking';
import { useUserService } from '../../../shared/services/user.service';

import './new-gig.scss';

export const NewGig: FC<INewGigProps> = ({ active }) => {
    const navigate = useNavigate();
    const intl = useIntl();
    const { currentPrivateBalance, currentBusinessBalance } =
        useBankingService();
    const { currentUser } = useUserService();
    const { addNewGig, gigerCommission } = useGigsService();
    const [fromAccount] = useState<AccountType>(AccountType.PRIVATE);
    const [gigName, setGigName] = useState<string>('');
    const [anonymize, setAnonymize] = useState<'YES' | 'NO' | ''>('');
    const [publicDescription, setPublicDescription] = useState<string>('');
    const [privateMessage, setPrivateMessage] = useState<string>('');
    const [payout, setPayout] = useState<number>(0);
    const [mode, setMode] = useState<GigModes | ''>('');
    const [notEnoughMoneyWarning, setNotEnoughMoneyWarning] =
        useState<boolean>(false);

    const wrapperClassnames = classNames({
        'new-gig': true,
        'new-gig--active': active
    });

    const onPayoutChange = (payout: number) => {
        checkBalance();
        setPayout(payout);
    };

    const checkBalance = useCallback(() => {
        const balance =
            fromAccount === AccountType.PRIVATE
                ? currentPrivateBalance
                : currentBusinessBalance;
        const hasEnoughMoney = payout + payout * gigerCommission <= balance;
        setNotEnoughMoneyWarning(!hasEnoughMoney && mode === GigModes.CLIENT);
    }, [
        currentBusinessBalance,
        currentPrivateBalance,
        fromAccount,
        gigerCommission,
        mode,
        payout
    ]);

    const step = 100;

    const gigReady = useMemo(() => {
        checkBalance();
        return (
            gigName.trim() !== '' &&
            anonymize !== '' &&
            publicDescription !== '' &&
            privateMessage !== '' &&
            payout !== 0 &&
            payout !== undefined &&
            mode !== ''
        );
    }, [
        gigName,
        anonymize,
        publicDescription,
        privateMessage,
        payout,
        mode,
        checkBalance
    ]);

    const newGig: IDraftGig | undefined = useMemo(() => {
        return gigReady
            ? ({
                  title: gigName!,
                  description: publicDescription!,
                  descriptionDetailed: privateMessage,
                  payout: payout!,
                  isAnonymizedAuthor: anonymize === 'YES',
                  fromAccount: fromAccount as AccountType,
                  mode: mode as GigModes,
                  authorName: currentUser?.handle,
                  id: uuidv4()
              } as IDraftGig)
            : undefined;
    }, [
        gigReady,
        gigName,
        publicDescription,
        privateMessage,
        payout,
        anonymize,
        fromAccount,
        mode,
        currentUser?.handle
    ]);

    const handleAddingNewGig = async () => {
        setGigName('');
        setAnonymize('');
        setPublicDescription('');
        setPrivateMessage('');
        setPayout(0);
        await addNewGig(newGig!);
        navigate('/giger');
    };

    return (
        <section className={wrapperClassnames}>
            <Controls leftSideOption="back" />
            <div className="new-gig__inputs">
                <input
                    type="text"
                    className="new-gig__input"
                    placeholder={intl.formatMessage({ id: 'GIG_NAME' })}
                    value={gigName}
                    maxLength={25}
                    onChange={(event) => setGigName(event.target.value)}
                />

                <select
                    className="new-gig__input"
                    value={mode}
                    onChange={(event) =>
                        setMode(event.target.value as GigModes)
                    }
                >
                    <option value={''} disabled hidden>
                        <MemoizedFormattedMessage id="PROVIDER_OR_CLIENT" />
                    </option>
                    <option value={GigModes.PROVIDER}>
                        <MemoizedFormattedMessage id="PROVIDER_WITH_EXPLANATION" />
                    </option>
                    <option value={GigModes.CLIENT}>
                        <MemoizedFormattedMessage id="CLIENT_WITH_EXPLANATION" />
                    </option>
                </select>

                <textarea
                    className="new-gig__input"
                    placeholder={intl.formatMessage({ id: 'PUBLIC_DESC' })}
                    value={publicDescription}
                    rows={3}
                    onChange={(event) =>
                        setPublicDescription(event.target.value)
                    }
                />

                <Slider
                    min={0}
                    max={50000}
                    value={payout}
                    className="new-gig__slider"
                    step={step}
                    showValue={true}
                    showMax={true}
                    showMin={true}
                    label={intl.formatMessage({ id: 'PAYOUT' })}
                    onChange={(value) => onPayoutChange(value)}
                />

                <span className="new-gig__total">
                    {mode === GigModes.CLIENT && (
                        <>
                            <span className="new-gig__total-desc">
                                {intl.formatMessage({
                                    id: 'TOTAL_DESC_CLIENT'
                                })}
                            </span>
                            <span className="new-gig__total-value">
                                {payout + payout * gigerCommission}{' '}
                            </span>
                        </>
                    )}
                    {mode === GigModes.PROVIDER && (
                        <>
                            <span className="new-gig__total-desc">
                                {intl.formatMessage({
                                    id: 'TOTAL_DESC_PROVIDER'
                                })}
                            </span>

                            <span className="new-gig__total-value">
                                {payout}{' '}
                            </span>
                        </>
                    )}
                </span>

                {notEnoughMoneyWarning && (
                    <p className="new-gig__warning">
                        {intl.formatMessage({ id: 'NOT_ENOUGH_MONEY' })}
                    </p>
                )}

                <BigButton
                    disabled={!gigReady}
                    color="primary"
                    text={intl.formatMessage({ id: 'ADD_GIG' })}
                    onClick={handleAddingNewGig}
                />
            </div>
        </section>
    );
};
