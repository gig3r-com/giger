'use client';
import { createContext, useContext } from 'react';
import type { EnhancedConversationType } from '@/types';
import type { StateType } from './mainContext';

export interface ConversationsContextType {
  selected: string | null;
  select: (chatId: (string | null)) => void;

  uiMainHandle: string | null;
  setUiMainHandle: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void;

  conversationsById: StateType;
  addConversation: (conversation: EnhancedConversationType) => void;
  removeConversation: (chatId: (string | number)) => void;
  newConversation: (title?: string) => void;
}

export const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export function useConversations() {
  const context = useContext(ConversationsContext);
  if (!context) throw new Error('useConversations must be used within ConversationsContextProvider');
  return context;
}
