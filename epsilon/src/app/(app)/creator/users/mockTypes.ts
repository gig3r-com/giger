export type Transaction = {
    id: string;
    from: string; // accountNumber
    to: string; // accountNumber
    amount: number;
    string: string;
    title: string;
    orderingUser: string; // user handle
    hackData?: string;
}

export type Account = {
    id: string;
    type: 'PRIVATE' | 'BUSINESS';
    accountNumber: string;
    balance: number; // can be negative
    owners: string[]; // user handles
    transactions: Transaction[];
}

export type Record = {
    id: string;
    type: string;
    category?: string;
    subCategory?: string;
    title: string;
    data: string;
    string?: string;
    hackData?: string;
}

export type Message = {
    id: string;
    string: string;
    sender: string; // user handle
    type: string;
    data: string;
    readBy: string[]; // user handles
}

export type Conversation = {
    id: string;
    participants: string[]; // user handles
    anonymizedUsers: string[]; // user handles
    gigConversation: boolean;
    messages: Message[];
}

export type GigStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'PENDING_CONFIRMATION' | 'DISPUTE' | 'EXPIRED';

export type Gig = {
    id: string;
    category: string;
    subCategory: string;
    payout: number;
    title: string;
    description: string;
    descriptionDetailed: string;
    IsRevealedByClient: boolean;
    createdAt: string;
    acceptedAt: string;
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

    markedAsComplaintAt: string;
    complaintReason: string;
}

export type Log = {
    id: string;
    string: string;
    sourceUser: string; // user handle
    targetUser: string; // user target
    logType: string; // a lot of logs will be created by api, on sending message, transfer etc. so if you really need enum you can use one (check public enum LogType) but if possible add a possibility to add a random string :) if you dont need enum just use string
    logData: string;
    subnetwork: string // subnetwork name
}

export type Subnetwork = {
    id: string;
    name: string;
    network: string; // network name
    users: string[]; // user handles
    firewall: string;
    operationSystem: string;
    ice: string[];
    pastHacks: string[];
    nodes: string[];
    logs: Log[];
}

export type Network = {
    id: string;
    name: string;
    admin: string; // user handle
    subnetworks: string[]; // subnetwork names
    data: string[];
}

export type ProgramCodes = {
    id: string;
    code: string;
    isUsed: boolean;
}

export type User = {
    id: string;
    active: boolean;
    roles: string[];
    handle: string;

    name: string;
    surname: string;
    species: string;
    cyberwareLevel: number;

    faction: string;
    factionRankPublic: string;
    factionRankActual: string;

    speciesPrivate: string;
    hardRecords: Record[];
    favoriteUsers: string[]; // user handles

    offGameRecords: Record[];
    combatSkill: number;
    hackerSkill: number;
    confrontationistVsAgreeable: number;
    cowardVsBrave: number;
    talkativeVsSilent: number;
    thinkerVsDoer: number;

    vibe: string;
    mindRecords: Record[];
    affiliation: string;
    profession: string;
    wealth: string;

    accounts: Account[];
    mainAccount: string; // accountNumber

    conversations: Conversation[];

    network: string; // networkName
    networkAdmin: string;
    subnetwork: string; // subnetworkName

    gigReputation: Record<string, number>; // { [string]: [number] }

    hackingSkill: number;
    personalIce: number;
    hackerName: string;
    exploits: string[];
}