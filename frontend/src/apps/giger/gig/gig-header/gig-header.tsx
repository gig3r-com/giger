import { motion } from 'framer-motion';
import { FC, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { LockedEntry } from '../../../../shared/components/locked-entry/locked-entry';
import GigReputation from '../../gig-reputation/gig-reputation';
import { useGigHelpers } from '../gig.helpers';
import { GigModes, IGig } from '../../../../models/gig';
import { useStandardizedAnimation } from '../../../../shared/services/standardizedAnimation.service';
import { useGigsService } from '../../../../shared/services/gigs.service';
import { useUserService } from '../../../../shared/services/user.service';
import { setSeenStatusHash } from '../../../../store/gigs.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export const GigHeader: FC<{
    gig: IGig;
    delayMultiplier: number;
}> = ({ gig, delayMultiplier }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useUserService();
    const { gigSummaryClassName, buttonColor } = useGigHelpers();
    const { generateAnimation } = useStandardizedAnimation();
    const { isLocked } = useGigsService();
    const isMine = useMemo(() => {
        return gig.authorId === currentUser?.id;
    }, [gig, currentUser]);
    const wantsOrPays = gig.mode === GigModes.CLIENT ? 'PAYS' : 'WANTS';

    const onClickHandler = useCallback(() => {
        if (!isLocked(gig)) {
            dispatch(setSeenStatusHash({ gigId: gig.id }));
            navigate(`/giger/${gig.id}`);
        }
    }, [gig]);

    return (
        <motion.div
            className={gigSummaryClassName(gig)}
            onClick={onClickHandler}
            key={gig.id}
            {...generateAnimation('horExpand', {
                delay: delayMultiplier * 0.06
            })}
        >
            {!isLocked(gig) ? (
                <>
                    <h3 className="gig__title">{gig.title}</h3>
                    <span className="gig__payout">
                        <FormattedMessage id={wantsOrPays} /> {gig.payout} ¤
                    </span>
                    <span className="gig__reputation">
                        {gig.reputationRequired !== undefined && (
                            <GigReputation
                                reputation={gig.reputationRequired.level}
                                color={buttonColor(gig.status, isMine)}
                            />
                        )}
                    </span>
                </>
            ) : (
                <LockedEntry />
            )}
        </motion.div>
    );
};
