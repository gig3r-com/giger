import React from 'react';
import { useFormikContext } from 'formik';
import { styled, alpha } from '@mui/material/styles';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import type { Conversation, Message, User } from '@/notes';

import Input from '@/components/forms/Input';

import MessageIcon from '@mui/icons-material/Message';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const MessagesCard = styled(Card)(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.22)}`,
    display: 'flex',
    flexDirection: 'column',
}));

const ScrollBox = styled(Box)(({ theme }) => ({
    maxHeight: 400,
    overflow: 'auto',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
}));

const OwnBubble = styled(Box)(({ theme }) => ({
    maxWidth: '70%',
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(1),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.9)}`,
    background: `linear-gradient(135deg,
    ${alpha(theme.palette.primary.main, 0.35)} 0%,
    ${alpha(theme.palette.background.paper, 0.95)} 80%
  )`,
    boxShadow: `0 0 14px ${alpha(theme.palette.primary.main, 0.5)}`,
}));

const OtherBubble = styled(Box)(({ theme }) => ({
    maxWidth: '70%',
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(1),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.96),
}));

const MetaRow = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: theme.typography.caption.fontSize,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
}));

const EpsilonRow = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: theme.typography.caption.fontSize,
    fontStyle: 'italic',
}));

const NotesHeader = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    textTransform: 'uppercase',
    fontSize: theme.typography.caption.fontSize,
    letterSpacing: 1,
    opacity: 0.9,
}));

const equalParticipants = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
};

const formatTimestamp = (ts: any): string => {
    if (!ts) return '-';

    let date: Date | null = null;

    if (typeof ts === 'string' || typeof ts === 'number') {
        const d = new Date(ts);
        if (!Number.isNaN(d.getTime())) {
            date = d;
        }
    } else if (ts?.toDate && typeof ts.toDate === 'function') {
        try {
            date = ts.toDate();
        } catch {
            date = null;
        }
    } else if (typeof ts === 'object' && 'seconds' in ts) {
        const seconds = (ts as { seconds: number }).seconds;
        date = new Date(seconds * 1000);
    }

    if (!date) return String(ts);

    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getConversationLabel = (conv: Conversation) => {
    if (conv.title && conv.title.trim().length > 0) return conv.title;
    return conv.participants.length ? conv.participants.join(', ') : `Conversation ${conv.id}`;
};

interface Props {
    conversation: Conversation | null;
}

const ConversationMessages: React.FC<Props> = ({ conversation }) => {
    const { values, setFieldValue } = useFormikContext<User>();
    const messages = (conversation?.messages ?? []) as Message[];
    const handle = values.handle;

    const epsilonNotes = values.epsilonConversationsNotes ?? [];

    let conversationNoteIndex = -1;
    if (conversation) {
        const foundIndex = epsilonNotes.findIndex((entry) =>
            equalParticipants(entry.participants ?? [], conversation.participants ?? []),
        );
        conversationNoteIndex =
            foundIndex !== -1 ? foundIndex : epsilonNotes.length;
    }

    React.useEffect(() => {
        if (!conversation) return;

        const arr = values.epsilonConversationsNotes ?? [];
        const exists = arr.some((entry) =>
            equalParticipants(entry.participants ?? [], conversation.participants ?? []),
        );

        if (!exists) {
            const next = [
                ...arr,
                {
                    participants: conversation.participants,
                    notes: '',
                },
            ];
            setFieldValue('epsilonConversationsNotes', next);
        }
    }, [conversation?.id, conversation?.participants, setFieldValue, values.epsilonConversationsNotes]);

    const noteName =
        conversation && conversationNoteIndex >= 0
            ? `epsilonConversationsNotes[${conversationNoteIndex}].notes`
            : undefined;

    return (
        <MessagesCard>
            <CardHeader
                avatar={<MessageIcon />}
                title={
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        Messages
                    </Typography>
                }
                subheader={
                    <Typography variant="caption">
                        {conversation ? getConversationLabel(conversation) : 'No conversation selected'}
                    </Typography>
                }
            />
            <Divider />
            <CardContent sx={{ paddingTop: 1, paddingBottom: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {!conversation || !messages.length ? (
                    <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, fontStyle: 'italic', marginTop: 2 }}
                    >
                        No messages in this conversation yet.
                    </Typography>
                ) : (
                    <ScrollBox>
                        <Stack spacing={1.25}>
                            {messages
                                .slice()
                                .sort((a, b) => {
                                    const ta = (a.timestamp as any) ?? 0;
                                    const tb = (b.timestamp as any) ?? 0;
                                    return ta < tb ? -1 : ta > tb ? 1 : 0;
                                })
                                .map((msg) => {
                                    const own = msg.sender === handle;
                                    const Bubble = own ? OwnBubble : OtherBubble;

                                    return (
                                        <Box
                                            key={msg.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: own ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <Bubble>
                                                <Stack spacing={0.5}>
                                                    <MetaRow>
                                                        {own ? 'YOU' : msg.sender}{' '}
                                                        • {msg.type}
                                                        {msg.hacker && (
                                                            <>
                                                                {' '}
                                                                • <LockOpenIcon fontSize="inherit" /> {msg.hacker}
                                                            </>
                                                        )}{' '}
                                                        • {formatTimestamp(msg.timestamp as any)}
                                                    </MetaRow>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {msg.data}
                                                    </Typography>
                                                    <MetaRow>
                                                        Read by {(msg.readBy ?? []).length} user
                                                        {(msg.readBy ?? []).length === 1 ? '' : 's'}
                                                    </MetaRow>
                                                    {msg.epsilonNote && msg.epsilonNote.trim().length > 0 && (
                                                        <EpsilonRow>
                                                            Msg epsilon note: {msg.epsilonNote}
                                                        </EpsilonRow>
                                                    )}
                                                </Stack>
                                            </Bubble>
                                        </Box>
                                    );
                                })}
                        </Stack>
                    </ScrollBox>
                )}

                {conversation && noteName && (
                    <>
                        <NotesHeader>Conversation epsilon notes</NotesHeader>
                        <Input
                            name={noteName}
                            label="Off-game notes about this conversation"
                            placeholder="Why this thread matters, secrets, future reveals, social fallout..."
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={6}
                        />
                    </>
                )}
            </CardContent>
        </MessagesCard>
    );
};

export default ConversationMessages;
