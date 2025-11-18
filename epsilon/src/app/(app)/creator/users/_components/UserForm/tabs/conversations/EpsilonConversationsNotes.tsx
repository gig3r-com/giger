import React from 'react';
import { useFormikContext } from 'formik';
import { styled, alpha } from '@mui/material/styles';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';

import type { User } from '@/notes';

import Input from '@/components/forms/Input';
import NotesIcon from '@mui/icons-material/Notes';

const NotesCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
    boxShadow: `0 0 14px ${alpha(theme.palette.primary.main, 0.18)}`,
    marginTop: theme.spacing(1),
}));

const EpsilonConversationsNotes: React.FC = () => {
    const { values } = useFormikContext<User>();
    const epsilonNotesArray = values.epsilonConversationsNotes ?? [];

    return (
        <NotesCard>
            <CardHeader
                avatar={<NotesIcon />}
                title={
                    <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                        Epsilon conversation overview
                    </Typography>
                }
                subheader={
                    <Typography variant="caption">
                        High-level meta about this character&apos;s conversations and social ties.
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Input
                    name="epsilonNotes"
                    label="Global epsilon notes"
                    placeholder="High-level meta about this character's social life, recurring NPCs, unresolved threads..."
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={6}
                />

                {epsilonNotesArray.length > 0 && (
                    <>
                        <Typography
                            variant="subtitle2"
                            sx={{ marginTop: 2, marginBottom: 1, opacity: 0.85 }}
                        >
                            Per-conversation notes (read-only summary)
                        </Typography>
                        <List dense>
                            {epsilonNotesArray.map((item, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Participants: {(item.participants ?? []).join(', ') || '—'}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                sx={{ opacity: 0.85, whiteSpace: 'pre-wrap' }}
                                            >
                                                {item.notes || 'No notes'}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </CardContent>
        </NotesCard>
    );
};

export default EpsilonConversationsNotes;
