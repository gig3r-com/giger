import classNames from 'classnames';
import { FC, useState } from 'react';
import './edit-gig.scss';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { Controls } from '../../../shared/components/controls/controls';
import { useReportProblem } from '../../../shared/services/reportProblem.service';
import { useIntl } from 'react-intl';
import { GigCategoryNames } from '../../../models/gig';
import { categories } from '../categories';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { useNavigate, useParams } from 'react-router';


export const EditGig: FC<{
    active: boolean;
}> = ({ active }) => {
    const wrapperClassnames = classNames({
        'edit-gig': true,
        'edit-gig--active': active
    });
    const { onBack } = useReportProblem();
    const intl = useIntl();
    const [payout, setPayout] = useState<number>(0);
    const [privateMessage, setPrivateMessage] = useState<string>('');
    const [publicDescription, setPublicDescription] = useState<string>('');
    const [gigName, setGigName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<
        GigCategoryNames | ''
    >('');
    const navigate = useNavigate();
    const { gigId } = useParams();

    const handleEditGig = () => {
        setGigName('');
        setPublicDescription('');
        setPrivateMessage('');
        setPayout(0);
        setSelectedCategory('');
    };

    return (
        <section className={wrapperClassnames}>
            <Controls leftSideOption="back" onLeftSideClick={onBack} />
            <input
                type="text"
                className="edit-gig__input"
                placeholder={intl.formatMessage({ id: 'GIG_NAME' })}
                value={gigName}
                onChange={(event) => setGigName(event.target.value)}
            />
            <select
                className="edit-gig__input"
                value={selectedCategory}
                onChange={(event) =>
                    setSelectedCategory(event.target.value as GigCategoryNames)
                }
            >
                <option value={''}>
                    <MemoizedFormattedMessage id="CHOOSE_CATEGORY" />
                </option>
                {categories.map((category) => (
                    <option key={category.type} value={category.type}>
                        {category.type}
                    </option>
                ))}
            </select>
            <select
                className="edit-gig__input"
                value="Public identity"
                onChange={() => {}}
            ></select>
            <textarea
                className="edit-gig__input"
                placeholder={intl.formatMessage({ id: 'PUBLIC_DESC' })}
                value={publicDescription}
                onChange={(event) => setPublicDescription(event.target.value)}
            />
            <textarea
                className="edit-gig__input"
                placeholder="Private message to the contractor"
                value={privateMessage}
                onChange={(event) => setPrivateMessage(event.target.value)}
            />
            <input
                className="edit-gig__input"
                type="number"
                placeholder={intl.formatMessage({ id: 'PAYOUT' })}
                value={payout}
                onChange={(event) => setPayout(parseInt(event.target.value))}
            />
            <input
                className="edit-gig__input"
                type="number"
                placeholder={'Reputation'}
                value={'Reputation'}
                onChange={() => {}}
            />
            <BigButton
                color="primary"
                text={intl.formatMessage({ id: 'SAVE_CHANGES' })}
                onClick={handleEditGig}
            />
        </section>
    );
};
