import user from "@/configs/user";
import { HardRecord, MindRecord, OffGameRecord } from './records';

export interface User {
  id: string;

  handle: string;
  summary: string;
  active: boolean;
  name: string;
  surname: string;
  roles: UserRole[];

  faction: typeof user.factions[number];
  factionRankPublic: typeof user.factionRanks[number];
  factionRankActual: typeof user.factionRanks[number];

  speciesPublic: typeof user.species[number];
  speciesActual: typeof user.species[number];
  vibe: typeof user.vibes[number];
  vibeLevel: typeof user.vibeLevels[number];

  confrontationistVsAgreeable: typeof user.personalityStats[number];
  cowardVsBrave: typeof user.personalityStats[number];
  talkativeVsSilent: typeof user.personalityStats[number];
  thinkerVsDoer: typeof user.personalityStats[number];

  affiliation: typeof user.affiliations[number];
  profession: typeof user.professions[number];
  wealth: typeof user.wealth[number];
  cyberwareLevel: typeof user.cyberwareLavels[number];

  network: string; // networkName
  networkAdmin: string; // handle
  subnetwork: string; // subnetworkName

  combatSkill: typeof user.combatSkills[number];
  hackerSkill: typeof user.hackingSkills[number];

  favoriteUsers: string[]; // user handles

  hardRecords: HardRecord[];
  offGameRecords: OffGameRecord[];
  mindRecords: MindRecord[];

  // accounts: Account[];
  // mainAccount: string; // accountNumber

  // conversations: Conversation[];

  gigReputation: Record<string, number>; // { [string]: [number] }

  personalIce: number;
  hackerName: string;
  exploits: string[];

  // plots: Plot[]; // connection to Plots, many to many

  epsilonNotes: string;
  epsilonBankingNotes: string;
  epsilonConversationNotes: string;
  epsilonConversationsNotes: { participants: string[], notes: string, }[];
  epsilonPlots: string;
  epsilonData: Record<string, string>; // { [string]: [string] }
}

/*
 * ***********************************************
 *                 OTHER
 * ***********************************************
 */

export type UserRole = typeof user.roles[number];