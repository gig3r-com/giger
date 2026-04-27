import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import type { Conversation } from '@/notes';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const ListCard = styled(Card)(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.22)}`,
    display: 'flex',
    flexDirection: 'column',
}));

const ConversationBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    padding: theme.spacing(1.25),
    transition: 'all 0.15s ease-out',
    '&:hover': {
        boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.3)}`,
        borderColor: theme.palette.primary.main,
    },
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
    opacity: 0.75,
    fontSize: theme.typography.caption.fontSize,
}));

interface Props {
    conversations: Conversation[];
    selectedConversationId: string | null;
    onSelectConversation: (id: string) => void;
}

const formatParticipants = (participants: string[]) =>
    participants.length ? participants.join(', ') : 'No participants';

const ConversationsList: React.FC<Props> = ({
                                                conversations,
                                                selectedConversationId,
                                                onSelectConversation,
                                            }) => {
    const hasConversations = conversations.length > 0;

    return (
        <ListCard>
            <CardHeader
                title={
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        Conversations
                    </Typography>
                }
                subheader={
                    <Typography variant="caption">
                        Pick a thread to inspect its message log and notes.
                    </Typography>
                }
            />
            <Divider />
            <CardContent sx={{ paddingTop: 1, paddingBottom: 2 }}>
                {!hasConversations ? (
                    <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, fontStyle: 'italic', marginTop: 1 }}
                    >
                        No conversations linked to this character yet.
                    </Typography>
                ) : (
                    <Stack spacing={1.25}>
                        {conversations.map((conv) => {
                            const isSelected = selectedConversationId === conv.id;
                            const title =
                                conv.title && conv.title.trim().length > 0
                                    ? conv.title
                                    : formatParticipants(conv.participants);
                            const totalMessages = conv.messages?.length ?? 0;

                            const lastMessage = conv.messages?.[conv.messages.length - 1];
                            let lastTimestampLabel = 'No messages';

                            if (lastMessage?.timestamp) {
                                let date: Date | null = null;
                                const ts: any = lastMessage.timestamp;

                                if (typeof ts === 'string' || typeof ts === 'number') {
                                    const d = new Date(ts);
                                    if (!Number.isNaN(d.getTime())) date = d;
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

                                if (date) {
                                    lastTimestampLabel = date.toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    });
                                }
                            }

                            return (
                                <ConversationBox
                                    key={conv.id}
                                    sx={(theme) => ({
                                        borderColor: isSelected
                                            ? theme.palette.primary.main
                                            : theme.palette.divider,
                                        backgroundColor: isSelected
                                            ? alpha(theme.palette.primary.main, 0.06)
                                            : theme.palette.background.paper,
                                    })}
                                    onClick={() => onSelectConversation(conv.id)}
                                >
                                    <Stack spacing={0.75}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <ChatBubbleIcon fontSize="small" />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                    title={title}
                                                >
                                                    {title}
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                {conv.gigConversation && (
                                                    <Chip
                                                        size="small"
                                                        label="GIG"
                                                        icon={<WorkspacesIcon fontSize="small" />}
                                                        sx={(theme) => ({
                                                            height: 20,
                                                            fontSize: '0.7rem',
                                                            borderRadius: 999,
                                                            border: `1px solid ${alpha(
                                                                theme.palette.warning.main,
                                                                0.7,
                                                            )}`,
                                                            backgroundColor: alpha(
                                                                theme.palette.warning.main,
                                                                0.18,
                                                            ),
                                                        })}
                                                    />
                                                )}
                                                <Chip
                                                    size="small"
                                                    label={`${totalMessages} msg`}
                                                    sx={(theme) => ({
                                                        height: 20,
                                                        fontSize: '0.7rem',
                                                        borderRadius: 999,
                                                        border: `1px solid ${alpha(
                                                            theme.palette.primary.main,
                                                            0.7,
                                                        )}`,
                                                        backgroundColor: alpha(
                                                            theme.palette.primary.main,
                                                            0.12,
                                                        ),
                                                    })}
                                                />
                                            </Stack>
                                        </Stack>

                                        <SecondaryText noWrap>
                                            Participants: {formatParticipants(conv.participants)}
                                        </SecondaryText>
                                        {conv.anonymizedUsers?.length ? (
                                            <SecondaryText noWrap>
                                                Anonymized: {conv.anonymizedUsers.join(', ')}
                                            </SecondaryText>
                                        ) : null}
                                        <SecondaryText>Last activity: {lastTimestampLabel}</SecondaryText>
                                    </Stack>
                                </ConversationBox>
                            );
                        })}
                    </Stack>
                )}
            </CardContent>
        </ListCard>
    );
};

export default ConversationsList;
