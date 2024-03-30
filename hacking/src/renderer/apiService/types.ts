export type UserType = {
  id: string;
  name: string;
  surname: string;
  handle: string;
  aliasMap: {};

  type: string;
  profession: string;
  age: number;
  wealthLevel: string;

  networkId: string;
  subnetworkId: string;
};

export type ProfileType = UserType & {
  exploits: string[];
  mindHack: string;
  hackerName: string;
  cyberwareLevel: number;
  professionActual: string;
  typeActual: 'HUMAN' | 'AI' | 'ANDROID';
  assets: string[];
  hackingSkills: {
    stat: number;
  };
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
};

export type NetworkType = {
  id: string;
  name: string;
  subnetworks: string[];
  adminId: string;
};

export type SubnetworkType = {
  id: string;
  name: string;
  networkId: string;
  users: string[];
  accessPoint?: string;
  firewall: 'EncryptGuard' | 'FirewallX' | 'VirtualVault' | 'Unknown';
  operatingSystem: 'ForceShield' | 'EvilTwin' | 'JoanOfArc' | 'Unknown';
  ice: string[];
  pastHacks: string[];
};

type EventType = {
  id: number;
  userId: string;
  name: string;
  description: string;
  timeStamp: number;
  status: 'CURRENT' | 'HISTORICAL';
};

export type CriminalEventType = EventType & {
  type: 'VICTIM' | 'SUSPECT' | 'WANTED' | 'WITNESS' | 'PUNISHMENT';
};

export type MedicalEventType = EventType & {
  type: 'CYBERWARE' | 'MEDICAL_DRUG' | 'MEDICAL_PROCEDURE' | 'SYMPTOM';
};

export type PrivateRecordType = {
  id: number;
  userId: string;
  title: string;
  description: string;
  type: 'Relation' | 'Goal' | 'Meta' | 'PrivateRecord';
};
