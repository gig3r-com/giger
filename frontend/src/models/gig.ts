import { IUser } from "./user";

export interface IGigBase {
    payout: number;
    title: string;
    description: string;
    category: GigCategoryNames;
    reputationRequired?: number; //0-10
}

export interface IDraftGig extends IGigBase {
    message: string;
}

export interface IGig extends IGigBase {
    status: GigStatus;
    id: string;
    author: IUser;
    takenBy?: IUser;
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
