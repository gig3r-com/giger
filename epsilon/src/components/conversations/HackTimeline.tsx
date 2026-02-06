'use client';
import * as React from 'react';
import { Stack, Typography, Chip, Paper, Button, Divider } from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import dayjs from 'dayjs';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import { useConversations } from '@/contexts/conversations';

export default function HackTimeline() {
  const form = useConversationForm();
  const { setFocusedMessageId } = useConversations();

  const list = React.useMemo(() => {
    const msgs = (form.values.messages ?? [])
      .filter((m) => m.hack?.by)
      .map((m) => ({
        id: m.id,
        date: m.date ? (dayjs(m.date).isValid() ? dayjs(m.date) : null) : null,
        sender: m.sender,
        hacker: m.hack!.by,
        text: m.text ?? '',
      }));
    msgs.sort((a, b) => {
      const da = a.date ? +a.date : Infinity;
      const db = b.date ? +b.date : Infinity;
      return da - db;
    });
    return msgs;
  }, [form.values.messages]);

  if (list.length === 0) {
    return (
      <Collapsible title="Hack Timeline">
        <Typography color="text.secondary">No hacked messages in this conversation.</Typography>
      </Collapsible>
    );
  }

  return (
    <Collapsible title="Hack Timeline">
      <Stack spacing={1.25}>
        {list.map((e) => (
          <Paper key={e.id} variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                <Chip label={`HACK`} color="error" variant="outlined" size="small" />
                <Typography variant="body2"><strong>{e.hacker}</strong> impersonated <strong>{e.sender}</strong></Typography>
                <Typography variant="caption" color="text.secondary">
                  {e.date ? e.date.format('MMM D, YYYY • HH:mm') : 'no date'}
                </Typography>
              </Stack>
              <Button size="small" onClick={() => setFocusedMessageId(e.id)}>Focus</Button>
            </Stack>
            {e.text && (
              <>
                <Divider sx={{ my: 1, opacity: 0.3 }} />
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {e.text.length > 180 ? `${e.text.slice(0, 180)}…` : e.text}
                </Typography>
              </>
            )}
          </Paper>
        ))}
      </Stack>
    </Collapsible>
  );
}
