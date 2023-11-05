import { FC } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IGigListProps } from './gigList.model';
import { Gig } from '../gig/gig';
import { GigStatus } from '../../../models/gig';
import { Controls } from '../../../shared/components/controls/controls';
import { RootState } from '../../../store/store';

import './gigList.scss';

export const GigList: FC<IGigListProps> = ({ gigs, toggleMenuState }) => {
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const { gigId } = useParams();

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
                        : `${gigs.length} ${gigs.length > 1 ? 'GIGS' : 'GIG'}`
                }
                rightSideOption="FILTERS"
                onRightSideClick={toggleMenuState}
            />
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
