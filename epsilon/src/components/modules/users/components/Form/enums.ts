export type UserType = 'HUMAN' | 'AI' | 'ANDROID';
export const USER_TYPE_OPTIONS = ['HUMAN', 'AI', 'ANDROID'] as const;

export type UserVibe = 'DIZORDERS' | 'OVERSEERS' | 'DIGIEVO' | 'NO_VIBE';
export const USER_VIBE_OPTIONS = [ 'DIZORDERS', 'OVERSEERS', 'DIGIEVO', 'NO_VIBE' ] as const;

export type UserVibeEngagement = 'HYPED' | 'DISINTERESTED' | 'DOUBTING' | 'INTERESTED' | 'FANATIC' | 'NO_VIBE';
export const USER_VIBE_ENGAGEMENT_OPTIONS = [ 'HYPED', 'DISINTERESTED', 'DOUBTING', 'INTERESTED', 'FANATIC', 'NO_VIBE' ] as const;

export type UserSkill = '0' | '1' | '2' | '3' | '4' | '5';
export const USER_SKILL_OPTIONS = [ '0', '1', '2', '3', '4', '5' ] as const;

export type UserChar = '0' | '1' | '2' | '3' | '4';
export const USER_CHAR_OPTIONS = [ '0', '1', '2', '3', '4' ] as const;

export type UserCyberware = '0' | '1' | '2' | '3';

export const USER_GIG_REP_OPTIONS = [ '0', '1', '2', '3', '4', '5' ] as const;

export type UserGigRep = '0' | '1' | '2' | '3' | '4';

export const USER_BOOL_OPTIONS = [ 'Yes', 'No' ] as const;

export type UserBool = 'Yes' | 'No';
export const USER_CYBERWARE_OPTIONS = [ '0', '1', '2', '3' ] as const;

export type UserWealth = 'BROKE' | 'IMPOVERISHED' | 'STRUGGLING' | 'MODEST' | 'STABLE' | 'COMFORTABLE' | 'AFFLUENT' | 'ELITE';
export const USER_WEALTH_OPTIONS = [ 'BROKE', 'IMPOVERISHED', 'STRUGGLING', 'MODEST', 'STABLE', 'COMFORTABLE', 'AFFLUENT', 'ELITE' ] as const;

export type UserFaction =
  | 'no_faction'
  | 'gunners'
  | 'spanks_and_cuddles'
  | 'rabbids'
  | 'pawnshop_24_7'
  | 'o_m_g'
  | 'humanists'
  | 'metamorphosis'
  | 't_f_a'
  | 'double_d'
  | 'esthetics'
  | 'q_e_t_s'
  | 'synth_pulse'
  | 'nu_yu'
  | 'transhuman'
  | 'hi_tech'
  | 'a_spot'
  | 'beholder'
  | 'anarchy'
  | 'nomads'
  | 'foundation'
  | 'shaman'
  | 'head_hunters'
  | 'reapers'
  | 'loaded_chamber'
  | 'byte_bar'
  | 'takayama_official'
  | 'social_net'
  | 'contech_regional';

export const USER_FACTION_OPTIONS = [
  'no_faction',
  'gunners',
  'spanks_and_cuddles',
  'rabbids',
  'pawnshop_24_7',
  'o_m_g',
  'humanists',
  'metamorphosis',
  't_f_a',
  'double_d',
  'esthetics',
  'q_e_t_s',
  'synth_pulse',
  'nu_yu',
  'transhuman',
  'hi_tech',
  'a_spot',
  'beholder',
  'anarchy',
  'nomads',
  'foundation',
  'shaman',
  'head_hunters',
  'reapers',
  'loaded_chamber',
  'byte_bar',
  'takayama_official',
  'social_net',
  'contech_regional',
] as const;
