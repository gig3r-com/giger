import { FC } from "react";
import { IConversation } from "../../../../models/message";
import { Message } from "../message/message";

export const Conversation: FC<{convo: IConversation}> = ({ convo }) => {
    return (
        <>
            {convo.messages.map(msg => <Message key={msg.id} message={msg} />)}
        </>
    )
}
