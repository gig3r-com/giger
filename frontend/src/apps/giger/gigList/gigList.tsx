import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IGigListProps } from './gigList.model';
import { GigStatus } from '../../../models/gig';
import { NoGigFound } from '../no-gig-found/no-gig-found';
import { useUserService } from '../../../shared/services/user.service';
import { RootState } from '../../../store/store';
import { useGigsService } from '../../../shared/services/gigs.service';
import { GigHeader } from '../gig/gig-header/gig-header';

import './gigList.scss';

export const GigList: FC<IGigListProps> = ({ toggleMenuState }) => {
    const { currentUser } = useUserService();
    const { filteredGigs } = useGigsService();
    const fetchingGigs = useSelector(
        (state: RootState) => state.gigs.fetchingGigs
    );
    const intl = useIntl();

    const sortedGigs = useMemo(
        () =>
            [...filteredGigs].sort((a, b) => {
                const aPriority =
                    a.authorId === currentUser?.id &&
                    a.status !== GigStatus.EXPIRED &&
                    a.status !== GigStatus.COMPLETED;
                const bIsOwn =
                    b.authorId === currentUser?.id &&
                    b.status !== GigStatus.EXPIRED &&
                    b.status !== GigStatus.COMPLETED;
                const statusesRank = {
                    [GigStatus.DISPUTE]: 0,
                    [GigStatus.PENDING_CONFIRMATION]: 1,
                    [GigStatus.IN_PROGRESS]: 2,
                    [GigStatus.AVAILABLE]: 3,
                    [GigStatus.COMPLETED]: 4,
                    [GigStatus.EXPIRED]: 5
                };
                const aScore = aPriority ? -1 : statusesRank[a.status];
                const bScore = bIsOwn ? -1 : statusesRank[b.status];

                if (aScore !== bScore) {
                    return aScore - bScore;
                } else {
                    return dayjs(b.createdAt).diff(a.createdAt);
                }
            }),
        [filteredGigs, currentUser]
    );

    return (
        <section className="gig-list">
            <span className="gig-list__top">
                <span className="gig-list__count">{`${filteredGigs.length} ${
                    filteredGigs.length > 1 || filteredGigs.length === 0
                        ? intl.formatMessage({ id: 'GIG_PLURAL' })
                        : intl.formatMessage({ id: 'GIG_SINGULAR' })
                }`}</span>
                <span
                    className="gig-list__filter-button"
                    onClick={toggleMenuState}
                >
                    <FormattedMessage id="FILTERS" />
                </span>
            </span>
            {filteredGigs.length === 0 && !fetchingGigs && <NoGigFound />}
            <motion.ul className="gig-list__list">
                <AnimatePresence>
                    {sortedGigs.map((gig, i) => (
                        <GigHeader
                            gig={gig}
                            delayMultiplier={i}
                            key={gig.id}
                            mode="list"
                        />
                    ))}
                </AnimatePresence>
            </motion.ul>
        </section>
    );
};
