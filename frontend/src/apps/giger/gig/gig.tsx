import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import classNames from 'classnames';
import { GigModes, GigStatus } from '../../../models/gig';
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
import { UserRoles } from '../../../models/user';
import { ComplaintDetails } from '../complaint-details/complaint-details';
import { ActionId, getButtons } from './button-definitions';
import { useBankingService } from '../../../shared/services/banking.service';
import { LockedEntry } from '../../../shared/components/locked-entry/locked-entry';

import './gig.scss';

export const Gig: FC<IGigProps> = ({ gig, selectedId, delayMultiplier }) => {
    const navigate = useNavigate();
    const intl = useIntl();
    const { currentUser, getHandleForConvo, isModerator, isGod } =
        useUserService();
    const { handleButtonAction, canAcceptGig, isLocked } = useGigsService();
    const { buttonColor, gigClassname, gigSummaryClassName } = useGigHelpers();
    const { fetchConvo, fetchingConvo } = useMessagesService();
    const { generateAnimation } = useStandardizedAnimation();
    const { hasCompanyAccount } = useBankingService();
    const convos = useSelector(
        (state: RootState) => state.conversations.gigConversations
    );
    const showComplaint = useMemo(() => {
        const complaintExists = !!gig.complaintReason;
        const correctStatus =
            gig.status === GigStatus.DISPUTE ||
            gig.status === GigStatus.COMPLETED;
        const userIsModerator = currentUser?.roles.includes(UserRoles.ADMIN);
        const interestedParty =
            gig.takenById === currentUser?.id ||
            gig.authorId === currentUser?.id;

        return (
            correctStatus &&
            complaintExists &&
            (userIsModerator || interestedParty)
        );
    }, [gig]);
    const isMine = useMemo(() => {
        return gig.authorId === currentUser?.id;
    }, [gig, currentUser]);

    const convo = useMemo(() => {
        return convos.find((c) => c.id === gig.conversationId);
    }, [convos, gig]);

    const shouldFetchConvo = useMemo(
        () =>
            gig.status !== GigStatus.AVAILABLE ||
            gig.authorId === currentUser?.id,
        [gig, currentUser]
    );

    const showConvo = useMemo(
        () => shouldFetchConvo && convo !== undefined,
        [shouldFetchConvo, convo]
    );

    const onClickHandler = useCallback(() => {
        if (!isLocked(gig)) {
            navigate(`/giger/${gig.id}`);
        }
    }, [gig]);

    useEffect(
        function fetch() {
            if (selectedId === gig.id) {
                fetchConvo(gig.conversationId);
            }
        },
        [selectedId, gig]
    );

    const wrapperClasses = classNames({
        gig__wrapper: true,
        'gig__wrapper--locked': isLocked(gig),
        'gig__wrapper--small-margin': gig.status !== GigStatus.AVAILABLE,
        'gig__wrapper--no-margin': selectedId !== undefined
    });

    const statusClasses = classNames({
        gig__status: true,
        [`gig__status--${buttonColor(gig.status, isMine)}`]: true,
        'gig__status--shown': !selectedId
    });

    const wantsOrPays = gig.mode === GigModes.CLIENT ? 'PAYS' : 'WANTS';

    const showGigStatus = gig.status !== GigStatus.AVAILABLE || isMine;

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
                                    <FormattedMessage id={wantsOrPays} />{' '}
                                    {gig.payout} ¤
                                </span>
                                <span className="gig__reputation">
                                    {gig.reputationRequired !== undefined && (
                                        <GigReputation
                                            reputation={
                                                gig.reputationRequired.level
                                            }
                                            color={buttonColor(
                                                gig.status,
                                                isMine
                                            )}
                                        />
                                    )}
                                </span>
                            </>
                        ) : (
                            <LockedEntry />
                        )}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {selectedId === gig.id && (
                        <motion.article
                            className="gig__details"
                            {...generateAnimation('expandCollapse')}
                        >
                            {getButtons(
                                gig.status,
                                isMine,
                                isModerator,
                                gig.mode,
                                hasCompanyAccount,
                                canAcceptGig(gig)
                            ).map((button) => (
                                <BigButton
                                    key={button.label}
                                    text={intl.formatMessage({
                                        id: button.label
                                    })}
                                    disabled={button.disabled}
                                    color={buttonColor(gig.status, isMine)}
                                    onClick={() => {
                                        handleButtonAction(
                                            gig.id,
                                            button.actionId
                                        );
                                    }}
                                />
                            ))}

                            {isGod && gig.status !== GigStatus.EXPIRED && (
                                <BigButton
                                    text={intl.formatMessage({
                                        id: 'SET_AS_EXPIRED'
                                    })}
                                    color={buttonColor(gig.status, isMine)}
                                    onClick={() =>
                                        handleButtonAction(
                                            gig.id,
                                            ActionId.MARK_AS_EXPIRED
                                        )
                                    }
                                />
                            )}

                            <p className="gig__description">
                                {gig.description}
                            </p>

                            {showComplaint && <ComplaintDetails gig={gig} />}

                            <AnimatePresence>
                                {shouldFetchConvo && fetchingConvo && (
                                    <p key={gig.conversationId + 'fetch'}>
                                        <FormattedMessage id="FETCHING_CONVERSATION" />
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
                                <NewMsg
                                    convoId={gig.id}
                                    onSend={() => {}}
                                    userIsParticipant={convo?.participants.includes(
                                        currentUser?.handle ?? ''
                                    )}
                                />
                            )}
                        </motion.article>
                    )}
                </AnimatePresence>
            </div>
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
