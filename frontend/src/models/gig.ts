import { IUserBase } from "./user";

export interface IGigBase {
    payout: number;
    title: string;
    description: string;
    category: GigCategoryNames;
    reputationRequired?: number; //0-10
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
