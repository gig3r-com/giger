type Transaction = {
    id: string;
    from: string; // accountNumber
    to: string; // accountNumber
    amount: number;
    timestamp: timestamp;
    title: string;
    orderingUser: string; // user handle
    hackData?: string;
}

type Account = {
    id: string;
    type: 'PRIVATE' | 'BUSINESS';
    accountNumber: string;
    balance: number; // can be negative
    owners: string[]; // user handles
    transactions: Transaction[];
}

type RecordType = {
    id: string;
    type: string;
    category?: string;
    subCategory?: string;
    title: string;
    data: string;
    timestamp?: timestamp;
    hackData?: string;
    isReveled: boolean;
}

type Message = {
    id: string;
    timestamp: timestamp;
    sender: string; // user handle
    type: string;
    data: string;
    readBy: string[]; // user handles
    hacker?: string; // user handle
    epsilonNote: string;
}

type Conversation = {
    id: string;
    title?: string;
    participants: string[]; // user handles
    anonymizedUsers: string[]; // user handles
    gigConversation: boolean;
    messages: Message[];
    hackers: string[]; // user handles
}

type GigStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'PENDING_CONFIRMATION' | 'DISPUTE' | 'EXPIRED';

type Gig = {
    id: string;
    category: string;
    subCategory: string;
    payout: number;
    title: string;
    description: string;
    descriptionDetailed: string;
    IsRevealedByClient: boolean;
    createdAt: timestamp;
    acceptedAt: timestamp;
    mode: 'CREATED_BY_WORKER' | 'CREATED_BY_EMPLOYER';

    creator: 'WORKER' | 'EMPLOYER';
    status: GigStatus;
    reputationRequired: number;
    conversationId: string; // conversation id

    isEmployerAnonymized: boolean;
    employerHandle?: string;
    employerAccount?: string;

    isWorkerAnonymized: boolean;
    workerAccount?: string;
    workerHandle?: string;

    markedAsComplaintAt: timestamp;
    complaintReason: string;
}

type Log = {
    id: string;
    timestamp: timestamp;
    sourceUser: string; // user handle
    targetUser: string; // user target
    logType: string; // a lot of logs will be created by api, on sending message, transfer etc. so if you really need enum you can use one (check public enum LogType) but if possible add a possibility to add a random string :) if you dont need enum just use string
    logData: string;
    subnetwork: string // subnetwork name
    // todo hack data
}

type Subnetwork = {
    id: string;
    name: string;
    network: string; // network name
    users: string[]; // user handles
    firewall: string;
    operationSystem: string;
    ice: string[];
    accessPoint: string;
    pastHacks: string[];
    logs: Log[];
}

type Network = {
    id: string;
    name: string;
    admin: string; // user handle
    subnetworks: string[]; // subnetwork names
    nodes: Record<string, string>; // { [string]: [string] }
    data: Record<string, string>; // { [string]: [string] }
}

type ProgramCodes = {
    id: string;
    code: string;
    program: string;
    isUsed: boolean;
}

type User = {
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
    epsilonConversationsNotes: { participants: string[], notes: string, }[];
    epsilonPlots: string[];
    epsilonData: Record<string, string>; // { [string]: [string] }
}