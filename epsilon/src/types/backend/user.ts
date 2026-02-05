import { RecordType } from './records';
import { Plot, } from './ploting';
import { Conversation, } from './conversations';
import { Account, } from './banking';

export type User = {
    id: string;
    roles: string[];

    handle: string;
    summary: string;
    active: boolean;
    name: string;
    surname: string;

    faction: string;
    factionRankPublic: string;
    factionRankActual: string;

    speciesPublic: string;
    speciesActual: string;
    vibe: string;
    vibeLevel: number;

    confrontationistVsAgreeable: number;
    cowardVsBrave: number;
    talkativeVsSilent: number;
    thinkerVsDoer: number;

    affiliation: string;
    profession: string;
    wealth: string;
    cyberwareLevel: number;

    network: string; // networkName
    networkAdmin: string;
    subnetwork: string; // subnetworkName

    combatSkill: number;
    hackerSkill: number;

    favoriteUsers: string[]; // user handles

    hardRecords: RecordType[];
    offGameRecords: RecordType[];
    mindRecords: RecordType[];

    accounts: Account[];
    mainAccount: string; // accountNumber

    conversations: Conversation[];

    gigReputation: Record<string, number>; // { [string]: [number] }

    personalIce: number;
    hackerName: string;
    exploits: string[];

    plots: Plot[]; // connection to Plots, many to many

    epsilonNotes: string;
    epsilonBankingNotes: string;
    epsilonConversationNotes: string;
    epsilonConversationsNotes: { participants: string[], notes: string, }[];
    epsilonPlots: string;
    epsilonData: Record<string, string>; // { [string]: [string] }
}