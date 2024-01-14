export interface IGigBase {
    payout: number;
    title: string;
    description: string;
    category: GigCategoryNames;
    reputationRequired?: GigRepuationLevels;
    id: string;
    anonymizedAuthor?: boolean;
}

export interface IDraftGig extends IGigBase {
    message: string;
}

export interface IGig extends IGigBase {
    status: GigStatus;
    authorId: string;
    takenById?: string;
}

export type GigRepuationLevels = 0 | 1 | 2 | 3 | 4 | 5;

export interface IGigCategory {
    type: GigCategoryNames;
    icon: string;
}

export enum GigCategoryNames {
    INTEL = 'intel',
    TECH = 'tech',
    DELIVERY = 'delivery',
    GUNS_AND_AMMO = 'Guns & ammo',
    DRUGS = 'drugs',
    OTHER_MERCH = 'other merch',
    ITEM_ACQUSITION = 'Item acquisition',
    ANDROID_ACQUISITION = 'android acquisition',
    DEBT_COLLECTION = 'debt collection',
    INTIMIDATION = 'intimidation',
    KIDNAPPING = 'kidnapping',
    BODYGUARD = 'bodyguard',
    HIT = 'hit',
    LOVER_EXPERIENCE = 'lover experience',
    SEX_DOLL = 'sex doll',
    QUICKIE = 'quickie',
    FIRST_AID = 'first aid',
    CYBERWARE = 'cyberware',
    MEDEVAC = 'medEvac',
    RENTING_LOCATION = 'renting location',
    BANK_ACCOUNT_MANIPULATION = 'bank account manipulation',
    SPOOFING = 'spoofing',
    SECURITY = 'security',
    ANDROID_HIJACK = 'android hijack',
    COMPLAINT = 'complaint'
}

export enum GigStatus {
    AVAILABLE = 'available',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    PENDING = 'pending',
    DISPUTE = 'dispute'
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
