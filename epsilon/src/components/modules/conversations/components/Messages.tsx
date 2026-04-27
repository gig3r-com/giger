import React, { memo } from 'react';
import { useField } from 'formik';
import MessageWrapper from './MessageWrapper/MessageWrapper';
import { MessageType } from '@/types';

function Messages() {
  const [messages] = useField('messages');

  return (messages.value as MessageType[]).map((message, index) => {
    return (
      <MessageWrapper key={ message.id } index={ index } />
    )
  });
}

export default memo(Messages);