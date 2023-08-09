import { IMessage } from "./message";

export interface IGig {
    status: string;
    id: string;
    payout: number;
    description: string;
    messages: IMessage[];
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