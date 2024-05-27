import { FC, useEffect, useRef } from 'react';
import { cubicBezier, motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { IConversation } from '../../../../models/message';
import { Message } from '../message/message';
import { setMessagesAsRead } from '../../../../store/messages.slice';
import { IWebsocketContext } from '../../../providers/websocket.model';
import { useWebSocketContext } from '../../../providers/websocket.provider';
import { useUserService } from '../../../services/user.service';

import './conversation.scss';

export const Conversation: FC<{ convo: IConversation; className?: string }> = ({
    convo,
    className
}) => {
    const dispatch = useDispatch();
    const { currentUser } = useUserService();
    const convoWrapper = useRef<HTMLDivElement>(null);
    const { lastMessage } = useWebSocketContext() as IWebsocketContext;
    const { chatId, gigId } = useParams();

    useEffect(() => {
        setTimeout(() => {
            convoWrapper.current?.scrollTo({
                top: convoWrapper.current.scrollHeight,
                behavior: 'smooth'
            }),
                50;
        });
    }, [convo, lastMessage]);

    useEffect(
        function setAsRead() {
            const gigIdMatching = convo.id === gigId;
            const chatIdMatching = convo.id === chatId || gigIdMatching;
            const idMatching = gigIdMatching || chatIdMatching;

            if (!idMatching) return;

            dispatch(
                setMessagesAsRead({
                    convoId: convo.id,
                    gigConvo: gigIdMatching
                })
            );
        },
        [chatId, convo, dispatch, gigId, lastMessage]
    );

    const senderAnonymized = (sender: string) =>
        convo.anonymizedUsers.includes(sender) &&
        currentUser?.handle !== sender;

    return (
        <motion.div
            ref={convoWrapper}
            className={`${className ?? ''} conversation`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 200px)' }}
            exit={{ opacity: 0, height: 0, transform: 'scale(0)' }}
            transition={{
                ease: cubicBezier(0.16, 1, 0.3, 1)
            }}
        >
            {convo.messages.map((msg) => (
                <Message
                    key={msg.id}
                    message={msg}
                    convoId={convo.id}
                    senderAnonymized={senderAnonymized(msg.sender)}
                />
            ))}
        </motion.div>
    );
};
