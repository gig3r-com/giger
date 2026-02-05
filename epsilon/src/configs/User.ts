import user from './entities/user';
import { makeConst } from "@/configs/utils";

/* ***********************************************
 *                   User Core
 * *********************************************** */

export const [
    USER_ROLES,
    USER_ROLES_LABELS,
    USER_ROLES_OPTIONS,
] = makeConst(user.roles);

export const [
    USER_SPECIES,
    USER_SPECIES_LABELS,
    USER_SPECIES_OPTIONS,
] = makeConst(user.species);

/* ***********************************************
 *                   Vibes
 * *********************************************** */

export const [
    USER_VIBES,
    USER_VIBES_LABELS,
    USER_VIBES_OPTIONS,
] = makeConst(user.vibes);

export const [
    USER_VIBE_LEVELS,
    USER_VIBE_LEVELS_LABELS,
    USER_VIBE_LEVELS_OPTIONS,
] = makeConst(user.vibeLevels);

/* ***********************************************
 *                   Factions
 * *********************************************** */

export const [
    USER_FACTIONS,
    USER_FACTIONS_LABELS,
    USER_FACTIONS_OPTIONS,
] = makeConst(user.factions);

export const [
    USER_FACTION_RANKS,
    USER_FACTION_RANKS_LABELS,
    USER_FACTION_RANKS_OPTIONS,
] = makeConst(user.factionRanks);

/* ***********************************************
 *                   Stats & Skills
 * *********************************************** */

export const [
    USER_PERSONALITY_STATS,
    USER_PERSONALITY_STATS_LABELS,
    USER_PERSONALITY_STATS_OPTIONS,
] = makeConst(user.personalityStats);

export const [
    USER_CYBERWARE_LEVELS,
    USER_CYBERWARE_LEVELS_LABELS,
    USER_CYBERWARE_LEVELS_OPTIONS,
] = makeConst(user.cyberwareLavels); // typo kept, see note below

export const [
    USER_HACKING_SKILLS,
    USER_HACKING_SKILLS_LABELS,
    USER_HACKING_SKILLS_OPTIONS,
] = makeConst(user.hackingSkills);

export const [
    USER_COMBAT_SKILLS,
    USER_COMBAT_SKILLS_LABELS,
    USER_COMBAT_SKILLS_OPTIONS,
] = makeConst(user.combatSkills);

/* ***********************************************
 *                   Background
 * *********************************************** */

export const [
    USER_AFFILIATIONS,
    USER_AFFILIATIONS_LABELS,
    USER_AFFILIATIONS_OPTIONS,
] = makeConst(user.affiliations);

export const [
    USER_PROFESSIONS,
    USER_PROFESSIONS_LABELS,
    USER_PROFESSIONS_OPTIONS,
] = makeConst(user.professions);

export const [
    USER_WEALTH_LEVELS,
    USER_WEALTH_LEVELS_LABELS,
    USER_WEALTH_LEVELS_OPTIONS,
] = makeConst(user.wealth);

/* ***********************************************
 *                   Gigs
 * *********************************************** */

export const [
    GIG_CATEGORIES,
    GIG_CATEGORIES_LABELS,
    GIG_CATEGORIES_OPTIONS,
] = makeConst(user.gigsCategories);

export const [
    GIG_SUBCATEGORIES,
    GIG_SUBCATEGORIES_LABELS,
    GIG_SUBCATEGORIES_OPTIONS,
] = makeConst(user.gigsSubcategories);
