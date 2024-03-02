import { FC } from 'react';
import { useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IGigListProps } from './gigList.model';
import { Gig } from '../gig/gig';
import { GigStatus } from '../../../models/gig';
import { Controls } from '../../../shared/components/controls/controls';
import { NoGigFound } from '../no-gig-found/no-gig-found';
import { useUserService } from '../../../shared/services/user.service';
import { RootState } from '../../../store/store';

import './gigList.scss';

export const GigList: FC<IGigListProps> = ({ gigs, toggleMenuState }) => {
    const { currentUser } = useUserService();
    const fetchingGigs = useSelector((state: RootState) => state.gigs.fetchingGigs);
    const { gigId } = useParams();
    const intl = useIntl();

    const sortedGigs = [...gigs].sort((a, b) => {
        const aIsOwn = a.authorId === currentUser?.id;
        const bIsOwn = b.authorId === currentUser?.id;
        const statusesRank = {
            [GigStatus.DISPUTE]: 0,
            [GigStatus.PENDING]: 1,
            [GigStatus.IN_PROGRESS]: 2,
            [GigStatus.AVAILABLE]: 3,
            [GigStatus.COMPLETED]: 4
        };
        const aScore = aIsOwn ? -1 : statusesRank[a.status];
        const bScore = bIsOwn ? -1 : statusesRank[b.status];

        return aScore - bScore;
    });

    return (
        <section className="gig-list">
            <Controls
                leftSideOption={
                    gigId
                        ? 'back'
                        : `${gigs.length} ${
                              gigs.length > 1 || gigs.length === 0
                                  ? intl.formatMessage({ id: 'GIG_PLURAL' })
                                  : intl.formatMessage({ id: 'GIG_PLURAL' })
                          }`
                }
                rightSideOption={gigId ? undefined : 'FILTERS'}
                onRightSideClick={gigId ? undefined : toggleMenuState}
            />
            {gigs.length === 0 && !fetchingGigs && <NoGigFound />}
            <motion.ul className="gig-list__list">
                <AnimatePresence>
                    {sortedGigs.map((gig, i) => (
                        <Gig
                            gig={gig}
                            key={gig.id}
                            selectedId={gigId}
                            delayMultiplier={i}
                        />
                    ))}
                </AnimatePresence>
            </motion.ul>
        </section>
    );
};
