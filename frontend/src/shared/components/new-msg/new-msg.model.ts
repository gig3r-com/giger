export interface INewMsgProps {
    convoId: string;
    onSend?: () => void;
    userIsParticipant?: boolean;
}
