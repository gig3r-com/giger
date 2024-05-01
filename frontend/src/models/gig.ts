import { Factions } from './companies';

export interface IGigBase {
    createdAt: string; //ISO date string
    acceptedAt?: string; //ISO date string
    payout: number;
    title: string;
    description: string;
    category: GigCategoryNames;
    subcategory: GigSubcategoryNames;
    reputationRequired?: GigRepuationLevels;
    id: string;
    providerAccount: string; // account id
    clientAccount: string; // account id
    anonymizedAuthor?: boolean;
    mode: GigModes;
}

export interface IDraftGig extends IGigBase {
    message: string;
}

export interface IGig extends IGigBase {
    status: GigStatus;
    authorId: string;
    takenById?: string;
    takenForCompany?: Factions;
    markedAsComplaintAt?: string; //ISO date string
    complaintReason?: string;
}

export type GigRepuationLevels = 0 | 1 | 2 | 3 | 4 | 5;

export interface IGigCategory {
    type: GigCategoryNames;
    icon: string;
    subcategories: IGigSubcategory[];
}

export interface IGigSubcategory {
    type: GigSubcategoryNames;
    minPayout: number;
    maxPayout: number;
}

export enum GigCategoryNames {
    FIXER = 'fixer',
    KILLER = 'killer',
    HACKING = 'hacking',
    WELLBEING = 'wellbeing'
}

export enum GigSubcategoryNames {
    INTEL = 'INTEL',
    TECH = 'TECH',
    DELIVERY = 'DELIVERY',
    GUNS_AND_AMMO = 'GUNS_AND_AMMO',
    DRUGS = 'DRUGS',
    OTHER_MERCH = 'OTHER_MERCH',
    ITEM_ACQUISITION = 'ITEM_ACQUISITION',
    ANDROID_ACQUISITION = 'ANDROID_ACQUISITION',
    DEBT_COLLECTION = 'DEBT_COLLECTION',
    INTIMIDATION = 'INTIMIDATION',
    KIDNAPPING = 'KIDNAPPING',
    BODYGUARD = 'BODYGUARD',
    HIT = 'HIT',
    LOVER_EXPERIENCE = 'LOVER_EXPERIENCE',
    SEX_DOLL = 'SEX_DOLL',
    QUICKIE = 'QUICKIE',
    FIRST_AID = 'FIRST_AID',
    CYBERWARE = 'CYBERWARE',
    MEDEVAC = 'MEDEVAC',
    RENTING_LOCATION = 'RENTING_LOCATION',
    BANK_ACCOUNT_MANIPULATION = 'BANK_ACCOUNT_MANIPULATION',
    SPOOFING = 'SPOOFING',
    SECURITY = 'SECURITY',
    ANDROID_HIJACK = 'ANDROID_HIJACK',
    MINDEXPLOIT = 'MINDEXPLOIT'
}

export enum GigStatus {
    AVAILABLE = 'available',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    PENDING_CONFIRMATION = 'pending',
    DISPUTE = 'dispute',
    EXPIRED = 'expired'
}

export enum GigModes {
    PROVIDER = 'provider',
    CLIENT = 'client'
}

export const reputationLabels = new Map<GigRepuationLevels, string>([
    [0, 'ROOKIE'],
    [1, 'AMATEUR'],
    [2, 'EXPERIENCED'],
    [3, 'PROFESSIONAL'],
    [4, 'EXPERT'],
    [5, 'MASTER']
]);

export const reputationBrackets = new Map<GigRepuationLevels, number>([
    [0, 0],
    [1, 10000],
    [2, 20000],
    [3, 30000],
    [4, 40000],
    [5, Infinity]
]);

export interface IGigReputation {
    userId: string;
    reputationLevels: Map<GigCategoryNames, GigRepuationLevels>;
}
