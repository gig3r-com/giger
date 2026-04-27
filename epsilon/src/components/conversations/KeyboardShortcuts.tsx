'use client';
import * as React from 'react';
import dayjs from 'dayjs';
import { useConversations } from '@/contexts/conversations';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';

export default function KeyboardShortcuts() {
  const { focusedMessageId, setFocusedMessageId } = useConversations();
  const form = useConversationForm();

  const sorted = React.useMemo(() => {
    return [...(form.values.messages ?? [])].sort((a: any, b: any) => {
      const da = a?.date && dayjs(a.date).isValid() ? +dayjs(a.date) : Infinity;
      const db = b?.date && dayjs(b.date).isValid() ? +dayjs(b.date) : Infinity;
      return da - db;
    });
  }, [form.values.messages]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      const editable = (e.target as HTMLElement)?.isContentEditable;
      const inInput = editable || tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.closest('[role="textbox"]');

      if (!inInput && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        if (!sorted.length) return;
        const ids = sorted.map((m) => m.id);
        const curIdx = focusedMessageId ? ids.indexOf(focusedMessageId) : -1;
        const nextIdx = e.key === 'ArrowUp'
          ? Math.max(0, (curIdx === -1 ? ids.length : curIdx) - 1)
          : Math.min(ids.length - 1, (curIdx === -1 ? -1 : curIdx) + 1);
        setFocusedMessageId(ids[nextIdx]);
        return;
      }

      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      if (ctrlOrMeta && e.key === 'Enter') {
        if (!sorted.length) {
          form.setFieldValue('messages', [{
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            sender: form.values.participants?.[0] ?? '',
            text: '',
            note: '',
          }]);
          return;
        }
        const ids = sorted.map((m) => m.id);
        const curIdx = focusedMessageId ? ids.indexOf(focusedMessageId) : ids.length - 1;
        const cur = sorted[Math.max(0, curIdx)];
        const nxt = sorted[Math.min(sorted.length - 1, curIdx + 1)];
        const da = cur?.date && dayjs(cur.date).isValid() ? +dayjs(cur.date) : Date.now();
        const db = nxt?.date && dayjs(nxt.date).isValid() ? +dayjs(nxt.date) : da + 60_000;
        const mid = new Date(da + Math.floor((db - da) / 2)).toISOString();
        form.setFieldValue('messages', [
          ...form.values.messages,
          { id: crypto.randomUUID(), date: mid, sender: cur?.sender ?? form.values.participants?.[0] ?? '', text: '', note: '' },
        ]);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [form.values.messages, form.values.participants, focusedMessageId, setFocusedMessageId, sorted]);

  return null;
}
