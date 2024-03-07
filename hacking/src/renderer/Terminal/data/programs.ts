import * as COMMANDS from './commands';
import { ProgramType, } from './types';

export const VIRTUAL_VAULT: ProgramType = {
  name: 'VirtualVault',
  type: 'firewall',
};

export const ENCRYPT_GUARD: ProgramType = {
  name: 'EncryptGuard',
  type: 'firewall',
};

export const FIREWALL_X: ProgramType = {
  name: 'FirewallX',
  type: 'firewall',
};

export const FORCE_FIELD: ProgramType = {
  name: 'ForceField',
  type: 'encrypter',
  timeOnPerfectBreach: 30000, // seconds
  timeOnImperfectBreach: 15000, // seconds
  encryptedCommands: [
    COMMANDS.MAIN_COMMANDS.TRANSFER,
    COMMANDS.MAIN_COMMANDS.COPYDATA,
  ],
};

export const EVIL_TWIN: ProgramType = {
  name: 'EvilTwin',
  type: 'encrypter',
  timeOnPerfectBreach: 20000, // seconds
  timeOnImperfectBreach: 10000, // seconds
  encryptedCommands: [
    COMMANDS.MAIN_COMMANDS.TRANSFER,
    COMMANDS.MAIN_COMMANDS.COPYDATA,
  ],
};

export const JOAN_OF_ARC: ProgramType = {
  name: 'JoanOfArc',
  type: 'encrypter',
  timeOnPerfectBreach: 20000, // seconds
  timeOnImperfectBreach: 10000, // seconds
  encryptedCommands: [
    COMMANDS.MAIN_COMMANDS.TRANSFER,
    COMMANDS.MAIN_COMMANDS.COPYDATA,
  ],
};
