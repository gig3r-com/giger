module.exports = {
  /*
   *********************************************************************************************************************
   * PROGRAMS **********************************************************************************************************
   *********************************************************************************************************************
   */
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
      timeOnPerfectBreach: 3000,
      timeOnImperfectBreach: 1500,
      encryptedCommands: ['transfer', 'copydata'],
    },
    EvilTwin: {
      name: 'EvilTwin',
      type: 'encrypter',
      timeOnPerfectBreach: 2000,
      timeOnImperfectBreach: 1000,
      encryptedCommands: ['transfer', 'copydata'],
    },
    JoanOfArc: {
      name: 'JoanOfArc',
      type: 'encrypter',
      timeOnPerfectBreach: 2000,
      timeOnImperfectBreach: 1000,
      encryptedCommands: ['transfer', 'copydata'],
    },
    // ICE
    Cleaner: {
      name: 'Cleaner',
      type: 'ice',
      timeOnPerfectBreach: 2000,
      timeOnImperfectBreach: 1000,
      effect:
        'Cleans terminal and every terminal data saved within last 3 hours.',
      targetModel: 'active',
      stage1SuccessRate: 0, // > 5%
      stage2SuccessRate: 0, // > 25%
      stage3SuccessRate: 0, // > 50%
      stage4SuccessRate: 0, // > 75%
      stage5SuccessRate: 0, // > 90%
      finalStageSuccessRate: 100, // = 100%
    },
    Ping: {
      name: 'Ping',
      type: 'ice',
      effect: 'Log hacker id and notify admin.',
      targetModel: 'active',
      stage1SuccessRate: 0, // > 5%
      stage2SuccessRate: 25, // > 25%
      stage3SuccessRate: 25, // > 50%
      stage4SuccessRate: 50, // > 75%
      stage5SuccessRate: 50, // > 90%
      finalStageSuccessRate: 100, // = 100%
    },
    Boost: {
      name: 'Boost',
      type: 'ice',
      effect: '',
      targetModel: 'active',
      stage1SuccessRate: 5, // > 5%
      stage2SuccessRate: 25, // > 25%
      stage3SuccessRate: 50, // > 50%
      stage4SuccessRate: 75, // > 75%
      stage5SuccessRate: 90, // > 90%
      finalStageSuccessRate: 100, // = 100%
      boostValue: 500,
    },
    Kicker: {
      name: 'Kicker',
      type: 'ice',
      timeOnPerfectBreach: 2000,
      timeOnImperfectBreach: 1000,
      effect: 'Kicks hacker off the subnetwork.',
    },
    Blocker: {
      name: 'Blocker',
      type: 'ice',
      timeOnPerfectBreach: 2000,
      timeOnImperfectBreach: 1000,
      effect: 'Blocks hacker from using terminal for 1h.',
    },
    Killer: {
      name: 'Killer',
      type: 'ice',
      timeOnPerfectBreach: 2000,
      timeOnImperfectBreach: 1000,
      effect: 'Gives full injuries to hacker.',
    },
  },
  /*
   *********************************************************************************************************************
   * EXPLOITS **********************************************************************************************************
   *********************************************************************************************************************
   */
  exploits: {
    // Breacher
    Worm: {
      name: 'Worm',
      type: 'breacher',
      effect: {
        EncryptGuard: { isConnected: true, perfect: true, breachTime: 100 },
        FirewallX: { isConnected: true, perfect: false, breachTime: 100 },
        VirtualVault: { isConnected: false, perfect: false, breachTime: 100 },
      },
    },
    Sledgehammer: {
      name: 'Sledgehammer',
      type: 'breacher',
      effect: {
        EncryptGuard: { isConnected: true, perfect: false, breachTime: 100 },
        FirewallX: { isConnected: false, perfect: false, breachTime: 100 },
        VirtualVault: { isConnected: true, perfect: true, breachTime: 100 },
      },
    },
    Termite: {
      name: 'Termite',
      type: 'breacher',
      effect: {
        EncryptGuard: { isConnected: false, perfect: true, breachTime: 100 },
        FirewallX: { isConnected: true, perfect: true, breachTime: 100 },
        VirtualVault: { isConnected: true, perfect: false, breachTime: 100 },
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
