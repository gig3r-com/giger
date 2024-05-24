import { FullConversationType } from '../../../types';
import { onlyTab } from './utils';

export function getFullConversationLines(
  conversation: FullConversationType,
): string[] {
  const lines: string[] = [];
  console.log(conversation);
  lines.push(
    `<span class="secondary-color">Conversation</span> ${onlyTab(
      conversation.id,
    )}`,
  );
  lines.push(
    `<span class="secondary-color">Participants:</span> ${conversation.participants
      .map((p) => onlyTab(p))
      .join(', ')}`,
  );
  conversation.messages.forEach((message) => {
    lines.push(
      `<span class="accent-color">${message.date}</span> <span class="secondary-color margin-left">${message.sender}</span>: <span>${message.text}</span>`,
    );
  });

  return lines;
}
