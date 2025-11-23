import { networks } from '@/mockData/networks';
import { subnetworks } from '@/mockData/subnetworks';

export const SPECIES = [
    { value: 'human', label: 'Human' },
    { value: 'android', label: 'Android' },
    { value: 'ai', label: 'AI' },
]

export const CHAR_STAT = [
    { value: '0', label: '0 (----)' },
    { value: '1', label: '1 (#---)' },
    { value: '2', label: '2 (##--)' },
    { value: '3', label: '3 (###-)' },
    { value: '4', label: '4 (####)' },
]

export const COMBAT_STAT = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
]

export const HACKER_STAT = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
]

export const PERSONAL_ICE = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
]

export const NETWORKS = networks.map(net => ({
    value: net.name, label: net.name,
}))

export const SUBNETWORKS = subnetworks.map(sunbnet => ({
    value: sunbnet.name, label: sunbnet.name,
}))

export const ROLES = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'NPC', label: 'NPC' },
    { value: 'MODERATOR', label: 'Moderator' },
    { value: 'INFLUENCER', label: 'Influencer' },
    { value: 'GOD', label: 'GOD' },
    { value: 'BOSS', label: 'Boss' },
    { value: 'PLAYER', label: 'Player' },
]

export const WEALTH_LEVELS = [
    { value: 'BROKE', label: '1 - Broke' },
    { value: 'IMPOVERISHED', label: '2 - Impoverished' },
    { value: 'STRUGGLING', label: '3 - Struggling' },
    { value: 'MODEST', label: '4 - Modest' },
    { value: 'STABLE', label: '5 - Stable' },
    { value: 'COMFORTABLE', label: '6 - Comfortable' },
    { value: 'AFFLUENT', label: '7 - Affluent' },
    { value: 'ELITE', label: '8 - Elite' },
]

/*
 * ***************************************************************
 *                     RECORDS
 * ***************************************************************
 */

export const RECORDS_TYPES = [
    { value: 'TEXT', label: 'Text' },
    { value: 'FLAG', label: 'Flag' },
]

export const HARD_RECORDS_CATEGORIES = [
    { value: 'CRIMINAL', label: 'Criminal' },
    { value: 'MEDICAL', label: 'Medical' },
    { value: 'FILE', label: 'Files' },
    { value: 'ASSET', label: 'Assets' },
]

export const MIND_RECORDS_CATEGORIES = [
    { value: 'RELATION', label: 'Relation' },
    { value: 'GOAL', label: 'Goal' },
    { value: 'MEMORY', label: 'Memory' },
]

export const OFFGAME_RECORDS_CATEGORIES = [
    { value: 'META', label: 'Relation' },
    { value: 'GOAL', label: 'Goal' },
]

export const HARD_RECORDS_CRIMINAL_SUBCATEGORIES = [
    { value: 'VICTIM', label: 'Victim' },
    { value: 'SUSPECT', label: 'Suspect' },
    { value: 'WANTED', label: 'Wanted' },
    { value: 'WITNESS', label: 'Witness' },
    { value: 'PUNISHMENT', label: 'Punishment' },
]

export const HARD_RECORDS_MEDICAL_SUBCATEGORIES = [
    { value: 'CYBERWARE', label: 'Cyberware' },
    { value: 'MEDICAL_DRUG', label: 'Medical Drug' },
    { value: 'MEDICAL_PROCEDURE', label: 'Medical Procedure' },
    { value: 'SYMPTOM', label: 'Symptom' },
]

export const HARD_RECORDS_FILE_SUBCATEGORIES = [
    { value: 'PRIVATE_RECORD', label: 'Private Record' },
]

export const HARD_RECORDS_ASSET_SUBCATEGORIES = [
    { value: 'STOCKS', label: 'Stocks' },
]

export const MIND_RECORDS_RELATION_SUBCATEGORIES = [
    { value: 'FRIEND', label: 'Friend' },
    { value: 'ENEMY', label: 'Enemy' },
]

export const MIND_RECORDS_GOAL_SUBCATEGORIES = [
    { value: 'FACTION', label: 'Faction' },
]

export const MIND_RECORDS_MEMORY_SUBCATEGORIES = [
    { value: 'TRAUMA', label: 'Trauma' },
]

export const OFFGAME_RECORDS_META_SUBCATEGORIES = [
    { value: 'INFORMATIONS', label: 'Informations' },
]

export const OFFGAME_RECORDS_GOAL_SUBCATEGORIES = [
    { value: 'FACTION', label: 'Faction' },
]
