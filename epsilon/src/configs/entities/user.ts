import {
    PersonalInjury,
    PersonSearch,
    Report,
    Visibility,
    Gavel,
} from '@mui/icons-material';

const user = {
    roles: ['PLAYER', 'CREATOR', 'DIRECTOR', 'GOD', 'NPC'] as const,
    species: ['ANDROID', 'AI', 'HUMAN'] as const,
    vibes: ['OVERSEERS', 'SWARM'] as const,
    vibeLevels: ['0', '1', '2', '3', '4', '5'] as const,

    factions: ['OMNI', 'TAKAYAMA'] as const,
    factionRanks: ['1', '2', '3'] as const,

    personalityStats: ['1', '2', '3', '4', '5'] as const,
    cyberwareLavels: ['1', '2', '3', '4', '5'] as const,
    hackingSkills: ['1', '2', '3', '4', '5'] as const,
    combatSkills: ['1', '2', '3', '4', '5'] as const,

    affiliations: [] as const,
    professions: [] as const,
    wealth: [] as const,

    /*
     * ***********************************************
     *                   Gigs
     * ***********************************************
     */
    gigsCategories: [] as const,
    gigsSubcategories: [] as const,

    /*
     * ***********************************************
     *                   RECORDS
     * ***********************************************
     */
    recordsTypes: ['TEXT', 'FLAG'] as const,

    hardRecordsCategories: ['CRIMINAL', 'MEDICAL', 'FILE'] as const,

    recordCatCriminal: 'CRIMINAL',
    criminalHardRecordsSubcategories: ['VICTIM', 'SUSPECT', 'WANTED', 'WITNESS', 'PUNISHMENT'] as const,
    criminalIconsBySubcategories: {
        VICTIM: PersonalInjury,
        SUSPECT: PersonSearch,
        WANTED: Report,
        WITNESS: Visibility,
        PUNISHMENT: Gavel,
    },
    recordCatMedical: 'MEDICAL',
    medicalHardRecordsSubcategories: ['CYBERWARE', 'MEDICAL_DRUG', 'MEDICAL_PROCEDURE', 'SYMPTOM'] as const,

    recordCatFile: 'FILE',
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