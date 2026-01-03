import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useGigHelpers } from '../gig.helpers';
import { GigModes, GigStatus } from '../../../../models/gig';
import { useStandardizedAnimation } from '../../../../shared/services/standardizedAnimation.service';
import { useGigsService } from '../../../../shared/services/gigs.service';
import { useUserService } from '../../../../shared/services/user.service';
import {
    setSeenStatusHash,
    setSelectedGig
} from '../../../../store/gigs.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useMessagesService } from '../../../../shared/services/messages.service';
import Frame from '../../../../assets/coc/frame.svg?react';
import ArrowIncome from '../../../../assets/coc/arrow_income.svg?react';
import ArrowCost from '../../../../assets/coc/arrow_cost.svg?react';
import { IGigHeaderProps } from './gig-header.model';

import './gig-header.scss';

export const GigHeader: FC<IGigHeaderProps> = ({
    gig,
    delayMultiplier,
    mode = 'list'
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const { currentUser } = useUserService();
    const { gigSummaryClassName, gigStatusClassName } = useGigHelpers();
    const { generateAnimation } = useStandardizedAnimation();
    const { hasStatusUpdate } = useGigsService();
    const { gigConvoHasUnreadMessages } = useMessagesService();
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

    const headerClasses = classNames({
        'gig-header': true,
        'gig-header--status-shown': showGigStatus,
        'gig-header--list': mode === 'list',
        'gig-header--full': mode === 'full'
    });

    return (
        <li
            className={`COC_HEADER ${headerClasses} ${gigStatusClassName(gig, 'gig-header')}`}
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
                    <>
                        <Frame />
                        {gig.mode === GigModes.CLIENT ? (
                            <ArrowIncome className="gig-header__arrow-icon" />
                        ) : (
                            <ArrowCost className="gig-header__arrow-icon" />
                        )}
                        <span className="gig-header__title">{gig.title}</span>
                        <span className="gig-header__payout-label">
                            <FormattedMessage id={wantsOrPays} />
                        </span>
                        <span className="gig-header__payout-amount">
                            {gig.payout}
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
                        <span className="gig-header__status-indicator">
                            {intl.formatMessage({ id: gig.status })}
                        </span>
                    </>
                </motion.div>
            </AnimatePresence>
        </li>
    );
};
