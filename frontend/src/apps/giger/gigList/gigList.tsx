import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IGigListProps } from './gigList.model';
import { Gig } from '../gig/gig';
import { GigStatus, IGig } from '../../../models/gig';
import { useAuthenticationService } from '../../../shared/services/authentication.service';
import { Controls } from '../../../shared/components/controls/controls';

import './gigList.scss';

export const GigList: FC<IGigListProps> = ({ gigs, toggleMenuState }) => {
    const { currentUser } = useAuthenticationService();
    const [selectedGig, setSelectedGig] = useState<IGig | null>(null);

    const sortedGigs = [...gigs].sort((a, b) => {
        const aIsOwn = a.author.id === currentUser().id;
        const bIsOwn = b.author.id === currentUser().id;
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
    const selectGig = (gig: IGig) => {
        selectedGig?.id === gig.id ? setSelectedGig(null) : setSelectedGig(gig);
    };

    return (
        <section className="gig-list">
            <Controls
                leftSideOption={
                    selectedGig
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
                            selectedId={selectedGig?.id}
                            setSelected={selectGig}
                            delayMultiplier={i}
                        />
                    ))}
                </AnimatePresence>
            </motion.ul>
        </section>
    );
};
