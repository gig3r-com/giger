'use client';

import React from 'react';
import ConversationFormProvider from '@/components/modules/conversations/context/form';
import ConversationMainProvider from '@/components/modules/conversations/context/mainContext';

export default function ConversationsContextProvider({ children }: { children: React.ReactNode }) {

  return (
    <ConversationFormProvider>
      <ConversationMainProvider>
        { children }
      </ConversationMainProvider>
    </ConversationFormProvider>
  );
}
