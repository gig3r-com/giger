'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, ButtonGroup, Button } from '@mui/material';
import { ApiUser } from '@/app/api/mappers/user'
import EmptyTab from './EmptyTab'
import InfoRow from '@/components/common/InfoRow'
import Collapsible from '@/components/common/Collapsible';
import { useConfirm } from '@/contexts/ConfirmProvider';
import Box from '@mui/material/Box';

interface Message {
  id: string
  date?: string
  sender: string
  text: string
}

interface Conversation {
  id: string
  participants?: string[]
  title?: string
  lastMessagePreview?: string
  updatedAt?: string
  messages?: Message[]
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '' : d.toLocaleString()
}

function ConversationsTab({ user }: { user: ApiUser | null }) {
  const confirm = useConfirm();
  const [conversations, setConversations] = useState<Conversation[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ⬇️ Reusable fetcher you can call anytime
  const loadConversations = useCallback(
    async (signal?: AbortSignal) => {
      if (!user?.handle) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `/api/conversation/byParticipant?participant=${encodeURIComponent(user.handle)}`,
          { signal }
        )
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error ?? `Request failed (${res.status})`)
        }
        const data: { conversations: Conversation[] } = await res.json()
        setConversations(data.conversations)
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setError(e?.message ?? 'Failed to load conversations')
        }
      } finally {
        setLoading(false)
      }
    },
    [user?.handle]
  )

  const handleDelete = useCallback(
    async (id: string) => {
      const ok = await confirm({
        title: 'Delete conversation',
        description: 'Are you sure you want to delete this conversation? This cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      });
      if (!ok) return;

      const res = await fetch(`/api/conversation/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        console.error('Failed to delete');
        return;
      }

      // refresh list after successful delete
      await loadConversations();
    },
    [confirm, loadConversations]
  );

  useEffect(() => {
    if (!user?.handle) return
    const ac = new AbortController()
    loadConversations(ac.signal)
    return () => ac.abort()
  }, [user?.handle, loadConversations])

  if (!user) return <EmptyTab />

  if (loading && !conversations) {
    return (
      <Grid container justifyContent="center" sx={{ width: '100%', py: 6 }}>
        <CircularProgress />
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container justifyContent="center" sx={{ width: '100%', py: 6 }}>
        <Typography variant="body2" color="error">{error}</Typography>
      </Grid>
    )
  }

  if (!conversations || conversations.length === 0) {
    return (
      <Grid container justifyContent="center" sx={{ width: '100%', py: 6 }}>
        <Typography variant="body">No conversations</Typography>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {conversations.map((conv) => {
        const others = (conv.participants ?? []).filter((p) => p !== user.handle)
        const cardTitle = <>
          Conversation with
          <Typography component="span" color="primary">{` ` + others.join(', ')}</Typography>
          <ButtonGroup sx={{ mx: 2 }} onClick={e => e.stopPropagation()}>
            <Button component="span" disabled={true}>Load</Button>
            <Button component="span" disabled={true}>Export</Button>
            <Button component="span" color="error" onClick={() => handleDelete(conv.id)} disabled={loading}>Delete</Button>
          </ButtonGroup>
        </>

        return (
          <Grid item xs={12} key={conv.id}>
            <Collapsible title={cardTitle} secondary>
              {conv.messages && conv.messages.length > 0 ? (
                conv.messages.map(({ id, sender, date, text }) => (
                  <InfoRow
                    key={id}
                    label={`${sender}${date ? ' – ' + formatDate(date) : ''}`}
                    value={text}
                    highlight={sender === user.handle}
                  />
                ))
              ) : (
                <InfoRow label="Latest" value={conv.lastMessagePreview ?? 'No messages yet'} />
              )}
            </Collapsible>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ConversationsTab
