import { FC } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { IGigListProps } from './gigList.model';
import { Gig } from '../gig/gig';
import { GigStatus } from '../../../models/gig';
import { Controls } from '../../../shared/components/controls/controls';
import { RootState } from '../../../store/store';
import { NoGigFound } from '../no-gig-found/no-gig-found';

import './gigList.scss';

export const GigList: FC<IGigListProps> = ({ gigs, toggleMenuState }) => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const { gigId } = useParams();
    const intl = useIntl();

    const sortedGigs = [...gigs].sort((a, b) => {
        const aIsOwn = a.author.id === currentUser?.id;
        const bIsOwn = b.author.id === currentUser?.id;
        const statusesRank = {
            [GigStatus.PENDING]: 0,
            [GigStatus.IN_PROGRESS]: 1,
            [GigStatus.AVAILABLE]: 2,
            [GigStatus.COMPLETED]: 3
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
            {gigs.length === 0 && <NoGigFound />}
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
