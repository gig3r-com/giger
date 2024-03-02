import { FC } from 'react';
import { cubicBezier, motion } from 'framer-motion';
import { IConversation } from '../../../../models/message';
import { Message } from '../message/message';

export const Conversation: FC<{ convo: IConversation; className?: string }> = ({
    convo,
    className
}) => {
    return (
        <motion.div
            className={`${className} conversation`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transform: 'scale(0)' }}
            transition={{
                ease: cubicBezier(0.16, 1, 0.3, 1)
            }}
        >
            {convo.messages.map((msg) => (
                <Message key={msg.id} message={msg} convoId={convo.id} />
            ))}
        </motion.div>
    );
};
