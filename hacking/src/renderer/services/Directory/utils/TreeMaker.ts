import {
  ConversationType,
  FullConversationType,
  MessageType,
  ProfileType,
} from '../../../types';

export default function makeProfileTree(userData: ProfileType) {
  const basicInfo = {
    handle: userData.handle,
    surname: userData.surname,
    type: userData.type,
    wealthLevel: userData.wealthLevel,
    vibe: userData.vibe,
    faction: userData.factionRankActual,
    hasPlatinumPass: userData.hasPlatinumPass,
    highSecurity: userData.highSecurity,
    insurance: userData.insurance,
  };
  const medical = getMedicalFiles(userData);
  const criminal = getCriminalFiles(userData);
  const records = getRecordFiles(userData);
  const accounts = getBankAccountFiles(userData);
  const conversations = getConversationFiles(userData);
  // const gigs = getConversationFiles(userData);

  return [
    {
      name: 'profile',
      type: 'info',
      data: basicInfo,
      profileData: userData,
    },
    {
      name: 'minesweeper',
      type: 'game',
      data: { type: 'minesweeper' },
    },
    {
      name: 'medical',
      type: 'folder',
      files: medical,
    },
    {
      name: 'criminal',
      type: 'folder',
      files: criminal,
    },
    {
      name: 'records',
      type: 'folder',
      files: records,
    },
    {
      name: 'accounts',
      type: 'folder',
      files: accounts,
    },
    {
      name: 'conversations',
      type: 'folder',
      files: conversations,
    },
    // {
    //   name: 'gigs',
    //   type: 'folder',
    //   files: gigs,
    // },
  ];
}

function getMedicalFiles(userData: ProfileType) {
  return userData.medicalEvents.map(
    (record: {
      name: string;
      date: any;
      type: any;
      status: any;
      description: any;
    }) => ({
      name: record.name
        .trim()
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll(' ', '-'),
      type: 'info',
      data: {
        date: record.date,
        type: record.type,
        status: record.status,
        description: record.description,
      },
    }),
  );
}

function getCriminalFiles(userData: ProfileType) {
  return userData.criminalEvents.map(
    (record: {
      name: string;
      date: any;
      type: any;
      status: any;
      description: any;
    }) => ({
      name: record.name
        .trim()
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll(' ', '-'),
      type: 'info',
      data: {
        date: record.date,
        type: record.type,
        status: record.status,
        description: record.description,
      },
    }),
  );
}

function getRecordFiles(userData: ProfileType) {
  return userData.privateRecords.map(
    (record: { name: string; date: any; description: any }) => ({
      name: record.name
        .trim()
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll(' ', '-'),
      type: 'info',
      data: {
        date: record.date,
        description: record.description,
      },
    }),
  );
}

function getBankAccountFiles(userData: ProfileType) {
  return userData.accounts.map(
    (account: {
      transactions: any[];
      accountNumber: any;
      type: any;
      balance: any;
      owner: any;
    }) => {
      const transactions = account.transactions?.map(
        (t) =>
          `<tr><td class="right">${t.amount} $</td><td class="accent-color">${t.date}</td><td>${t.title}</td><td>${t.fromUser}</td><td>${t.toUser}</td></tr>`,
      );
      const renderTransactions = transactions?.length
        ? `<table><tbody><tr><th>Amount</th><th>Date</th><th>Title</th><th>From</th><th>To</th></tr>${transactions.join(
            '',
          )}</tbody></table>`
        : 'none';
      return {
        name: account.accountNumber,
        type: 'info',
        data: {
          type: account.type,
          balance: account.balance,
          owner: account.owner,
          transactions: renderTransactions,
        },
      };
    },
  );
}

function getConversationFiles(userData: ProfileType) {
  return userData.conversations.map((conversation: FullConversationType) => {
    const messages = conversation.messages?.length
      ? `<table><tbody><tr><th>Sender</th><th>Date</th><th>Status</th><th>Text</th></tr>${conversation.messages
          .map(getMessageRow)
          .join('')}</tbody></table>`
      : 'none';
    return {
      name:
        conversation.participants?.length > 2
          ? conversation.id
          : conversation.participants.join('-|-'),
      type: conversation.participants?.length > 2 ? 'connection' : 'info',
      data: {
        participants: conversation.participants.join(', '),
        messages,
      },
    };
  });

  function getMessageRow(message: MessageType) {
    const { sender, status, date, text } = message;
    return `<tr><td>${sender} $</td><td class="accent-color">${date}</td><td>${status}</td><td>${text}</td></tr>`;
  }
}
