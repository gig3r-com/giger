import * as ENUM from '@/modules/users/types/enums';

export interface User {
  id: string;

  // Profile - Main
  handle: string;
  name: string;
  surname: string;
  typeActual: ENUM.UserType;
  typePublic: ENUM.UserType;
  combatSkill: ENUM.UserCombatSkill;
  cyberwareLevel: ENUM.UserCyberwareLvl;
}