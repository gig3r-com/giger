export const derivedWorkerSource = `
self.onmessage = (event) => {
  const { conversations } = event.data;

  const conversationMessageCounts = {};
  const userMessageCounts = {};

  for (const conversationId in conversations) {
    const conversation = conversations[conversationId];
    const messages = conversation.messages || [];
    conversationMessageCounts[conversationId] = messages.length;

    for (const message of messages) {
      const senderId =
        message.senderId ||
        message.authorId ||
        message.senderHandle;
      if (!senderId) continue;
      userMessageCounts[senderId] =
        (userMessageCounts[senderId] || 0) + 1;
    }
  }

  let busiestConversationId = null;
  let maxConversationCount = -1;
  for (const id in conversationMessageCounts) {
    if (conversationMessageCounts[id] > maxConversationCount) {
      maxConversationCount = conversationMessageCounts[id];
      busiestConversationId = id;
    }
  }

  let userWithMostMessagesId = null;
  let maxUserCount = -1;
  for (const id in userMessageCounts) {
    if (userMessageCounts[id] > maxUserCount) {
      maxUserCount = userMessageCounts[id];
      userWithMostMessagesId = id;
    }
  }

  self.postMessage({
    conversationMessageCounts,
    userMessageCounts,
    busiestConversationId,
    userWithMostMessagesId,
  });
};
`;
