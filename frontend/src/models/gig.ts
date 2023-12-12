import { IUserBase } from "./user";

export interface IGigBase {
    payout: number;
    title: string;
    description: string;
    category: GigCategoryNames;
    reputationRequired?: GigRepuation;
    id: string;
}

export interface IDraftGig extends IGigBase {
    message: string;
}

export interface IGig extends IGigBase {
    status: GigStatus;
    author: IUserBase;
    takenBy?: IUserBase;
}

export type GigRepuation = 0 | 1 | 2 | 3 | 4 | 5;

export interface IGigCategory {
    type: GigCategoryNames;
    icon: string;
}

export enum GigCategoryNames {
    RELATION = 'relation',
    COMBAT = 'combat',
    TECH = 'tech',
    INFO = 'info',
    COURIER = 'courier',
    MEDICAL = 'medical',
    HACKING = 'hacking',
    WEAPONS = 'weapons',
    DRUGS = 'drugs'
}

export enum GigStatus {
    AVAILABLE = 'available',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    PENDING = 'pending'
}

export const reputationLabels = new Map<GigRepuation, string>([
    [0, 'ROOKIE'],
    [1, 'AMATEUR'],
    [2, 'EXPERIENCED'],
    [3, 'PROFESSIONAL'],
    [4, 'EXPERT'],
    [5, 'MASTER'] 
]);
