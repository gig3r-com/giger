export function mapUser(data: ApiUser) {
  return {
    ...data
  }
}

// Atomic pieces
export interface StatBlock {
  stat: number;
}

export type VibeEngagement = 'HYPED' | 'FANATIC' | string;
export type WealthLevel = 'BROKE' | 'STABLE' | 'COMFORTABLE' | string;
export type EntityType = 'AI' | 'HUMAN' | string;
export type MindHackState = 'DISABLED' | string;

export interface GigReputation {
  FIXER: number;
  KILLER: number;
  HACKING: number;
  WELLBEING: number;
}

// Records visible in profile sections
interface WithId {
  id: string;
}
interface Revealable {
  isRevealed: boolean;
}

export interface PrivateRecord extends WithId, Revealable {
  recordType: 'PRIVATE_RECORD';
  title: string;
  description: string;
}

export interface RelationRecord extends WithId, Revealable {
  recordType: 'RELATION';
  userName: string;
  description: string;
}

export interface GoalRecord extends WithId, Revealable {
  recordType: 'GOAL';
  title: string;
  description: string;
}

export interface MetaRecord extends WithId {
  recordType: 'META';
  title: string;
  description: string;
}

// Timeline events
export type EventStatus = 'CURRENT' | 'HISTORICAL' | string;

export type CriminalEventType = 'SUSPECT' | 'PUNISHMENT' | string;
export interface CriminalEvent extends WithId, Revealable {
  type: CriminalEventType;
  name: string;
  eventDescription: string;
  status: EventStatus;
  timeStamp: string; // ISO
}

export type MedicalEventType = 'CYBERWARE' | 'MEDICAL_PROCEDURE' | string;
export interface MedicalEvent extends WithId, Revealable {
  type: MedicalEventType;
  name: string;
  eventDescription: string;
  status: EventStatus;
  timeStamp: string; // ISO
}

// Main User shape
export interface ApiUser {
  id: string;
  handle: string;
  hackerName: string;

  name: string;
  surname: string;

  active: boolean;
  roles: string[];
  aliasMap: Record<string, string>;

  // Types & factions
  typeActual: EntityType;
  typePublic: EntityType;
  faction: string;                 // e.g., "foundation", "gunners", "no_faction"
  factionRankActual: string;
  factionRankPublic: string;

  // Network placement
  networkId: string;
  networkName: string;
  subnetworkId: string;
  subnetworkName: string;
  networkAdminName: string;

  // Vibe & wealth
  vibe: string;                    // e.g., "OVERSEERS", "NO_VIBE", "DIZORDERS"
  vibeFunction: string;
  vibeOpinions: string | null;
  vibeEngagement: VibeEngagement;
  wealthLevel: WealthLevel;

  // Stats & skills
  cyberwareLevel: StatBlock;
  hackingSkills: StatBlock;
  confrontationistVsAgreeable: StatBlock;
  cowardVsBrave: StatBlock;
  talkativeVsSilent: StatBlock;
  thinkerVsDoer: StatBlock;
  combatSkill: StatBlock;

  // Reputation & economy
  gigReputation: GigReputation;
  insuredAmount: number;
  reputationDescription: string | null;

  // Access / flags
  hasPlatinumPass: boolean;
  highSecurity: boolean;

  // Relationships & preferences
  favoriteUserIds: string[];
  relations: RelationRecord[];
  goals: GoalRecord[];

  // Records / notes
  privateRecords: PrivateRecord[];
  meta: MetaRecord[];

  // Events
  criminalEvents: CriminalEvent[];
  medicalEvents: MedicalEvent[];

  // Tools / abilities
  exploits: string[];
  mindHack: MindHackState;
  mindHackEnabledFor: string[];

  // Misc
  assets: unknown[];
}
