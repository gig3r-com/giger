'use client';

import * as React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Stack, Typography, Divider, List, ListItemButton, ListItemText, IconButton, Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useConversations } from '@/contexts/conversations';
import Collapsible from '@/components/common/Collapsible';

function humanTitle(participants: string[] = [], fallback: string) {
  if (!participants.length) return fallback;
  const max = 3;
  const shown = participants.slice(0, max);
  const rest = participants.length - shown.length;
  return rest > 0 ? `${shown.join(', ')} +${rest}` : shown.join(', ');
}

export default function ConversationPicker() {
  const { conversationsById, selected, setSelected, removeConversation } = useConversations();
  const items = React.useMemo(() => Object.values(conversationsById), [conversationsById]);

  return (
    <Collapsible title="Conversations">
        <Stack spacing={1.5}>
          {items.length === 0 ? (
            <Typography color="text.secondary">No conversations loaded yet.</Typography>
          ) : (
            <>
              <Divider sx={{ opacity: 0.5 }} />
              <List dense disablePadding>
                {items.map((c: any) => {
                  const title = c.title || humanTitle(c.participants, `Conversation`);
                  const secondary = `${(c.participants ?? []).length} participants • ${(c.messages ?? []).length} messages`;
                  const isSelected = selected?.id === c.id;
                  return (
                    <ListItemButton
                      key={c.id}
                      selected={isSelected}
                      onClick={() => setSelected(c)}
                      sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ noWrap: true }}
                        secondaryTypographyProps={{ noWrap: true }}
                        primary={title}
                        secondary={secondary}
                      />
                      <Tooltip title="Delete conversation">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={(e) => { e.stopPropagation(); removeConversation(c.id); }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ListItemButton>
                  );
                })}
              </List>
            </>
          )}
        </Stack>
    </Collapsible>
  );
}
