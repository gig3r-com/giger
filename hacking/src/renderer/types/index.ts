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
  accessPoint: string;
  firewall: 'EncryptGuard' | 'FirewallX' | 'VirtualVault' | 'Unknown';
  operatingSystem: 'ForceField' | 'EvilTwin' | 'JoanOfArc' | 'Unknown';
  ice: string[];
  pastHacks: string[];
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

export type ExploitType = {
  name: string;
  type: 'breacher' | 'decrypter';
  effect: BreachEffectType;
};

export type ProgramType = {
  name: string;
  type: 'encrypter' | 'firewall';

  // Encrypter
  timeOnPerfectBreach?: number;
  timeOnImperfectBreach?: number;
  encryptedCommands?: string[];

  // ICE
  targetModel?: 'initial' | 'active' | 'active&initial';
  stage1SuccessRate: number; // > 25%
  stage2SuccessRate: number; // > 50%
  stage3SuccessRate: number; // > 75%
  stage4SuccessRate: number; // > 90%
  stage5SuccessRate: number; // > 90%
  finalStageSuccessRate: number; // = 100%

  // ICE - Boost
  boostValue?: number;
};

export type BreachEffectType = {
  isConnected: boolean;
  perfect: boolean;
  breachTime: number;
};

export type ProgramCodeInfoType = {
  id: string;
  programCode: string;
  isUsed: boolean;
};
