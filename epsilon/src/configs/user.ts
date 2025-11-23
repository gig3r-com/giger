const user = {
    roles: ['PLAYER', 'CREATOR', 'GOD'] as const,


    /*
     * ***********************************************
     *                   RECORDS
     * ***********************************************
     */
    recordsTypes: ['TEXT', 'FLAG'] as const,

    hardRecordsCategories: ['CRIMINAL', 'MEDICAL', 'FILE'] as const,
    criminalHardRecordsSubcategories: ['VICTIM', 'SUSPECT', 'WANTED', 'WITNESS', 'PUNISHMENT'] as const,
    medicalHardRecordsSubcategories: ['CYBERWARE', 'MEDICAL_DRUG', 'MEDICAL_PROCEDURE', 'SYMPTOM'] as const,
    fileHardRecordsSubcategories: ['PRIVATE_RECORD', 'PROGRAM'] as const,

    mindRecordsCategories: ['MEMORY', 'GOAL', 'RELATION'] as const,
    memoryMindRecordsSubcategories: [] as const,
    goalMindRecordsSubcategories: [] as const,
    relationMindRecordsSubcategories: ['FRIEND', 'ENEMY'] as const,

    offGameRecordsCategories: ['GOAL', 'RULE'] as const,
    goalOffGameRecordsSubcategories: [] as const,
    ruleOffGameRecordsSubcategories: [] as const,
};

export default user;