import { IObscurableInfo } from "./general";

export interface ICriminalRecord {
    userId: string;
    entries: ICriminalRecordEntry[];
}

export interface ICriminalRecordEntry extends IObscurableInfo {
    id: string;
    userId: string;
    eventDescription: string;
    status: CriminalEventStatus;
    timestamp: string; // Date timestamp
}

export enum CriminalRecordType {
    VICTIM = 'victim',
    SUSPECT = 'suspect',
    WANTED = 'wanted',
    WITNESS = 'witness',
    PUNISHMENT = 'punishment'
}

export enum CriminalEventStatus {
    CURRENT = 'current',
    HISTORICAL = 'historical'
}
