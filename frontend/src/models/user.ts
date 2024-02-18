import { ICriminalEvent, IMedEvent, IObscurableInfo } from './events';

export interface IUserBase {
    id: string;
    name: string;
    handle: string;
    roles?: UserRoles[];
    aliasMap: IAliasMap;
    active: boolean;
}

export interface IUserPublic extends IUserBase {
    professionPublic: string;
    typePublic: UserTypes;
    surname: string;
    age: number;
    vibe: Vibe;
    wealthLevel: WealthLevels;
}

export interface IUserPrivate extends IUserPublic {
    cyberwareLevel: CyberwareLevel;
    professionActual: string;
    typeActual: UserTypes;
    assets: string[];
    hackingSkill: SkillStat;
    confrontationVsNegotiation: CharStat;
    cowardVsFighter: CharStat;
    talkativeVsSilent: CharStat;
    thinkerVsDoer: CharStat;
    combatSkill: SkillStat;
    vibeFunction: string;
    vibeEngagement: VibeEngagement;
    favoriteUserIds: string[];
    relations: IRelation[];
    goals: IGoal[];
    meta: IMeta[];
    privateRecords: IPrivateRecord[];
    criminalRecord: ICriminalEvent[];
    medHistory: IMedEvent[];
}

/**
 * A map of convo or gig ids to displayed names.
 * Used to anonymize users in conversations and gigs.
 */
export interface IAliasMap {
    [key: string]: string; // key: convo or gig id, value: displayedName
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
    ADMIN = 'admin',
    INFLUENCER = 'influencer',
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

export interface IUserRecord extends IObscurableInfo {
    id: string;
    userId: string;
    description: string;
    recordType: UserRecordTypes;
}

export interface IRelation extends IUserRecord {
    relationTo: string; // userId
    recordType: UserRecordTypes.RELATION;
}

export interface IGoal extends IUserRecord {
    title: string;
    recordType: UserRecordTypes.GOAL;
}

export interface IMeta extends IUserRecord {
    type: MetaTypes;
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

export interface IPrivateRecord extends IUserRecord {
    title: string;
}

export enum UserRecordTypes {
    RELATION = 'RELATION',
    GOAL = 'GOAL',
    META = 'META',
    PRIVATE_RECORD = 'PRIVATE_RECORD'
}
