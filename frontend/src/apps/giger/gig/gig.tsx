import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GigStatus } from '../../../models/gig';
import { IGigProps } from './gig.model';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useAuthenticationService } from '../../../shared/services/authentication.service';
import { Conversation } from '../../../shared/components/messaging/conversation/conversation';
import { useMessagesService } from '../../../shared/services/messages.service';
import { useGigsService } from '../../../shared/services/gigs.service';
import { NewMsg } from '../../../shared/components/new-msg/new-msg';
import { useGigHelpers } from './gig.helpers';
import { RootState } from '../../../store/store';
import { standardTimingFunction } from '../../../shared/constants';

import './gig.scss';
import { IBigButtonProps } from '../../../shared/components/big-button/big-button.model';

export const Gig: FC<IGigProps> = ({ gig, selectedId, delayMultiplier }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuthenticationService();
    const { acceptGig } = useGigsService();
    const {
        buttonColor,
        buttonText,
        gigClassname,
        gigSummaryClassName,
        secondButtonText,
        secondButtonAction,
        firstButtonText,
        firstButtonAction
    } = useGigHelpers();
    const { fetchConvo, fetchingConvo } = useMessagesService();
    const convos = useSelector(
        (state: RootState) => state.conversations.gigConversations
    );
    const isMine = useMemo(() => {
        return gig.author.id === currentUser().id;
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
                gig.author.id === currentUser().id) &&
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

    const primaryActionProps: IBigButtonProps = useMemo(() => {
        if (!isMine) {
            return {
                text: buttonText(gig.status),
                color: buttonColor(gig.status),
                onClick: handleButtonClick
            };
        }
        const isActive = gig.takenBy !== undefined && Boolean(gig.takenBy);
        return {
            text: firstButtonText(isActive),
            color: 'accent',
            onClick: firstButtonAction(isActive)
        };
    }, [isMine, gig.takenBy, gig.status]);

    const secondaryActionProps: IBigButtonProps = useMemo(() => {
        const isActive = Boolean(gig.takenBy) || !gig.takenBy;
        return {
            text: secondButtonText(isActive),
            color: 'accent',
            onClick: secondButtonAction(isActive, gig.id)
        };
    }, [isMine, gig.takenBy, gig.id]);

    return (
        <li className={gigClassname(gig)}>
            <AnimatePresence>
                <motion.div
                    className={gigSummaryClassName(gig)}
                    onClick={() => navigate(`/giger/${gig.id}`)}
                    key={gig.id}
                    initial={{ opacity: 0, transform: 'scaleX(0)' }}
                    animate={{ opacity: 1, transform: 'scaleX(1)' }}
                    exit={{ opacity: 0, transform: 'scaleX(0)', height: 0 }}
                    transition={{
                        delay: delayMultiplier * 0.06,
                        ease: standardTimingFunction
                    }}
                >
                    <h3 className="gig__title">{gig.title}</h3>
                    <span className="gig__payout">{gig.payout} ¤</span>
                    <span className="gig__reputation">
                        {gig.reputationRequired}★
                    </span>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {selectedId === gig.id && (
                    <motion.article
                        className="gig_details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ ease: standardTimingFunction }}
                    >
                        <BigButton {...primaryActionProps} />
                        {isMine && <BigButton {...secondaryActionProps} />}

                        <p className="gig__description">{gig.description}</p>

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
        </li>
    );
};
