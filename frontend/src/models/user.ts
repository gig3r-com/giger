import { IObscurableInfo } from './events';

export interface IUserBase {
    id: string;
    name: string;
    handle: string;
    roles?: UserRoles[];
    aliasMap: IAliasMap;
}

/**
 * A map of convo or gig ids to displayed names.
 * Used to anonymize users in conversations and gigs.
 */
export interface IAliasMap {
    [key: string]: string; // key: convo or gig id, value: displayedName
}

export interface IUser extends IUserBase {
    id: string;
    name: string;
    surname: string;
    age: number;
    cyberwareLevel: CyberwareLevel;
    professionPublic: string;
    professionActual: string;
    typePublic: UserTypes;
    typeActual: UserTypes;
    assets: string[];
    hackingSkill: SkillStat;
    confrontationVsNegotiation: CharStat;
    cowardVsFighter: CharStat;
    talkativeVsSilent: CharStat;
    thinkerVsDoer: CharStat;
    combatSkill: SkillStat;
    vibe: Vibe;
    vibeFunction: string;
    vibeEngagement: VibeEngagement;
    wealthLevel: WealthLevels;
    relations: IRelation[];
    goals: IGoal[];
    meta: IMeta[];
}

export interface IAnonymizedUser {
    userId: string;
    displayedAs: string;
}

export enum UserTypes {
    HUMAN = 'human',
    AI = 'ai',
    ANDROID = 'android'
}

export enum UserRoles {
    ADMIN = 'admin'
}

export interface ICharStats {
    hackingSkill: SkillStat;
    confrontationVsNegotiation: CharStat;
    cowardVsFighter: CharStat;
    talkativeVsSilent: CharStat;
    thinkerVsDoer: CharStat;
    combatSkill: SkillStat;
}

export type SkillStat = 0 | 1 | 2 | 3;
export type CharStat = 0 | 1 | 2 | 3 | 4;
export type CyberwareLevel =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15;

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

export interface IRelation extends IObscurableInfo {
    id: string;
    userId: string;
    relationTo: string; // userId
    description: string;
}

export interface IGoal extends IObscurableInfo {
    id: string;
    userId: string;
    title: string;
    description: string;
}

export interface IMeta {
    id: string;
    type: MetaTypes;
    description: string;
    isLink?: boolean;
}

export enum MetaTypes {
    ARCHETYPE = 'archetype',
    MUSIC = 'music',
    INSPIRATIONS = 'inspirations',
    AESTHETICS = 'aesthetics',
    PROCEDURE = 'procedure'
}
