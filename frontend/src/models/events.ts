export interface IObscurableInfo {
    revealCode?: string;
}

export interface IEvent extends IObscurableInfo {
    id: string;
    eventDescription: string;
    status: EventStatus;
    timestamp: string; // ISO Date timestamp
    name: string;
}

export type EventType = IMedEvent | ICriminalEvent;

export enum EventStatus {
    CURRENT = 'current',
    HISTORICAL = 'historical'
}

export enum EventRecordType {
    MEDICAL = 'medical',
    CRIMINAL = 'criminal'
}

export interface ICriminalEvent extends IEvent {
    type: CriminalEventType;
}

export enum CriminalEventType {
    VICTIM = 'victim',
    SUSPECT = 'suspect',
    WANTED = 'wanted',
    WITNESS = 'witness',
    PUNISHMENT = 'punishment'
}

export interface IMedEvent extends IEvent {
    type: MedicalEventType;
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
