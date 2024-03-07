import * as PROGRAMS from '../Terminal/data/programs';
import * as EXPLOITS from '../Terminal/data/exploits';

export const AVAILABLE_PROGRAMS = [
  EXPLOITS.CYBERCRACKER,
  EXPLOITS.SLEDGEHAMMER,
];

export const SUBNETWORKS = [
  {
    id: 'd6b86027',
    name: 'IronNet',
    firewall: PROGRAMS.ENCRYPT_GUARD,
    system: PROGRAMS.FORCE_FIELD,
    ice: null,
    routing: null,
  },
  {
    id: '2348#053',
    name: 'SecurerRing',
    firewall: PROGRAMS.VIRTUAL_VAULT,
    system: PROGRAMS.EVIL_TWIN,
    ice: null,
    routing: '9SO&w027',
  },
];

export const USERS = [
  {
    id: 'hs79*3kD',
    username: 'John Doe',
    subnetwork: SUBNETWORKS[0].name,
  },
  {
    id: '927593af',
    username: 'Jane Nowacki',
    subnetwork: SUBNETWORKS[1].name,
  },
];
