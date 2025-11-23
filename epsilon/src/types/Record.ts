import user from '@/configs/user';

export interface Record {
    id: string;
    type: RecordType;
    category?: HardRecordCategories | MindRecordCategories | OffGameRecordCategories;
    subCategory?: AllHardRecordSubcategories | AllMindRecordSubcategories | AllOffGameRecordSubcategories;
    title: string;
    data: string;
    timestamp?: string;
    isReveled: boolean;
    revealCode?: RevealCode;
    isEncrypted: boolean;
    encryptionLevel: EncryptionLevel;
    hackData?: RecordHackData;
}

export interface HardRecord extends Record {
    category?: HardRecordCategories;
    subCategory?: AllHardRecordSubcategories;
}

export interface MindRecord extends Record {
    category?: MindRecordCategories;
    subCategory?: AllMindRecordSubcategories;
}

export interface OffGameRecord extends Record {
    category?: OffGameRecordCategories;
    subCategory?: AllOffGameRecordSubcategories;
}

export type RevealCode = string;
export type EncryptionLevel = number;
export type RecordHackData = string;

/*
 * ***********************************************
 *                 RECORD TYPES
 * ***********************************************
 */
export type RecordType = typeof user.recordsTypes[number];

/*
 * ***********************************************
 *                 HARD RECORDS
 * ***********************************************
 */
export type HardRecordCategories = typeof user.hardRecordsCategories[number];
export type CriminalHardRecordsSubcategories = typeof user.criminalHardRecordsSubcategories[number];
export type MedicalHardRecordsSubcategories = typeof user.medicalHardRecordsSubcategories[number];
export type FileHardRecordsSubcategories = typeof user.fileHardRecordsSubcategories[number];
export type AllHardRecordSubcategories = CriminalHardRecordsSubcategories | MedicalHardRecordsSubcategories | FileHardRecordsSubcategories;

/*
 * ***********************************************
 *                 MIND RECORDS
 * ***********************************************
 */
export type MindRecordCategories = typeof user.mindRecordsCategories[number];
export type MemoryMindRecordsSubcategories = typeof user.memoryMindRecordsSubcategories[number];
export type GoalMindRecordsSubcategories = typeof user.goalMindRecordsSubcategories[number];
export type RelationMindRecordsSubcategories = typeof user.relationMindRecordsSubcategories[number];
export type AllMindRecordSubcategories = MemoryMindRecordsSubcategories | GoalMindRecordsSubcategories | RelationMindRecordsSubcategories;

/*
 * ***********************************************
 *               OFF GAME RECORDS
 * ***********************************************
 */
export type OffGameRecordCategories = typeof user.offGameRecordsCategories[number];
export type GoalOffGameRecordsSubcategories = typeof user.goalOffGameRecordsSubcategories[number];
export type RuleOffGameRecordsSubcategories = typeof user.ruleOffGameRecordsSubcategories[number];
export type AllOffGameRecordSubcategories = GoalOffGameRecordsSubcategories | RuleOffGameRecordsSubcategories;