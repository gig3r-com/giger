import { FC, useEffect, useMemo, useState } from 'react';
import { GigStatus } from '../../../../models/gig';
import { motion, AnimatePresence } from 'framer-motion';
import { FormattedMessage, useIntl } from 'react-intl';
import { BigButton } from '../../../../shared/components/big-button/big-button';
import { Conversation } from '../../../../shared/components/messaging/conversation/conversation';
import { NewMsg } from '../../../../shared/components/new-msg/new-msg';
import { ComplaintDetails } from '../../complaint-details/complaint-details';
import { getButtons, ActionId } from '../button-definitions';
import { useUserService } from '../../../../shared/services/user.service';
import { useSelector } from 'react-redux';
import { useMessagesService } from '../../../../shared/services/messages.service';
import { RootState } from '../../../../store/store';
import { useBankingService } from '../../../../shared/services/banking.service';
import { useStandardizedAnimation } from '../../../../shared/services/standardizedAnimation.service';
import { useGigsService } from '../../../../shared/services/gigs.service';
import { useGigHelpers } from '../gig.helpers';
import { UserRoles } from '../../../../models/user';
import { IGigBodyProps } from './gig-body.model';

export const GigBody: FC<IGigBodyProps> = ({ gig, isMine }) => {
    const intl = useIntl();
    const { currentUser, isModerator, isGod } = useUserService();
    const { fetchConvo, fetchingConvo } = useMessagesService();
    const { handleButtonAction, canAcceptGig } = useGigsService();
    const { buttonColor } = useGigHelpers();
    const { generateAnimation } = useStandardizedAnimation();
    const { hasCompanyAccount, accounts } = useBankingService();
    const [lockButtons, setLockButtons] = useState(false);
    const convos = useSelector(
        (state: RootState) => state.conversations.gigConversations
    );
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

    const handleBigButtonClick = async (actionId?: ActionId) => {
        setLockButtons(true);
        await handleButtonAction(gig.id, actionId);
        setLockButtons(false);
    };

    useEffect(
        function fetch() {
            if (shouldFetchConvo) {
                fetchConvo(gig.conversationId);
            }
        },
        [gig, shouldFetchConvo]
    );

    return (
        <motion.article
            className="gig__details"
            {...generateAnimation('expandCollapse')}
        >
            {isGod && gig.status !== GigStatus.EXPIRED && (
                <BigButton
                    text={intl.formatMessage({
                        id: 'SET_AS_EXPIRED'
                    })}
                    color={buttonColor(gig.status, isMine)}
                    onClick={() =>
                        handleButtonAction(gig.id, ActionId.MARK_AS_EXPIRED)
                    }
                />
            )}

            <p className="gig__description">{gig.description}</p>

            {gig.status !== GigStatus.AVAILABLE && gig.descriptionDetailed && (
                <p className="gig__description">{gig.descriptionDetailed}</p>
            )}

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

            {shouldFetchConvo && (
                <NewMsg
                    convoId={gig.id}
                    onSend={() => {}}
                    userIsParticipant={convo?.participants.includes(
                        currentUser?.handle ?? ''
                    )}
                />
            )}

            {getButtons(
                gig.status,
                isMine,
                isModerator,
                gig.mode,
                hasCompanyAccount,
                canAcceptGig(gig),
                (accounts.private?.balance ?? 0) >= gig.payout,
                (accounts.business?.balance ?? 0) >= gig.payout
            ).map((button) => (
                <BigButton
                    key={button.label}
                    text={intl.formatMessage({
                        id: button.label
                    })}
                    disabled={button.disabled || lockButtons}
                    color={buttonColor(gig.status, isMine)}
                    onClick={() => handleBigButtonClick(button.actionId)}
                />
            ))}
        </motion.article>
    );
};
