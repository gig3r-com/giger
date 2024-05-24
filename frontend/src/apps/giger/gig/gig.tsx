import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { GigStatus } from '../../../models/gig';
import { IGigProps } from './gig.model';
import { useGigsService } from '../../../shared/services/gigs.service';
import { useGigHelpers } from './gig.helpers';
import { useUserService } from '../../../shared/services/user.service';
import { GigHeader } from './gig-header/gig-header';
import { GigBody } from './gig-body/gig-body';
import { Controls } from '../../../shared/components/controls/controls';
import { useDispatch } from 'react-redux';
import { setSeenStatusHash, setSelectedGig } from '../../../store/gigs.slice';

import './gig.scss';

export const Gig: FC<IGigProps> = ({ gig, selectedId, delayMultiplier }) => {
    const dispatch = useDispatch();
    const { currentUser } = useUserService();
    const { isLocked } = useGigsService();
    const { gigClassname } = useGigHelpers();
    const isMine = useMemo(() => {
        return gig.authorId === currentUser?.id;
    }, [gig, currentUser]);

    const wrapperClasses = classNames({
        gig__wrapper: true,
        'gig__wrapper--locked': isLocked(gig),
        'gig__wrapper--small-margin': gig.status !== GigStatus.AVAILABLE,
        'gig__wrapper--no-margin': selectedId !== undefined
    });

    useEffect(function setAsSeen() {
        return () => {
            dispatch(setSeenStatusHash({ gigId: gig.id }));
        };
    }, []);

    return (
        <motion.article className={wrapperClasses}>
            <Controls
                leftSideOption="back"
                onLeftSideClick={() => dispatch(setSelectedGig({ gigId: '' }))}
            />
            <span
                className={`gig__from ${
                    gig.id === selectedId ? 'gig__from--shown' : ''
                }`}
            >
                <FormattedMessage id={'FROM'} />:{' '}
                {gig.isAnonymizedAuthor ? (
                    <FormattedMessage id="ANONYMOUS" />
                ) : (
                    gig.authorName
                )}
            </span>
            <div className={gigClassname(gig)}>
                <AnimatePresence>
                    <GigHeader
                        gig={gig}
                        delayMultiplier={delayMultiplier}
                        mode="full"
                    />
                </AnimatePresence>

                <AnimatePresence>
                    {selectedId === gig.id && (
                        <GigBody gig={gig} isMine={isMine} />
                    )}
                </AnimatePresence>
            </div>
        </motion.article>
    );
};
