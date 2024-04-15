import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { GigStatus } from '../../../models/gig';
import { IGigProps } from './gig.model';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { Conversation } from '../../../shared/components/messaging/conversation/conversation';
import { useMessagesService } from '../../../shared/services/messages.service';
import { useGigsService } from '../../../shared/services/gigs.service';
import { NewMsg } from '../../../shared/components/new-msg/new-msg';
import { useGigHelpers } from './gig.helpers';
import { RootState } from '../../../store/store';
import { useStandardizedAnimation } from '../../../shared/services/standardizedAnimation.service';
import GigReputation from '../gig-reputation/gig-reputation';
import { useUserService } from '../../../shared/services/user.service';

import './gig.scss';
import { UserRoles } from '../../../models/user';
import { ComplaintDetails } from '../complaint-details/complaint-details';

export const Gig: FC<IGigProps> = ({ gig, selectedId, delayMultiplier }) => {
    const navigate = useNavigate();
    const { currentUser, getHandleForConvo } = useUserService();
    const { acceptGig } = useGigsService();
    const {
        buttonColor,
        buttonText,
        gigClassname,
        gigSummaryClassName,
        secondButtonText,
        secondButtonAction
    } = useGigHelpers();
    const { fetchConvo, fetchingConvo } = useMessagesService();
    const { generateAnimation } = useStandardizedAnimation();
    const convos = useSelector(
        (state: RootState) => state.conversations.gigConversations
    );
    const showComplaint = useMemo(() => {
        const inDispute = gig.status === GigStatus.DISPUTE;
        const userIsModerator = currentUser?.roles.includes(UserRoles.ADMIN);
        const isCompainer = gig.takenById === currentUser?.id;

        return inDispute && (userIsModerator || isCompainer);
    }, [gig])
    const isMine = useMemo(() => {
        return gig.authorId === currentUser?.id;
    }, [gig, currentUser]);

    const convo = useMemo(() => {
        return convos.find((c) => c.id === gig.id);
    }, [convos, gig]);

    const handleButtonClick = () => {
        if (gig.status === GigStatus.AVAILABLE) {
            acceptGig(gig.id);
        }
    };

    const showConvo = useMemo(() => {
        return (
            (gig.status !== GigStatus.AVAILABLE ||
                gig.authorId === currentUser?.id) &&
            convo !== undefined
        );
    }, [gig, currentUser, convo]);

    useEffect(
        function fetch() {
            if (selectedId === gig.id) {
                fetchConvo(gig.id);
            }
        },
        [selectedId, gig]
    );

    const wrapperClasses = classNames({
        gig__wrapper: true,
        'gig__wrapper--small-margin': gig.status !== GigStatus.AVAILABLE,
        'gig__wrapper--no-margin': selectedId !== undefined
    });

    const statusClasses = classNames({
        gig__status: true,
        [`gig__status--${buttonColor(gig.status)}`]: true,
        'gig__status--shown': !selectedId
    });

    return (
        <li className={wrapperClasses}>
            <span
                className={`gig__from ${
                    gig.id === selectedId ? 'gig__from--shown' : ''
                }`}
            >
                <FormattedMessage id={'FROM'} />:{' '}
                {getHandleForConvo(gig.id, gig.authorId)}
            </span>
            <div className={gigClassname(gig)}>
                <AnimatePresence>
                    <motion.div
                        className={gigSummaryClassName(gig)}
                        onClick={() => navigate(`/giger/${gig.id}`)}
                        key={gig.id}
                        {...generateAnimation('horExpand', {
                            delay: delayMultiplier * 0.06
                        })}
                    >
                        <h3 className="gig__title">{gig.title}</h3>
                        <span className="gig__payout">{gig.payout} ¤</span>
                        <span className="gig__reputation">
                            {gig.reputationRequired !== undefined && (
                                <GigReputation
                                    reputation={gig.reputationRequired}
                                    color={buttonColor(gig.status)}
                                />
                            )}
                        </span>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {selectedId === gig.id && (
                        <motion.article
                            className="gig_details"
                            {...generateAnimation('expandCollapse')}
                        >
                            <BigButton
                                text={buttonText(gig.status)}
                                color={buttonColor(gig.status)}
                                onClick={handleButtonClick}
                            />

                            {isMine && (
                                <BigButton
                                    text={secondButtonText(!!gig.takenById)}
                                    color="accent"
                                    onClick={secondButtonAction(
                                        !!gig.takenById
                                    )}
                                />
                            )}

                            <p className="gig__description">
                                {gig.description}
                            </p>

                            {showComplaint && <ComplaintDetails gig={gig} />}

                            <AnimatePresence>
                                {fetchingConvo && (
                                    <p key={gig.id + 'fetch'}>
                                        <FormattedMessage id="FETCHING_CONVERSTATION" />
                                    </p>
                                )}
                                {showConvo && convo && (
                                    <Conversation
                                        key={convo.id + 'convo'}
                                        convo={convo}
                                        className="gig__conversation"
                                    />
                                )}
                            </AnimatePresence>

                            {gig.status !== GigStatus.AVAILABLE && (
                                <NewMsg convoId={gig.id} onSend={() => {}} />
                            )}
                        </motion.article>
                    )}
                </AnimatePresence>
            </div>
            {gig.status !== GigStatus.AVAILABLE && (
                <div className={statusClasses}>
                    {gig.status.replace('_', ' ')}
                </div>
            )}
        </li>
    );
};
