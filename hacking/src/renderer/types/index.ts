export {
  ProfileType,
  EventType,
  CriminalEventType,
  UserType,
  MedicalEventType,
  PrivateRecordType,
  ConversationType,
  MessageType,
  BankAccountType,
  FullConversationType,
  TransactionType,
} from './userTypes';

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
