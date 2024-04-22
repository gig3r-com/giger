module.exports = {
  programs: {
    // Firewalls
    EncryptGuard: {
      name: 'EncryptGuard',
      type: 'firewall',
    },
    FirewallX: {
      name: 'FirewallX',
      type: 'firewall',
    },
    VirtualVault: {
      name: 'VirtualVault',
      type: 'firewall',
    },
    // Encrypter
    ForceField: {
      name: 'ForceField',
      type: 'encrypter',
      timeOnPerfectBreach: 30000,
      timeOnImperfectBreach: 15000,
      encryptedCommands: ['transfer', 'copydata'],
    },
    EvilTwin: {
      name: 'EvilTwin',
      type: 'encrypter',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      encryptedCommands: ['transfer', 'copydata'],
    },
    JoanOfArc: {
      name: 'JoanOfArc',
      type: 'encrypter',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      encryptedCommands: ['transfer', 'copydata'],
    },
    // ICE
    Cleaner: {
      name: 'Cleaner',
      type: 'ice',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      effect:
        'Cleans terminal and every terminal data saved within last 3 hours.',
    },
    Ping: {
      name: 'Ping',
      type: 'ice',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      effect: 'Log hacker id and notify admin.',
    },
    Kicker: {
      name: 'Kicker',
      type: 'ice',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      effect: 'Kicks hacker off the subnetwork.',
    },
    Blocker: {
      name: 'Blocker',
      type: 'ice',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      effect: 'Blocks hacker from using terminal for 1h.',
    },
    Killer: {
      name: 'Killer',
      type: 'ice',
      timeOnPerfectBreach: 20000,
      timeOnImperfectBreach: 10000,
      effect: 'Gives full injuries to hacker.',
    },
  },
  exploits: {
    // Breacher
    Worm: {
      name: 'Worm',
      type: 'breacher',
      effect: {
        EncryptGuard: { isConnected: true, perfect: true },
        FirewallX: { isConnected: true, perfect: false },
        VirtualVault: { isConnected: false, perfect: false },
      },
    },
    Sledgehammer: {
      name: 'Sledgehammer',
      type: 'breacher',
      effect: {
        EncryptGuard: { isConnected: true, perfect: false },
        FirewallX: { isConnected: false, perfect: false },
        VirtualVault: { isConnected: true, perfect: true },
      },
    },
    Termite: {
      name: 'Termite',
      type: 'breacher',
      effect: {
        EncryptGuard: { isConnected: false, perfect: true },
        FirewallX: { isConnected: true, perfect: true },
        VirtualVault: { isConnected: true, perfect: false },
      },
    },
    // Decrypters
    Cybercracker: {
      name: 'Cybercracker',
      type: 'decrypter',
      effect: {
        ForceField: { decryptingTime: 1000, activateICE: false },
        EvilTwin: { decryptingTime: 1000, activateICE: false },
        JoanOfArc: { decryptingTime: 1000, activateICE: false },
      },
    },
    WizardsBook: {
      name: 'WizardsBook',
      type: 'decrypter',
      effect: {
        ForceField: { decryptingTime: 1000, activateICE: false },
        EvilTwin: { decryptingTime: 1000, activateICE: false },
        JoanOfArc: { decryptingTime: 1000, activateICE: false },
      },
    },
    TinWeasel: {
      name: 'TinWeasel',
      type: 'decrypter',
      effect: {
        ForceField: { decryptingTime: 1000, activateICE: false },
        EvilTwin: { decryptingTime: 1000, activateICE: false },
        JoanOfArc: { decryptingTime: 1000, activateICE: false },
      },
    },
    // Disablers
    // Other
    MindFlayer: {
      name: 'MindFlayer',
    },
  },
};
