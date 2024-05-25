import { Factions } from './companies';
import { IObscurableInfo } from './general';
import { GigCategoryNames } from './gig';

export interface IUserBase {
    id: string;
    name: string;
    surname: string;
    handle: string;
    roles: UserRoles[];
    aliasMap: IAliasMap;
    active: boolean;
}

export interface IUserPublic extends IUserBase {
    professionPublic: string;
    typePublic: UserTypes;
    vibe: Vibe;
    wealthLevel: WealthLevels;
    hasPlatinumPass: boolean;
    factionRankPublic: Factions;
    highSecurity: boolean;
    gigReputation: IReputationLevels;
}

export interface IUserPrivate extends IUserPublic {
    cyberwareLevel: CyberwareLevel;
    professionActual: string;
    typeActual: UserTypes;
    assets: string[];
    hackingSkills: SkillStat;
    confrontationistVsAgreeable: CharStat;
    cowardVsBrave: CharStat;
    talkativeVsSilent: CharStat;
    thinkerVsDoer: CharStat;
    combatSkill: SkillStat;
    vibeFunction: string;
    vibeEngagement: VibeEngagement;
    vibeOpinions: string;
    favoriteUserIds: string[];
    faction: Factions;
    revealCodes: string[];
    networkName: string;
    subnetworkId: string;
    subnetworkName: string;
    insuredAmount: number;
    factionRankActual: string;
    networkAdminName: string;
    /**
     * to be removed.
     */
    reputationDescription: string;
}

/**
 * A map of convo or gig ids to displayed names.
 * Used to anonymize users in conversations and gigs.
 */
export interface IAliasMap {
    [key: string]: string; // key: convo or gig id, value: displayedName
}

export interface IReputationLevels {
    [GigCategoryNames.FIXER]: number;
    [GigCategoryNames.KILLER]: number;
    [GigCategoryNames.HACKING]: number;
    [GigCategoryNames.WELLBEING]: number;
}

export interface IAnonymizedUser {
    userId: string;
    displayedAs: string;
}

export enum UserTypes {
    HUMAN = 'HUMAN',
    AI = 'AI',
    ANDROID = 'ANDROID'
}

export enum UserRoles {
    ADMIN = 'ADMIN',
    INFLUENCER = 'INFLUENCER',
    GOD = 'GOD',
    BOSS = 'BOSS',
    NPC = 'NPC',
    MODERATOR = 'MODERATOR'
}

export interface ICharStats {
    hackingSkills: SkillStat;
    confrontationistVsAgreeable: CharStat;
    cowardVsBrave: CharStat;
    talkativeVsSilent: CharStat;
    thinkerVsDoer: CharStat;
    combatSkill: SkillStat;
}

export type SkillStat = { stat: 0 | 1 | 2 | 3 };
export type CharStat = { stat: 0 | 1 | 2 | 3 | 4 };
export type CyberwareLevel = {
    stat: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
};

export enum Vibe {
    DIZORDERS = 'DIZORDERS',
    OVERSEERS = 'OVERSEERS',
    HEDONIZERS = 'HEDONIZERS',
    DIGIEVO = 'DIGIEVO',
    SW4RM = 'SW4RM',
    NO_VIBE = 'NO_VIBE'
}
export enum VibeEngagement {
    HYPED = 'HYPED',
    DISINTERESTED = 'DISINTERESTED',
    DOUBTING = 'DOUBTING',
    INTERESTED = 'INTERESTED',
    FANATIC = 'FANATIC'
}

export enum WealthLevels {
    BROKE = 'BROKE',
    IMPOVERISHED = 'IMPOVERISHED',
    STRUGGLING = 'STRUGGLING',
    MODEST = 'MODEST',
    STABLE = 'STABLE',
    COMFORTABLE = 'COMFORTABLE',
    AFFLUENT = 'AFFLUENT',
    ELITE = 'ELITE'
}

export interface IUserRecord {
    id: string;
    userId?: string;
    description: string;
    recordType: UserRecordTypes;
}

export interface IRelation extends IUserRecord, IObscurableInfo {
    userName: string; // userId
    recordType: UserRecordTypes.RELATION;
}

export interface IGoal extends IUserRecord, IObscurableInfo {
    title: string;
    recordType: UserRecordTypes.GOAL;
}

export interface IMeta extends IUserRecord {
    title: string;
    description: string;
    isLink?: boolean;
    recordType: UserRecordTypes.META;
}

export enum MetaTypes {
    ARCHETYPE = 'ARCHETYPE',
    MUSIC = 'MUSIC',
    INSPIRATIONS = 'INSPIRATIONS',
    AESTHETICS = 'AESTHETICS',
    PROCEDURE = 'PROCEDURE'
}

export interface IPrivateRecord extends IUserRecord, IObscurableInfo {
    title: string;
}

export enum UserRecordTypes {
    RELATION = 'RELATION',
    GOAL = 'GOAL',
    META = 'META',
    PRIVATE_RECORD = 'PRIVATE_RECORD'
}
