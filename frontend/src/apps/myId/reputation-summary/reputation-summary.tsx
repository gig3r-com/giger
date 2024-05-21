import { FC, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useUserService } from '../../../shared/services/user.service';
import GigReputation from '../../giger/gig-reputation/gig-reputation';
import { GigCategoryNames } from '../../../models/gig';
import { IReputationLevels } from '../../../models/user';

import './reputation-summary.scss';

export const ReputationSummary: FC<{ reputation: IReputationLevels }> = ({
    reputation
}) => {
    const { currentUser } = useUserService();
    const reps = useMemo(
        () => Object.keys(currentUser?.gigReputation ?? {}),
        [currentUser]
    );

    const getLevel = (categoryName: GigCategoryNames) => {
        return ((reputation ?? currentUser?.gigReputation)?.[
            categoryName as GigCategoryNames
        ] ?? 0) as 0 | 1 | 2 | 3 | 4 | 5;
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
                            <FormattedMessage id={category} />
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
