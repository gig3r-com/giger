export type ExploitType = {
  name: string;
  type: 'breacher' | 'decrypter' | 'monitor' | 'scanner';
  effect: {};
};

export type ProgramType = {
  name: string;
  type: 'encrypter' | 'firewall';
  timeOnPerfectBreach?: number;
  timeOnImperfectBreach?: number;
  encryptedCommands?: string[];
};

export type BreachEffect = {
  isConnected: boolean;
  perfect: boolean;
};

export type SubnetworkType = {
  name: string;
};
