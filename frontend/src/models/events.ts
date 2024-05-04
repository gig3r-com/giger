import { IObscurableInfo } from "./general";

export interface IEvent extends IObscurableInfo {
    id: string;
    eventDescription: string;
    status: EventStatus;
    timestamp: string; // ISO Date timestamp
    name: string;
}

export type EventType = IMedEvent | ICriminalEvent;

export enum EventStatus {
    CURRENT = 'CURRENT',
    HISTORICAL = 'HISTORICAL'
}

export enum EventRecordType {
    MEDICAL = 'MEDICAL',
    CRIMINAL = 'CRIMINAL'
}

export interface ICriminalEvent extends IEvent {
    type: CriminalEventType;
}

export enum CriminalEventType {
    VICTIM = 'VICTIM',
    SUSPECT = 'SUSPECT',
    WANTED = 'WANTED',
    WITNESS = 'WITNESS',
    PUNISHMENT = 'PUNISHMENT'
}

export interface IMedEvent extends IEvent {
    type: MedicalEventType;
}

export enum MedicalEventType {
    CYBERWARE = 'CYBERWARE',
    MEDICAL_DRUG = 'MEDICAL DRUG',
    MEDICAL_PROCEDURE = 'MEDICAL PROCEDURE',
    SYMPTOM = 'SYMPTOM'
}

export enum MedicalEventStatus {
    CURRENT = 'CURRENT',
    HISTORICAL = 'HISTORICAL'
}
