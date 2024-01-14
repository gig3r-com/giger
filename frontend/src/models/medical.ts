import { IObscurableInfo } from "./general";

export interface IMedHistory {
    userId: string;
    medEvents: IMedEvent[];
}
/**
 * some information may be unknown to the player until they unlock it by performing a specific action ingame.
 * they will be given a code to input, which will unlock the information.
 */
export interface IMedEvent extends IObscurableInfo {
    id: string;
    name: string;
    timestamp: string; // ISO Date timestamp
    type: MedicalEventType;
    description: string;
    status: MedicalEventStatus;
}

export enum MedicalEventType {
    CYBERWARE = 'cyberware',
    MEDICAL_DRUG = 'medical drug',
    MEDICAL_PROCEDURE = 'medical procedure',
    SYMPTOM = 'symptom'
}

export enum MedicalEventStatus {
    CURRENT = 'current',
    HISTORICAL = 'historical'
}
