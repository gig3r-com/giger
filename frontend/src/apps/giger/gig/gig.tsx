import classNames from 'classnames';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { FC, useEffect, useMemo, useState } from 'react';
import { GigStatus } from '../../../models/gig';
import { IGigProps } from './gig.model';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { useAuthenticationService } from '../../../shared/services/authentication.service';
import { Conversation } from '../../../shared/components/messaging/conversation/conversation';
import { useMessagesService } from '../../../shared/services/messages.service';
import { IConversation } from '../../../models/message';
import { useGigsService } from '../../../shared/services/gigs.service';
import { NewMsg } from '../../../shared/components/new-msg/new-msg';

import './gig.scss';
import { useGigHelpers } from './gig.helpers';

export const Gig: FC<IGigProps> = ({
    gig,
    selectedId,
    setSelected,
    delayMultiplier
}) => {
    const { currentUser } = useAuthenticationService();
    const { acceptGig } = useGigsService();
    const { buttonColor, buttonText } = useGigHelpers();
    const { fetchConvo, fetchingConvo } = useMessagesService();
    const [convo, setConvo] = useState<IConversation>();
    const gigClassname = classNames({
        gig: true,
        'gig--completed': gig.status === GigStatus.COMPLETED,
        'gig--in-progress': gig.status === GigStatus.IN_PROGRESS,
        'gig--available': gig.status === GigStatus.AVAILABLE,
        'gig--selected': selectedId === gig.id,
        'gig--other-selected':
            selectedId !== gig.id && selectedId !== undefined,
        'gig--mine': gig.author.id === currentUser().id
    });

    const gigSummaryClassName = classNames({
        gig__summary: true,
        'gig__summary--completed': gig.status === GigStatus.COMPLETED,
        'gig__summary--in-progress': gig.status === GigStatus.IN_PROGRESS,
        'gig__summary--available': gig.status === GigStatus.AVAILABLE,
        'gig__summary--mine': gig.author.id === currentUser().id
    });

    const send = () => {
        setConvo(fetchConvo(gig.id));
    };

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
    }, [gig.status, gig.author.id, currentUser, convo]);

    useEffect(() => {
        setConvo(fetchConvo(gig.id));
    }, [gig, fetchConvo, setConvo]);

    return (
        <li className={gigClassname}>
            <AnimatePresence>
                <motion.div
                    className={gigSummaryClassName}
                    onClick={() => setSelected(gig)}
                    key={gig.id}
                    initial={{ opacity: 0, transform: 'scaleX(0)' }}
                    animate={{ opacity: 1, transform: 'scaleX(1)' }}
                    exit={{ opacity: 0, transform: 'scaleX(0)', height: 0 }}
                    transition={{
                        delay: delayMultiplier * 0.06,
                        ease: cubicBezier(0.16, 1, 0.3, 1)
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
                        transition={{
                            ease: cubicBezier(0.16, 1, 0.3, 1)
                        }}
                    >
                        <BigButton
                            text={buttonText(gig.status)}
                            color={buttonColor(gig.status)}
                            onClick={handleButtonClick}
                        />

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

                        <NewMsg convoId={gig.id} onSend={send} />
                    </motion.article>
                )}
            </AnimatePresence>
        </li>
    );
};
