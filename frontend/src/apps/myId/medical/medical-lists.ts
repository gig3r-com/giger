import { MedicalEventType } from "../../../models/medical";

interface IMedicalLists {
    name: MedicalEventType
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
