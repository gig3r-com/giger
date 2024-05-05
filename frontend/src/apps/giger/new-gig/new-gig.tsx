import { FC, useMemo, useState } from 'react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import {
    GigCategoryNames,
    GigModes,
    GigRepuationLevels,
    GigSubcategoryNames,
    IDraftGig,
    reputationLabels
} from '../../../models/gig';
import { categories } from '../categories';
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
    const { currentPrivateBalance, currentBusinessBalance, hasCompanyAccount } =
        useBankingService();
    const { currentUser } = useUserService();
    const { addNewGig, gigerCommission } = useGigsService();
    const [fromAccount, setFromAccount] = useState<AccountType | ''>('');
    const [gigName, setGigName] = useState<string>('');
    const [anonymize, setAnonymize] = useState<'YES' | 'NO' | ''>('');
    const [publicDescription, setPublicDescription] = useState<string>('');
    const [privateMessage, setPrivateMessage] = useState<string>('');
    const [payout, setPayout] = useState<number>(0);
    const [mode, setMode] = useState<GigModes | ''>('');
    const [notEnoughMoneyWarning, setNotEnoughMoneyWarning] =
        useState<boolean>(false);
    const [selectedRepuation, setSelectedReputation] = useState<
        GigRepuationLevels | -1
    >(-1);
    const [selectedCategory, setSelectedCategory] = useState<
        GigCategoryNames | ''
    >('');
    const [selectedSubcategory, setSelectedSubcategory] = useState<
        GigSubcategoryNames | ''
    >('');

    const wrapperClassnames = classNames({
        'new-gig': true,
        'new-gig--active': active
    });

    const onPayoutChange = (payout: number) => {
        checkBalance();
        setPayout(payout);
    };

    const onCategoryChange = (category: GigCategoryNames) => {
        setSelectedCategory(category);
        const categoryData = categories.find((c) => c.type === category);
        setSelectedSubcategory(categoryData?.subcategories[0].type ?? '');
        setPayout(categoryData?.subcategories[0].minPayout ?? 0);
    };

    const onSubcategoryChange = (subcategory: GigSubcategoryNames) => {
        const categoryData = categories.find(
            (c) => c.type === selectedCategory
        );
        const subCatData = categoryData?.subcategories.find(
            (cat) => cat.type === subcategory
        );
        setSelectedSubcategory(subcategory);
        setPayout(subCatData?.minPayout ?? 0);
    };

    const subcategoryData = useMemo(() => {
        return categories
            .find((c) => c.type === selectedCategory)
            ?.subcategories.find((s) => s.type === selectedSubcategory);
    }, [selectedCategory, selectedSubcategory]);

    const checkBalance = () => {
        const balance =
            fromAccount === AccountType.PRIVATE
                ? currentPrivateBalance
                : currentBusinessBalance;
        const hasEnoughMoney = payout + payout * gigerCommission <= balance;
        setNotEnoughMoneyWarning(!hasEnoughMoney);
    };

    const getSubcategoryList = useMemo(() => {
        const categoryData = categories.find(
            (c) => c.type === selectedCategory
        );
        return categoryData?.subcategories ?? [];
    }, [selectedCategory]);

    const gigReady = useMemo(() => {
        return gigName !== '' &&
            anonymize !== '' &&
            publicDescription !== '' &&
            privateMessage !== '' &&
            payout !== 0 &&
            payout !== undefined &&
            selectedRepuation !== -1 &&
            selectedCategory !== '' &&
            selectedSubcategory !== '' &&
            hasCompanyAccount
            ? fromAccount !== ''
            : true && mode !== '';
    }, [
        gigName,
        anonymize,
        publicDescription,
        privateMessage,
        payout,
        selectedRepuation,
        selectedCategory,
        selectedSubcategory,
        hasCompanyAccount,
        fromAccount,
        mode
    ]);

    const newGig: IDraftGig | undefined = useMemo(() => {
        return gigReady
            ? ({
                  title: gigName!,
                  description: publicDescription!,
                  message: privateMessage,
                  payout: payout!,
                  anonymizedAuthor: anonymize === 'YES',
                  ...(hasCompanyAccount && {
                      fromAccount: fromAccount as AccountType
                  }),
                  reputationRequired: selectedRepuation as GigRepuationLevels,
                  subcategory: selectedSubcategory! as GigSubcategoryNames,
                  mode: mode as GigModes,
                  authorName: anonymize ? 'Anonymous' : currentUser?.handle,
                  category: selectedCategory! as GigCategoryNames,
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
        hasCompanyAccount,
        fromAccount,
        selectedRepuation,
        selectedSubcategory,
        mode,
        currentUser?.handle,
        selectedCategory
    ]);

    const handleAddingNewGig = () => {
        setGigName('');
        setAnonymize('');
        setPublicDescription('');
        setPrivateMessage('');
        setPayout(0);
        setSelectedReputation(-1);
        setSelectedCategory('');
        addNewGig(newGig!);
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
                    value={anonymize}
                    onChange={(event) =>
                        setAnonymize(event.target.value as 'YES' | 'NO' | '')
                    }
                >
                    <option value={''} disabled hidden>
                        <MemoizedFormattedMessage id="ANONYMIZE_HANDLE" />
                    </option>
                    <option value={'NO'}>
                        {intl.formatMessage({ id: 'NO' })}
                    </option>
                    <option value={'YES'}>
                        {intl.formatMessage({ id: 'YES' })}
                    </option>
                </select>

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
                        <MemoizedFormattedMessage id="PROVIDER" />
                    </option>
                    <option value={GigModes.CLIENT}>
                        <MemoizedFormattedMessage id="CLIENT" />
                    </option>
                </select>

                <select
                    className="new-gig__input"
                    value={fromAccount}
                    onChange={(event) => {
                        setFromAccount(event.target.value as AccountType);
                        checkBalance();
                    }}
                >
                    <option value={''} disabled hidden>
                        <MemoizedFormattedMessage id="SELECT_ACCOUNT" />
                    </option>
                    <option value={AccountType.PRIVATE}>
                        <MemoizedFormattedMessage id="PRIVATE" />
                    </option>
                    <option value={AccountType.BUSINESS}>
                        <MemoizedFormattedMessage id="BUSINESS" />
                    </option>
                </select>

                <select
                    className="new-gig__input"
                    value={selectedCategory}
                    onChange={(event) =>
                        onCategoryChange(event.target.value as GigCategoryNames)
                    }
                >
                    <option value={''} disabled hidden>
                        <MemoizedFormattedMessage id="CHOOSE_CATEGORY" />
                    </option>
                    {categories.map((category) => (
                        <option key={category.type} value={category.type}>
                            {category.type}
                        </option>
                    ))}
                </select>

                <select
                    className="new-gig__input"
                    value={selectedSubcategory}
                    disabled={selectedCategory === ''}
                    onChange={(event) =>
                        onSubcategoryChange(
                            event.target.value as GigSubcategoryNames
                        )
                    }
                >
                    <option value={''} disabled hidden>
                        <MemoizedFormattedMessage id="CHOOSE_SUBCATEGORY" />
                    </option>
                    {getSubcategoryList.map((category) => (
                        <option key={category.type} value={category.type}>
                            <FormattedMessage id={category.type} />
                        </option>
                    ))}
                </select>

                <select
                    className="new-gig__input"
                    value={selectedRepuation}
                    onChange={(event) =>
                        setSelectedReputation(
                            parseInt(event.target.value) as GigRepuationLevels
                        )
                    }
                >
                    <option value={-1} disabled hidden>
                        {intl.formatMessage({ id: 'CHOOSE_REPUTATION' })}
                    </option>
                    {[0, 1, 2, 3, 4, 5].map((reputation) => (
                        <option key={reputation} value={reputation}>
                            {intl.formatMessage({
                                id: reputationLabels.get(
                                    reputation as GigRepuationLevels
                                )
                            })}
                        </option>
                    ))}
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

                <textarea
                    className="new-gig__input"
                    placeholder="Private message to the contractor"
                    value={privateMessage}
                    rows={3}
                    onChange={(event) => setPrivateMessage(event.target.value)}
                />

                <Slider
                    min={subcategoryData?.minPayout ?? 0}
                    max={subcategoryData?.maxPayout ?? 50000}
                    value={payout}
                    className="new-gig__slider"
                    step={100}
                    showValue={true}
                    showMax={true}
                    showMin={true}
                    label={intl.formatMessage({ id: 'PAYOUT' })}
                    onChange={(value) => onPayoutChange(value)}
                />

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
