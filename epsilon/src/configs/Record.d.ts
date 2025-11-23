import user from './user';
import { makeConst } from "@/configs/utils";
import GavelIcon from '@mui/icons-material/Gavel';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DescriptionIcon from '@mui/icons-material/Description';

/*
 * ***********************************************
 *                 RECORD TYPES
 * ***********************************************
 */
export const [
    RECORD_TYPES,
    RECORD_TYPES_LABELS,
    RECORD_TYPES_OPTIONS] = makeConst(user.recordsTypes);

/*
 * ***********************************************
 *                 HARD RECORDS
 * ***********************************************
 */
export const [
    HARD_RECORD_CATEGORIES,
    HARD_RECORD_CATEGORIES_LABELS,
    HARD_RECORD_CATEGORIES_OPTIONS] = makeConst(user.hardRecordsCategories);
export const [
    CRIMINAL_HARD_RECORD_SUBCATEGORIES,
    CRIMINAL_HARD_RECORD_SUBCATEGORIES_LABELS,
    CRIMINAL_HARD_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.criminalHardRecordsSubcategories);
export const [
    MEDICAL_HARD_RECORD_SUBCATEGORIES,
    MEDICAL_HARD_RECORD_SUBCATEGORIES_LABELS,
    MEDICAL_HARD_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.medicalHardRecordsSubcategories);
export const [
    FILE_HARD_RECORD_SUBCATEGORIES,
    FILE_HARD_RECORD_SUBCATEGORIES_LABELS,
    FILE_HARD_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.fileHardRecordsSubcategories);

/*
 * ***********************************************
 *                 MIND RECORDS
 * ***********************************************
 */
export const [
    MIND_RECORD_CATEGORIES,
    MIND_RECORD_CATEGORIES_LABELS,
    MIND_RECORD_CATEGORIES_OPTIONS] = makeConst(user.mindRecordsCategories);
export const [
    MEMORY_MIND_RECORD_SUBCATEGORIES,
    MEMORY_MIND_RECORD_SUBCATEGORIES_LABELS,
    MEMORY_MIND_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.memoryMindRecordsSubcategories);
export const [
    GOAL_MIND_RECORD_SUBCATEGORIES,
    GOAL_MIND_RECORD_SUBCATEGORIES_LABELS,
    GOAL_MIND_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.goalMindRecordsSubcategories);
export const [
    RELATION_MIND_RECORD_SUBCATEGORIES,
    RELATION_MIND_RECORD_SUBCATEGORIES_LABELS,
    RELATION_MIND_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.relationMindRecordsSubcategories);

/*
 * ***********************************************
 *               OFF GAME RECORDS
 * ***********************************************
 */
export const [
    OFF_GAME_RECORD_CATEGORIES,
    OFF_GAME_RECORD_CATEGORIES_LABELS,
    OFF_GAME_RECORD_CATEGORIES_OPTIONS] = makeConst(user.offGameRecordsCategories);
export const [
    GOAL_OFF_GAME_RECORD_SUBCATEGORIES,
    GOAL_OFF_GAME_RECORD_SUBCATEGORIES_LABELS,
    GOAL_OFF_GAME_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.goalOffGameRecordsSubcategories);
export const [
    RULE_OFF_GAME_RECORD_SUBCATEGORIES,
    RULE_OFF_GAME_RECORD_SUBCATEGORIES_LABELS,
    RULE_OFF_GAME_RECORD_SUBCATEGORIES_OPTIONS] = makeConst(user.ruleOffGameRecordsSubcategories);

/*
 * ***********************************************
 *               OFF GAME RECORDS
 * ***********************************************
 */

export const RECORD_CATEGORIES_DEFINITIONS = {
    [HARD_RECORD_CATEGORIES.CRIMINAL]: {
        icon: GavelIcon,
        subcategories: CRIMINAL_HARD_RECORD_SUBCATEGORIES,
        subcategoriesLabels: CRIMINAL_HARD_RECORD_SUBCATEGORIES_LABELS,
        subcategoriesOptions: CRIMINAL_HARD_RECORD_SUBCATEGORIES_OPTIONS,
    },
    [HARD_RECORD_CATEGORIES.MEDICAL]: {
        icon: MedicalServicesIcon,
        subcategories: MEDICAL_HARD_RECORD_SUBCATEGORIES,
        subcategoriesLabels: MEDICAL_HARD_RECORD_SUBCATEGORIES_LABELS,
        subcategoriesOptions: MEDICAL_HARD_RECORD_SUBCATEGORIES_OPTIONS,
    },
    [HARD_RECORD_CATEGORIES.FILE]: {
        icon: DescriptionIcon,
        subcategories: FILE_HARD_RECORD_SUBCATEGORIES,
        subcategoriesLabels: FILE_HARD_RECORD_SUBCATEGORIES_LABELS,
        subcategoriesOptions: FILE_HARD_RECORD_SUBCATEGORIES_OPTIONS,
    },
}