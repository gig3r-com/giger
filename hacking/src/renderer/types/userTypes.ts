export type UserType = {
  id: string;
  name: string;
  surname: string;
  handle: string;

  type: string;
  profession: string;
  wealthLevel: string;

  networkId: string;
  networkName: string;
  subnetworkId: string;
  subnetworkName: string;
};

export type ProfileType = UserType & {
  exploits: string[];
  mindHack: string;
  hackerName: string;
  cyberwareLevel: number;
  professionActual: string;
  typeActual: 'HUMAN' | 'AI' | 'ANDROID';
  assets: string[];
  favoriteUserIds: string[];
  relations: [
    {
      revealCode: 'string';
      id: 0;
      userId: 'string';
      description: 'string';
      title: 'string';
      recordType: 0;
    },
  ];
  privateRecords: PrivateRecordType[];
  criminalEvents: CriminalEventType[];
  medicalEvents: MedicalEventType[];
  accounts: BankAccountType[];
  conversations: ConversationType[];
};

export type CriminalEventType = EventType & {
  type: 'VICTIM' | 'SUSPECT' | 'WANTED' | 'WITNESS' | 'PUNISHMENT';
};

export type MedicalEventType = EventType & {
  type: 'CYBERWARE' | 'MEDICAL_DRUG' | 'MEDICAL_PROCEDURE' | 'SYMPTOM';
};

export type PrivateRecordType = {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'Relation' | 'Goal' | 'Meta' | 'PrivateRecord';
};

export type EventType = {
  id: string;
  type: string;
  name: string;
  description: string;
  date: string;
  status: 'CURRENT' | 'HISTORICAL';
  additionalData?: {
    type: 'hacking' | 'mindExploit';
  };
};

export type TransactionType = {
  id: string;
  title: string;
  date: string;
  isIncoming: boolean;
  amount: number;
};

export type BankAccountType = {
  id: string;
  ownerId: string;
  type: string;
  balance: number;
  transactions: TransactionType[];
  accountNumber: string;
};

export type ConversationType = {
  id: string;
  participants: string[];
};

export type FullConversationType = {
  id: string;
  isGigConversation: boolean;
  participants: string[];
  messages: MessageType[];
};

export type MessageType = {
  date: string;
  sender: string;
  text: string;
  status: 'SENT' | 'RECEIVED' | 'READ' | 'ERROR' | 'AWAITING';
};
