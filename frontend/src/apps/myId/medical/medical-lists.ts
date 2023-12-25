interface IMedicalLists {
    name: 'drugsPrescribed' | 'implants' | 'pastTreatments';
    msgId: string;
}

/**
 * controls the order of the medical lists in the medical page
 */
export const medicalLists: IMedicalLists[] = [
    { name: 'drugsPrescribed', msgId: 'PRESCRIPTIONS' },
    { name: 'implants', msgId: 'IMPLANTS' },
    { name: 'pastTreatments', msgId: 'PAST_TREATMENTS' }
];
