import { FC, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import {
    GigCategoryNames,
    GigRepuation,
    IDraftGig,
    reputationLabels
} from '../../../models/gig';
import { categories } from '../categories';
import { INewGigProps } from './new-gig.model';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { useGigsService } from '../../../shared/services/gigs.service';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { Controls } from '../../../shared/components/controls/controls';

import './new-gig.scss';

export const NewGig: FC<INewGigProps> = ({ active }) => {
    const navigate = useNavigate();
    const intl = useIntl();
    const { addNewGig } = useGigsService();
    const [gigName, setGigName] = useState<string>('');
    const [publicDescription, setPublicDescription] = useState<string>('');
    const [privateMessage, setPrivateMessage] = useState<string>('');
    const [payout, setPayout] = useState<number>(0);
    const [selectedRepuation, setSelectedReputation] = useState<
        GigRepuation | -1
    >(-1);
    const [selectedCategory, setSelectedCategory] = useState<
        GigCategoryNames | ''
    >('');

    const wrapperClassnames = classNames({
        'new-gig': true,
        'new-gig--active': active
    });

    const gigReady = useMemo(() => {
        return (
            gigName !== '' &&
            publicDescription !== '' &&
            privateMessage !== '' &&
            payout !== 0 &&
            payout !== undefined &&
            selectedRepuation !== -1 &&
            selectedCategory !== ''
        );
    }, [gigName, publicDescription, privateMessage, payout, selectedCategory, selectedRepuation]);

    const newGig: IDraftGig | undefined = useMemo(() => {
        return gigReady
            ? {
                  title: gigName!,
                  description: publicDescription!,
                  message: privateMessage,
                  payout: payout!,
                  reputationRequired: selectedRepuation as GigRepuation,
                  category: selectedCategory! as GigCategoryNames,
                  id: uuidv4()
              } as IDraftGig
            : undefined;
    }, [
        gigName,
        publicDescription,
        privateMessage,
        payout,
        selectedRepuation,
        selectedCategory,
        gigReady
    ]);

    const handleAddingNewGig = () => {
        setGigName('');
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
            <input
                type="text"
                className="new-gig__input"
                placeholder={intl.formatMessage({ id: 'GIG_NAME' })}
                value={gigName}
                onChange={(event) => setGigName(event.target.value)}
            />

            <select
                className="new-gig__input"
                value={selectedCategory}
                onChange={(event) =>
                    setSelectedCategory(event.target.value as GigCategoryNames)
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
                value={selectedRepuation}
                onChange={(event) =>
                    setSelectedReputation(
                        parseInt(event.target.value) as GigRepuation
                    )
                }
            >
                <option value={-1} disabled hidden>
                    {intl.formatMessage({ id: 'CHOOSE_REPUTATION' })}
                </option>
                {[0, 1, 2, 3, 4, 5].map((reputation) => (
                    <option key={reputation} value={reputation}>
                        {intl.formatMessage({
                            id: reputationLabels.get(reputation as GigRepuation)
                        })}
                    </option>
                ))}
            </select>

            <textarea
                className="new-gig__input"
                placeholder={intl.formatMessage({ id: 'PUBLIC_DESC' })}
                value={publicDescription}
                onChange={(event) => setPublicDescription(event.target.value)}
            />

            <textarea
                className="new-gig__input"
                placeholder="Private message to the contractor"
                value={privateMessage}
                onChange={(event) => setPrivateMessage(event.target.value)}
            />

            <input
                type="number"
                placeholder={intl.formatMessage({ id: 'PAYOUT' })}
                value={payout}
                onChange={(event) => setPayout(parseInt(event.target.value))}
            />

            <BigButton
                disabled={!gigReady}
                color="primary"
                text={intl.formatMessage({ id: 'ADD_GIG' })}
                onClick={handleAddingNewGig}
            />
        </section>
    );
};
