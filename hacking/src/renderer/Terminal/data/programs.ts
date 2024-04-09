import * as COMMANDS from './commands';
import { ProgramType } from './types';

export const VirtualVault: ProgramType = {
  name: 'VirtualVault',
  type: 'firewall',
};

export const EncryptGuard: ProgramType = {
  name: 'EncryptGuard',
  type: 'firewall',
};

export const FirewallX: ProgramType = {
  name: 'FirewallX',
  type: 'firewall',
};

export const ForceField: ProgramType = {
  name: 'ForceField',
  type: 'encrypter',
  timeOnPerfectBreach: 30000, // seconds
  timeOnImperfectBreach: 15000, // seconds
  encryptedCommands: [
    COMMANDS.MAIN_COMMANDS.TRANSFER,
    COMMANDS.MAIN_COMMANDS.COPYDATA,
  ],
};

export const EvilTwin: ProgramType = {
  name: 'EvilTwin',
  type: 'encrypter',
  timeOnPerfectBreach: 20000, // seconds
  timeOnImperfectBreach: 10000, // seconds
  encryptedCommands: [
    COMMANDS.MAIN_COMMANDS.TRANSFER,
    COMMANDS.MAIN_COMMANDS.COPYDATA,
  ],
};

export const JoanOfArc: ProgramType = {
  name: 'JoanOfArc',
  type: 'encrypter',
  timeOnPerfectBreach: 20000, // seconds
  timeOnImperfectBreach: 10000, // seconds
  encryptedCommands: [
    COMMANDS.MAIN_COMMANDS.TRANSFER,
    COMMANDS.MAIN_COMMANDS.COPYDATA,
  ],
};
