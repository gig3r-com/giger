import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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

import './gig.scss';
import GigReputation from '../gig-reputation/gig-reputation';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

export const Gig: FC<IGigProps> = ({ gig, selectedId, delayMultiplier }) => {
    const navigate = useNavigate();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
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
    const isMine = useMemo(() => {
        return gig.author.id === currentUser?.id;
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
                gig.author.id === currentUser?.id) &&
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
        'gig__wrapper': true,
        'gig__wrapper--small-margin': gig.status !== GigStatus.AVAILABLE
    });

    const statusClasses = classNames({
        'gig__status': true,
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
                <FormattedMessage id={'FROM'} />: {gig.author.handle}
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
                                    text={secondButtonText(!!gig.takenBy)}
                                    color="accent"
                                    onClick={secondButtonAction(!!gig.takenBy)}
                                />
                            )}

                            <p className="gig__description">
                                {gig.description}
                            </p>

                            <AnimatePresence>
                                {fetchingConvo && (
                                    <p key={gig.id + 'fetch'}>
                                        Fetching conversation...
                                    </p>
                                )}
                                {showConvo && convo && (
                                    <Conversation
                                        key={convo.id + 'convo'}
                                        convo={convo}
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
                <div
                    className={statusClasses}
                >
                    {gig.status.replace('_', ' ')}
                </div>
            )}
        </li>
    );
};
