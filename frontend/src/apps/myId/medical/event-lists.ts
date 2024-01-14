import { CriminalEventType, MedicalEventType } from "../../../models/events";

interface IMedicalLists {
    name: MedicalEventType;
    msgId: string;
}

interface ICriminalLists {
    name: CriminalEventType;
    msgId: string;
}

/**
 * controls the order of the medical lists in the medical page
 */
export const medicalLists: IMedicalLists[] = [
    { name: MedicalEventType.MEDICAL_DRUG , msgId: 'PRESCRIPTIONS' },
    { name: MedicalEventType.CYBERWARE, msgId: 'IMPLANTS' },
    { name: MedicalEventType.MEDICAL_PROCEDURE, msgId: 'PAST_TREATMENTS' },
    { name: MedicalEventType.SYMPTOM, msgId: 'SYMPTOMS' }
];


/**
 * controls the order of the medical lists in the medical page
 */
export const criminalLists: ICriminalLists[] = [
    { name: CriminalEventType.VICTIM, msgId: 'VICTIM' },
    { name: CriminalEventType.SUSPECT, msgId: 'SUSPECT' },
    { name: CriminalEventType.WANTED, msgId: 'WANTED' },
    { name: CriminalEventType.WITNESS, msgId: 'WITNESS' },
    { name: CriminalEventType.PUNISHMENT, msgId: 'PUNISHMENT' }
];
