import React, { useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

import type { User, Conversation } from '@/notes';

import ConversationsSummary from './conversations/ConversationsSummary';
import ConversationsList from './conversations/ConversationsList';
import ConversationMessages from './conversations/ConversationMessages';
import EpsilonConversationsNotes from './conversations/EpsilonConversationsNotes';

const Root = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(2),
}));

const ConversationsTab: React.FC = () => {
    const { values } = useFormikContext<User>();
    const conversations = values.conversations ?? [];

    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
        conversations[0]?.id ?? null,
    );

    useEffect(() => {
        if (!conversations.length) {
            setSelectedConversationId(null);
            return;
        }
        if (!selectedConversationId || !conversations.some((c) => c.id === selectedConversationId)) {
            setSelectedConversationId(conversations[0].id);
        }
    }, [conversations, selectedConversationId]);

    const selectedConversation: Conversation | null =
        conversations.find((c) => c.id === selectedConversationId) ?? conversations[0] ?? null;

    const stats = useMemo(() => {
        const total = conversations.length;
        let messages = 0;
        let gigCount = 0;

        for (const conv of conversations) {
            messages += conv.messages?.length ?? 0;
            if (conv.gigConversation) gigCount += 1;
        }

        return { total, messages, gigCount };
    }, [conversations]);

    return (
        <Root>
            <ConversationsSummary
                totalConversations={stats.total}
                totalMessages={stats.messages}
                gigConversations={stats.gigCount}
            />

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <ConversationsList
                        conversations={conversations}
                        selectedConversationId={selectedConversationId}
                        onSelectConversation={setSelectedConversationId}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <ConversationMessages conversation={selectedConversation} />
                </Grid>
            </Grid>

            <EpsilonConversationsNotes />
        </Root>
    );
};

export default ConversationsTab;
