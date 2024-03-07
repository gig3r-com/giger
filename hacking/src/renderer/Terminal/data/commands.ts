export const MAIN_COMMANDS = {
  CLEAR: 'clear',
  END: 'end',
  LIST: 'list',
  SCAN: 'scan',
  RUN: 'run',
  CONNECT: 'connect',
  PROFILE: 'profile',
  BALANCE: 'balance',
  TRANSFER: 'transfer',
  READDATA: 'readdata',
  COPYDATA: 'copydata',
  READMSG: 'readmsg',
  SENDMSG: 'sendmsg',
  LOG: 'log',
};

export const LIST_COMMANDS = {
  CMD: 'cmd',
  PROG: 'prog',
};
const LIST_CMD = `${[MAIN_COMMANDS.LIST]} ${LIST_COMMANDS.CMD}`;
const LIST_PROG = `${[MAIN_COMMANDS.LIST]} ${LIST_COMMANDS.PROG}`;

export const SCAN_COMMANDS = {
  USERNAME: '[username]',
  USER_ID: '[userId]',
  SUBNETWORK_ID: '[subnetworkId]',
};
const SCAN_USERNAME = `${[MAIN_COMMANDS.SCAN]} ${SCAN_COMMANDS.USERNAME}`;
const SCAN_USER_ID = `${[MAIN_COMMANDS.SCAN]} ${SCAN_COMMANDS.USER_ID}`;
const SCAN_SUBNETWORK_ID = `${[MAIN_COMMANDS.SCAN]} ${SCAN_COMMANDS.SUBNETWORK_ID}`;

export const COMMANDS_DESCRIPTIONS = {
  [MAIN_COMMANDS.CLEAR]: 'Clears console',

  [LIST_CMD]: 'Lists all available commands',
  [LIST_PROG]: 'Lists all available exploits',

  [SCAN_USERNAME]: 'Retrieve UserId',
  [SCAN_USER_ID]: 'Retrieve user data',
  [SCAN_SUBNETWORK_ID]: 'Retrieve subnetwork data',
};

export const CONNECTED_COMMANDS_DESCRIPTIONS = {
  [MAIN_COMMANDS.CLEAR]: 'Clears console',
  [MAIN_COMMANDS.END]: 'Ends connection to a subnetwork',

  [LIST_CMD]: 'Lists all available commands',
  [LIST_PROG]: 'Lists all available exploits',

  [SCAN_USERNAME]: 'Retrieve UserId',
  [SCAN_USER_ID]: 'Retrieve user data',
  [SCAN_SUBNETWORK_ID]: 'Retrieve subnetwork data',

  [MAIN_COMMANDS.PROFILE]: 'Retrive data about user in a subnetwork',
  [MAIN_COMMANDS.BALANCE]: 'Receive accounts balances that this user has access to',
  [MAIN_COMMANDS.TRANSFER]: 'Transfer funds',
  [MAIN_COMMANDS.READDATA]: 'Reads data from users profile',
  [MAIN_COMMANDS.COPYDATA]: 'Copy data from users profile to yours',
  [MAIN_COMMANDS.READMSG]: 'Receive list of users hacked user was talking to',
  [MAIN_COMMANDS.SENDMSG]: 'Send messages as hacked user',
  [MAIN_COMMANDS.LOG]: 'Get all logs from subnetwork',
};
