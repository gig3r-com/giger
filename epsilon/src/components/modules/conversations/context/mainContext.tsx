'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useFormikContext } from 'formik';
import type { EnhancedConversationType } from '@/types';
import { ConversationsContext, ConversationsContextType, } from './';
import { blankConversation } from '@/components/modules/conversations/context/form';

export type StateType = Record<string | number, EnhancedConversationType>;

export default function ConversationMainProvider({ children }: { children: React.ReactNode }) {
  const { resetForm, validateForm } = useFormikContext<EnhancedConversationType>();
  const [conversationsById, setConversationsById] = useState<StateType>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [uiMainHandle, setUiMainHandle] = useState<string | null>(null);

  const removeConversation = useCallback((chatId: string | number) => {
    setConversationsById((state) => {
      const next = { ...state }; delete next[chatId]; return next;
    });
    setSelected((prev) => (prev === chatId ? null : prev));
  }, []);

  const addConversation = useCallback((conversation: EnhancedConversationType) => {
    setConversationsById((prevState) => ({
      ...prevState, [conversation.id]: conversation
    }));
    setSelected(conversation.id);
  }, []);

  const newConversation = useCallback((title?: string) => {
    const conversation = blankConversation;
    conversation.id = crypto.randomUUID();
    if (title) conversation.title = title;
    addConversation(conversation);
  }, [addConversation]);

  useEffect(() => {
    if (selected && conversationsById[selected]) {
      resetForm({ values: conversationsById[selected], });
      validateForm();
      setUiMainHandle(conversationsById[selected].participants[0]);
    } else {
      resetForm({ values: blankConversation });
      setUiMainHandle(null);
    }
  }, [resetForm, validateForm, selected, conversationsById])

  const context: ConversationsContextType = useMemo(
    () => ({
      conversationsById,
      addConversation,
      removeConversation,
      newConversation,
      uiMainHandle,
      setUiMainHandle,
      selected,
      select: setSelected,
    }),
    [
      conversationsById,
      addConversation, removeConversation, newConversation,
      uiMainHandle, selected
    ],
  );

  return (
    <ConversationsContext.Provider value={context}>
      {children}
    </ConversationsContext.Provider>
  );
}
