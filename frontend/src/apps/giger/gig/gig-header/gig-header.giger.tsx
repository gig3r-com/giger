import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { LockedEntry } from '../../../../shared/components/locked-entry/locked-entry';
import GigReputation from '../../gig-reputation/gig-reputation';
import { useGigHelpers } from '../gig.helpers';
import { GigModes, GigStatus } from '../../../../models/gig';
import { useStandardizedAnimation } from '../../../../shared/services/standardizedAnimation.service';
import { useGigsService } from '../../../../shared/services/gigs.service';
import { useUserService } from '../../../../shared/services/user.service';
import {
    setSeenStatusHash,
    setSelectedGig
} from '../../../../store/gigs.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { RootState } from '../../../../store/store';
import { useMessagesService } from '../../../../shared/services/messages.service';
import { IGigHeaderProps } from './gig-header.model';

import './gig-header.scss';

export const GigHeader: FC<IGigHeaderProps> = ({
    gig,
    delayMultiplier,
    mode = 'list'
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useUserService();
    const { gigSummaryClassName, buttonColor, gigStatusClassName } =
        useGigHelpers();
    const { generateAnimation } = useStandardizedAnimation();
    const { hasStatusUpdate } = useGigsService();
    const { gigConvoHasUnreadMessages } = useMessagesService();
    const selectedId = useSelector(
        (state: RootState) => state.gigs.selectedGigId
    );
    const { isLocked } = useGigsService();
    const isMine = useMemo(() => {
        return gig.authorId === currentUser?.id;
    }, [gig, currentUser]);
    const wantsOrPays = gig.mode === GigModes.CLIENT ? 'PAYS' : 'WANTS';

    const showGigStatus = gig.status !== GigStatus.AVAILABLE || isMine;

    const onClickHandler = useCallback(() => {
        if (!isLocked(gig) && mode === 'list') {
            dispatch(setSeenStatusHash({ gigId: gig.id }));
            dispatch(setSelectedGig({ gigId: gig.id }));
            navigate(`/giger/${gig.id}`);
        }
    }, [gig]);

    const statusClasses = classNames({
        'gig-header__status': true,
        [`gig-header__status--${buttonColor(gig.status, isMine)}`]: true,
        'gig-header__status--shown': !selectedId
    });

    const headerClasses = classNames({
        'gig-header': true,
        'gig-header--status-shown': showGigStatus,
        'gig-header--list': mode === 'list',
        'gig-header--full': mode === 'full'
    });

    return (
        <li
            className={`${headerClasses} ${gigStatusClassName(gig, 'gig-header')}`}
        >
            <AnimatePresence>
                <motion.div
                    className={gigSummaryClassName(gig)}
                    onClick={onClickHandler}
                    key={gig.id}
                    transition={{ duration: 0.3 }}
                    {...generateAnimation('horExpand', {
                        delay: delayMultiplier * 0.03
                    })}
                >
                    {!isLocked(gig) ? (
                        <>
                            <h3 className="gig-header__title">{gig.title}</h3>
                            <span className="gig__payout">
                                <FormattedMessage id={wantsOrPays} />{' '}
                                {gig.payout} ¤
                            </span>
                            <span className="gig-header__updates">
                                {hasStatusUpdate(gig.id) && (
                                    <span className="gig-header__status-update gig-header__update">
                                        <FormattedMessage id="NEW_STATUS" />
                                    </span>
                                )}
                                {gigConvoHasUnreadMessages(gig.id) && (
                                    <span className="gig-header__msg-update gig-header__update">
                                        <FormattedMessage id="NEW_MESSAGES_ABBREVIATION" />
                                    </span>
                                )}
                            </span>
                            <span className="gig__reputation">
                                {gig.reputationRequired !== undefined && (
                                    <GigReputation
                                        reputation={
                                            gig.reputationRequired.level
                                        }
                                        color={buttonColor(gig.status, isMine)}
                                    />
                                )}
                            </span>
                        </>
                    ) : (
                        <LockedEntry />
                    )}
                </motion.div>
            </AnimatePresence>
            {showGigStatus && (
                <div className={statusClasses}>
                    {gig.status !== GigStatus.AVAILABLE &&
                        gig.status.replace('_', ' ')}{' '}
                    {isMine && <FormattedMessage id="MY_GIG" />}
                </div>
            )}
        </li>
    );
};
