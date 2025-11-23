/*
 ************************************************
 * BANKING
 ************************************************
 */
export interface Transaction {
    id: string;
    from: string;           // accountNumber
    to: string;             // accountNumber
    amount: number;         // can be negative
    timestamp: timestamp;
    title: string;
    orderingUser: string;   // user handle
    hackData?: string;
}

export interface Account {
    id: string;
    type: 'PRIVATE' | 'BUSINESS';
    name?: string;
    accountNumber: string;
    balance: number; // can be negative
    owners: string[]; // user handles
    transactions: Transaction[];
}

/*
 ************************************************
 * CONVERSATIONS
 ************************************************
 */
export type Message = {
    id: string;
    timestamp: timestamp;
    sender: string; // user handle
    type: 'TEXT'; // in futere we can add IMAGE, FILE, etc.
    data: string;
    readBy: string[]; // user handles
    hacker?: string; // user handle
    epsilonNote?: string;
}

export type Conversation = {
    id: string;
    title?: string; // can be used only if there is more than 2 participants
    participants: string[]; // user handles
    anonymizedUsers: string[]; // user handles
    gigConversation: boolean;
    messages: Message[];
    hackers: string[]; // user handles
}

/*
 ************************************************
 * NETWORKING
 ************************************************
 */
export type Log = {
    id: string;
    timestamp: timestamp;
    sourceUser: string; // user handle
    targetUser: string; // user target
    logType: string; //todo
    logData: string;
    subnetwork: string // subnetwork name
    // todo hack data
}

export type Subnetwork = {
    id: string;
    name: string;
    network: string; // network name
    users: string[]; // user handles
    firewall: string;
    operationSystem: string;
    ice: string[];
    accessPoint?: 'RED' | 'GREEN' | 'BLUE' | 'BLACK' | 'WHITE';
    pastHacks: string[];
    logs: Log[];
}

export type Network = {
    id: string;
    name: string;
    admin: string; // user handle
    subnetworks: string[]; // subnetwork names
    nodes: Record<string, string>; // { [string]: [string] }
    data: Record<string, string>; // { [string]: [string] }
    epsilonDescription?: string;
}

export type ProgramCodes = {
    id: string;
    code: string;
    program: string; // human readable name of a program
    isUsed: boolean;
    creator?: string; // if code was created by player here will be his handle
    owner?: string; // if code was used here will be who used it
}

/*
 ************************************************
 * USER
 ************************************************
 */
export type HardDataRecordsCategories = 'CRIMINAL' | 'MEDICAL' | 'FILE' | 'ASSET';
export type CriminalSubcategories = 'VICTIM' | 'SUSPECT' | 'WANTED' | 'WITNESS' | 'PUNISHMENT';

export type MindDataRecordsCategories = 'MEMORY' | 'IDEA' | 'RELATION';

export interface RecordType {
    id: string;
    type: 'TEXT' | 'FLAG'; // info how to read data, can be more in future
    category?: '';
    subCategory?: string;
    title: string;
    data: string;
    timestamp?: timestamp;
    isReveled: boolean;
    revealCode?: string;
    isEncrypted: boolean;
    encryptionLevel: number;
    hackData?: string;
}

export type User = {
    id: string;
    roles: string[];

    handle: string;
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

    epsilonNotes: string;
    epsilonBankingNotes: string;
    epsilonConversationNotes: string;
    epsilonConversationsNotes: { participants: string[], notes: string, }[];
    epsilonPlots: string;
    epsilonData: Record<string, string>; // { [string]: [string] }
}