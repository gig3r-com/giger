import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import NotesIcon from "@mui/icons-material/Notes";
import Input from "@/components/forms/Input";
import labels from "../../labels";

const SummaryCard = styled(Card)(({ theme }) => ({
    flex: 1,
    background: `linear-gradient(135deg,
    ${alpha(theme.palette.primary.main, 0.18)} 0%,
    ${theme.palette.background.paper} 35%,
    ${alpha(theme.palette.primary.main, 0.06)} 100%
  )`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.22)}`,
}));

const NotesCard = styled(Card)(({ theme }) => ({
    flex: 2,
    backgroundColor: theme.palette.background.paper,
    border: `1px dashed ${alpha(theme.palette.secondary.main, 0.8)}`,
    boxShadow: `0 0 14px ${alpha(theme.palette.secondary.main, 0.38)}`,
}));

const ConversationsSummary = ({ totalConversations, }) => {
    return (
        <Stack direction="row" gap={2}>
            <SummaryCard>
                <CardHeader
                    avatar={<ChatIcon />}
                    title={
                        <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                            Conversations
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {totalConversations}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, marginTop: 0.5 }}>
                        Active threads linked to this character
                    </Typography>
                </CardContent>
            </SummaryCard>

            <NotesCard>
                <CardHeader
                    avatar={<NotesIcon />}
                    title={<Typography variant="subtitle2">{labels.chatNotesTitle}</Typography>}
                    subheader={<Typography variant="caption">{labels.chatNotesDescription}</Typography>}
                />
                <Divider />
                <CardContent>
                    <Input color="secondary" name="epsilonNotes" multiline minRows={2}
                           label={labels.epsilonConversationNotes} placeholder={labels.epsilonConversationNotesPlaceholder}
                    />
                </CardContent>
            </NotesCard>

            <NotesCard>
                <CardHeader
                    avatar={<NotesIcon />}
                    title={<Typography variant="subtitle2">{labels.plotNotesTitle}</Typography>}
                    subheader={<Typography variant="caption">{labels.plotNotesDescription}</Typography>}
                />
                <Divider />
                <CardContent>
                    <Input color="secondary" name="epsilonNotes" multiline minRows={2}
                           label={labels.epsilonPlots} placeholder={labels.epsilonPlotsPlaceholder}
                    />
                </CardContent>
            </NotesCard>
        </Stack>
    );
};

export default ConversationsSummary;
