import { useMemo } from 'react';
import { GigCategoryNames } from '../../../models/gig';
import { useUserService } from '../../../shared/services/user.service';
import GigReputation from '../../giger/gig-reputation/gig-reputation';
import { useGigsService } from '../../../shared/services/gigs.service';

import './reputation-summary.scss';
import { FormattedMessage } from 'react-intl';

export const ReputationSummary = () => {
    const { currentUser } = useUserService();
    const { getReputationLevel } = useGigsService();
    const reps = useMemo(
        () => Object.keys(currentUser?.gigReputation ?? {}),
        [currentUser]
    );
    const getLevel = (category: GigCategoryNames) => {
        const cashAmount = currentUser
            ? currentUser.gigReputation[category]
            : 0;
        return getReputationLevel(cashAmount);
    };

    return (
        <>
            <span className="reputation-summary__title">
                <FormattedMessage id="GIGER_REPUTATION" />
            </span>
            <ul className="reputation-summary__list">
                {reps.map((category) => (
                    <li key={category} className="reputation-summary__entry">
                        <span className="reputation-summary__label">
                            {category}
                        </span>
                        <GigReputation
                            reputation={getLevel(category as GigCategoryNames)}
                            color="primary"
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
