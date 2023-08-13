import { IMessage } from "./message";

export interface IGig {
    status: GigStatus;
    id: string;
    payout: number;
    title: string;
    description: string;
    messages: IMessage[];
    category: GigCategoryNames;
    reputationRequired?: number; //0-10
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
    COMPLETED = 'completed'
}
