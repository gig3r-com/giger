export type PersonType = 'HUMAN' | 'AI' | 'ANDROID';
export type CriminalEventType = 'VICTIM' | 'SUSPECT' | 'WANTED' | 'WITNESS' | 'PUNISHMENT';
export type CriminalEventStatus = 'CURRENT' | 'HISTORICAL';

export type CriminalEvent = {
  type: CriminalEventType;
  name: string;
  eventDescription: string;
  status: CriminalEventStatus;
  timeStamp: string; // ISO
};

export type Subject = {
  name: string;
  surname: string;
  handle: string;
  type: PersonType;
  faction: string;
  factionRank: string;
  cyberwareLevel: 0 | 1 | 2 | 3 | 4 | 5;
  combatSkill: 0 | 1 | 2 | 3;
  highSecurity: boolean;
  clearanceRequired: 1 | 2 | 3 | 4 | 5;
  criminalEvents: CriminalEvent[];
};

export type AuditEntry = { t: number; msg: string };
export type StoredSession = {
  id: string;
  officer: string;
  clearance: 1|2|3|4|5;
  start: number;
  end?: number;
  logs: AuditEntry[];
};

export type LoginResult = { name: string; clearance: 1|2|3|4|5 };
export type SearchBuckets = {
  identity: SearchItem[];
  eventTitle: SearchItem[];
  eventDesc: SearchItem[];
  faction: SearchItem[];
  type: SearchItem[];
};
export type SearchItem =
  | { kind: 'identity'; field: 'handle'|'name'|'surname'; subject: Subject }
  | { kind: 'faction'; field: 'faction'|'factionRank'; subject: Subject }
  | { kind: 'eventTitle'; subject: Subject; event: CriminalEvent }
  | { kind: 'eventDesc'; subject: Subject; event: CriminalEvent }
  | { kind: 'type'; subject: Subject };
