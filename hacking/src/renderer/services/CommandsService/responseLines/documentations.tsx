import { ConfigService } from '../..';

/*
 * ************************************************************************************************************
 * COMMANDS
 * ************************************************************************************************************
 */
export const NAME: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> NAME`,
  `Full command path: <span class="secondary-color">name [newName]</span>`,
  `Command changes your hacker name (CIC Terminal Name) to a name provided as [newName].`,
  `New name cant have any empty spaces in it so DO NOT use <span class="secondary-color">name my next name</span>, instead use <span class="secondary-color">name my_next_name</span> instead.`,
  '',
  `<span class="example-color">Example: </span><span class="secondary-color">name super_hacker</span>`,
  '<span class="example-color">              ^^^^^^^^^^^^ <--Your new hacker name in this terminal</span>',
  '',
];
export const PROFILE: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> PROFILE`,
  `Full command path: <span class="secondary-color">profile [userId] [recordId]</span>`,
  `Command receives and prints full data about an user (even its private elements).`,
  `By adding userID you can get whole users data (with a lists of criminal, medical or private records, conversations and available bank accounts. If you add, optional recordId after userId you can see details about specific record. You need to be connected to subnetwork in witch user you are trying to get information about is located. Exeption to this is looking at your own profile and your own records, you dont have to be connected to any subnetwork to do that.`,
  'Instead of typing your own userId you can simply type <span class="secondary-color">.</span> (dot).',
  '',
  `<span class="example-color">Example: </span><span class="secondary-color">profile .</span>`,
  '<span class="example-color">                    ^ <--dot as placeholder for your own userId</span>',
  '',
  `<span class="example-color">Example: </span><span class="secondary-color">profile c9617f92-0c9f-48d6-8212-ae032dfbaee7</span>`,
  '<span class="example-color">                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--userId</span>',
  '',
  `<span class="example-color">Example: </span><span class="secondary-color">profile redBot</span>`,
  '<span class="example-color">                    ^^^^^^ <--user handle (username)</span>',
  '',
  `<span class="example-color">Example: </span><span class="secondary-color">profile . ecda32f8-0dc4-47b0-8c01-e89db9e81e84</span>`,
  '<span class="example-color">             dot--> ^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--recordId of one of your own records</span>',
  '',
  `<span class="example-color">Example: </span><span class="secondary-color">profile 7b02dd55-d6ae-4d45-8791-bd91f35baf9b 51dab2a6-c5fb-49d6-8099-9df9ad71be4a</span>`,
  '<span class="example-color">          userId--> ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--recordId of one of profiled user records</span>',
  '',
];
export const CLEAR: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> CLEAR`,
  `Full command path: <span class="secondary-color">clear</span>`,
  `Clears all printed lines in your terminal.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">clear</span>`,
  '',
];
export const LOGOUT: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> LOGOUT`,
  `Full command path: <span class="secondary-color">logout</span>`,
  `Logs you out of this terminal.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">logout</span>`,
  '',
];
export const END: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> END`,
  `Full command path: <span class="secondary-color">end</span>`,
  `Ends your connection to a subnetwork. This command doesnt work while not connected to any subnetwork.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">end</span>`,
  '',
];
export const LIST: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> LIST`,
  `Full command path: <span class="secondary-color">list [subcommand]</span>`,
  `Command lists all available commands or your own all available programs. While listening commands you can see different lists dependeing of if you are connected to a subnetwork or not. When connected to subnetwork some of the commands may by unavaiable to you as the can be encrypted, that commands will be listed in a different, darker color (<span class="disabled-color">like this</span>).`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">list cmd</span>`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">list prog</span>`,
  '',
];
export const SCAN: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> SCAN`,
  `Full command path: <span class="secondary-color">list [subcommand]</span>`,
  `Command scans all networks for public data. As a subcommand you can enter userId, networkId or subnetworkId and get data about, respectively, user, network or subnetwork. You can also provide name and surname as a subcommand to try to find userId assigned to that user, if a user with that name and surname exists.`,
  'Scanning for userId, user data ot network data is simple and always provides all publicly available data. Scanning for subnetwork data may not be able to provide all data, sometimes information about Firewall, Operating system or ICE programs in subnetwork may be unavailable to you, they will be marked as <span class="disabled-color">Unknown</span>. Repeating scanning for a subnetwork will not yield different results, if you wont to get that information you will need to find different hacker and ask him to scan this subnetwork or upgrade your scanner and then try to scan subnetwork again.',
  'When connected to a subnetwork you can use <span class="secondary-color">scan .</span> to get more detailed information about connected subnetwork.',
  'Version of your Scanner program directly affects your possibility to get correct subnetwork data.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">scan john_doe</span>`,
  '<span class="example-color">              ^^^^^^^^ <--handle (username) you wont to scan</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">scan 5ab35395-f015-4af7-b89a-01ff2d2f499e</span>`,
  '<span class="example-color">              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--id of a user, network or subnetwork</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">scan .</span>`,
  '<span class="example-color">              ^ <--dot as a placeholder for a subnetwok you are connected to</span>',
  '',
];
// to install, case-sensetive
export const INSTALL: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> INSTALL`,
  `Full command path: <span class="secondary-color">install [programKey] [options]</span>`,
  'Command installs (or checks if an installation is possible) program to your CIC Terminal. To check type <span class="secondary-color">-check</span> as an option (see example below). Every program key is single use only.',
  'When installing program you will be prompted to enter YES as a confirmation you want to install that program.',
  `As a NetOps you install defensive programs in the same way, but you will be asked to provide a subnetwork's id on witch you wish to install program (you can use <span class="secondary-color">scan</span> command find it.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">install ZXCVB-3SCNR-4458-4POI9</span>`,
  '<span class="example-color">                 ^^^^^^^^^^^^^^^^^^^^^^ <--program key you want to install</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">install ZXCVB-3SCNR-4458-4POI9 -check</span>`,
  '<span class="example-color">  program key--> ^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^ <--option to check</span>',
  '',
];
export const RUN: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> RUN`,
  `Full command path: <span class="secondary-color">run [programName] [subnetworkId]</span>`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Sledgehammer 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
export const COPY_DATA: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> COPY DATA`,
  `Full command path: <span class="secondary-color">copydata [userId] [recordId]</span>`,
  '',
  `<span class="example-color">Example: <span class="secondary-color"><span class="secondary-color">copydata 5ab35395-f015-4af7-b89a-01ff2d2f499e 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">       user ID--> ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
export const DOC: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> DOC`,
  `Full command path: <span class="secondary-color">doc [options]</span> or <span class="secondary-color">help [options]</span>`,
  'Command to check documentation about other things. Try using <span class="secondary-color">doc [command]</span> or <span class="secondary-color">doc [program]</span> whenever you wont to anderstand things beeter, you dont know what to do or you dont know why someting happened.',
  'If you want to gather information try <span class="secondary-color">scan</span> command.',
  'If you want to breach into subnetworks, or you want to decrypt it try <span class="secondary-color">run</span> command.',
  'If you are connected to a subnetwork and want to gathjer information about user in it try <span class="secondary-color">profile</span>.',
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - BREACHERS
 * ************************************************************************************************************
 */
export const SLEDGEHAMMER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Sledgehammer`,
  `Type: <span class="secondary-color">BREACHER</span>`,
  `Breach time: <span class="secondary-color">${
    ConfigService.exploits.SLEDGEHAMMER.timeToRun / 10
  }s</span>`,
  'Program is used to breach firewalls in subnetworks. It is perfect to breach <span class="secondary-color">VirtualVault</span> firewall. It can be used to breach some other firewalls, bot not perfectly.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Sledgehammer 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
export const WORM: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Worm`,
  `Type: <span class="secondary-color">BREACHER</span>`,
  `Breach time: <span class="secondary-color">${
    ConfigService.exploits.WORM.timeToRun / 10
  }s</span>`,
  'Program is used to breach firewalls in subnetworks. It is perfect to breach <span class="secondary-color">EncryptGuard</span> firewall. It can be used to breach some other firewalls, bot not perfectly.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Worm 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
export const TERMITE: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Termite`,
  `Type: <span class="secondary-color">BREACHER</span>`,
  `Breach time: <span class="secondary-color">${
    ConfigService.exploits.TERMITE.timeToRun / 10
  }s</span>`,
  'Program is used to breach firewalls in subnetworks. It is perfect to breach <span class="secondary-color">FirewallX</span> firewall. It can be used to breach some other firewalls, bot not perfectly.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Termite 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - SCANNERS
 * ************************************************************************************************************
 */
export const SCANNER_V1: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner v1.22`,
  `Type: <span class="secondary-color">SCANNER</span>`,
  "Scanner used to gather public information about networks, subnetworks and users. It can also detect subnetwork's firewall, operating system and ices but it is not fully reliable.",
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Sledgehammer 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v1 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v1 john_doe</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^ <--handle (username) you wont to scan</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v1 5ab35395-f015-4af7-b89a-01ff2d2f499e</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--id of a user, network or subnetwork</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v1 .</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^ <--dot as a placeholder for a subnetwok you are connected to</span>',
  '',
];
export const SCANNER_V2: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner v2.03`,
  `Type: <span class="secondary-color">SCANNER</span>`,
  "Scanner used to gather public information about networks, subnetworks and users. It can also detect subnetwork's firewall, operating system and ices but it is not fully reliable.",
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Sledgehammer 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v2 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v2 john_doe</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^ <--handle (username) you wont to scan</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v2 5ab35395-f015-4af7-b89a-01ff2d2f499e</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--id of a user, network or subnetwork</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v2 .</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^ <--dot as a placeholder for a subnetwok you are connected to</span>',
  '',
];
export const SCANNER_V3: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner v3.11`,
  `Type: <span class="secondary-color">SCANNER</span>`,
  "Scanner used to gather public information about networks, subnetworks and users. It can also detect subnetwork's firewall, operating system and ices but it is not fully reliable.",
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Sledgehammer 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v3 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v3 john_doe</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^ <--handle (username) you wont to scan</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v3 5ab35395-f015-4af7-b89a-01ff2d2f499e</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--id of a user, network or subnetwork</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Scanner_v3 .</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^ ^ <--dot as a placeholder for a subnetwok you are connected to</span>',
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - DECRYPTERS
 * ************************************************************************************************************
 */
export const CYBERCRACKER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Cybercracker`,
  `Type: <span class="secondary-color">DECRYPTER</span>`,
  `Decryption time: <span class="secondary-color">${
    ConfigService.exploits.CYBERCRACKER.timeToRun / 100
  }s</span>`,
  `Program is used to decrypt subnetwork's commands encrypted by its operating system. Cybercracker is perfect in great in decrypting <span class="secondary-color">FORCE_FIELD</span> operating system, but it can decrypt others.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Cybercracker 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
export const WIZARDSBOOK: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> WizardsBook`,
  `Type: <span class="secondary-color">DECRYPTER</span>`,
  `Decryption time: <span class="secondary-color">${
    ConfigService.exploits.WIZARDS_BOOK.timeToRun / 100
  }s</span>`,
  `Program is used to decrypt subnetwork's commands encrypted by its operating system. WizardsBook is perfect in great in decrypting <span class="secondary-color">EVIL_TWIN</span> operating system, but it can decrypt others.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">run WizardsBook 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
export const TINWEASEL: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> TinWeasel`,
  `Type: <span class="secondary-color">DECRYPTER</span>`,
  `Decryption time: <span class="secondary-color">${
    ConfigService.exploits.TIN_WEASEL.timeToRun / 100
  }s</span>`,
  `Program is used to decrypt subnetwork's commands encrypted by its operating system. TinWeasel is perfect in great in decrypting <span class="secondary-color">JOAN_OF_ARC</span> operating system, but it can decrypt others.`,
  '',
  `<span class="example-color">Example: <span class="secondary-color">run TinWeasel 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - OTHERS
 * ************************************************************************************************************
 */
export const GIGER_GATE: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> GIGER_GATE`,
  `Type: <span class="secondary-color">OTHER</span>`,
  `This program works mostly automatic (for decrypting anonymus gigs)`,
  '',
];
export const MONITOR: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Monitor`,
  `Type: <span class="secondary-color">OTHER</span>`,
  `Use <span class="accent-color-2">run monitor</span> tu enable seeing ice targeting you during a breach.`,
  '',
];
export const BLUE_MIRROR: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> BlueMirror`,
  `Type: <span class="secondary-color">OTHER</span>`,
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - DISABLERS
 * ************************************************************************************************************
 */
export const REFLECTOR: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Reflector`,
  `Type: <span class="secondary-color">DISABLER</span>`,
  `Disabling time: <span class="secondary-color">${
    ConfigService.exploits.REFLECTOR.timeToRun / 100
  }s</span>`,
  'Program is used to disable dangerous ICE programs in subnetworks. It is block <span class="secondary-color">Ping_v1</span> ICE. You can only run this program when connected to subnetwork.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Reflector</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^</span>',
  '',
];
export const WITCH_DOCTOR: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> WitchDoctor`,
  `Type: <span class="secondary-color">DISABLER</span>`,
  `Disabling time: <span class="secondary-color">${
    ConfigService.exploits.WITCH_DOCTOR.timeToRun / 100
  }s</span>`,
  'Program is used to disable dangerous ICE programs in subnetworks. It is block <span class="secondary-color">Ping</span> ICE up to its version <span class="secondary-color">2.1</span>. You can only run this program when connected to subnetwork.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run WitchDoctor</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^</span>',
  '',
];
export const HOTWIRE: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Hotwire`,
  `Type: <span class="secondary-color">DISABLER</span>`,
  `Disabling time: <span class="secondary-color">${
    ConfigService.exploits.HOTWIRE.timeToRun / 100
  }s</span>`,
  'Program is used to disable dangerous ICE programs in subnetworks. It is block <span class="secondary-color">Blocker</span> and <span class="secondary-color">Locker</span> ICE. You can only run this program when connected to subnetwork.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Hotwire</span>`,
  '<span class="example-color">  program--> ^^^^^^^</span>',
  '',
];
export const REPLICATOR: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Replicator`,
  `Type: <span class="secondary-color">DISABLER</span>`,
  `Disabling time: <span class="secondary-color">${
    ConfigService.exploits.REPLICATOR.timeToRun / 100
  }s</span>`,
  'Program is used to disable dangerous ICE programs in subnetworks. It is block <span class="secondary-color">Cleaner</span> ICE. You can only run this program when connected to subnetwork.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Replicator</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^</span>',
  '',
];
export const INVISIBILITY_SPELL: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> InvisibilitySpell`,
  `Type: <span class="secondary-color">DISABLER</span>`,
  `Disabling time: <span class="secondary-color">${
    ConfigService.exploits.INVISIBILITY_SPELL.timeToRun / 100
  }s</span>`,
  'Program is used to disable dangerous ICE programs in subnetworks. It is block <span class="secondary-color">Boost</span> and <span class="secondary-color">Kicker</span> ICE. You can only run this program when connected to subnetwork.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run InvisibilitySpell</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^^^^^^^</span>',
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - FIREWALLS
 * ************************************************************************************************************
 */
export const ENCRYPT_GUARD: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> EncryptGuard`,
  `Type: <span class="secondary-color">FIREWALL</span>`,
  'Protects subnetwork from breaching.',
  '',
];
export const FIREWALL_X: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> FirewallX`,
  `Type: <span class="secondary-color">FIREWALL</span>`,
  'Protects subnetwork from breaching.',
  '',
];
export const VIRTUAL_VAULT: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> VirtualVault`,
  `Type: <span class="secondary-color">FIREWALL</span>`,
  'Protects subnetwork from breaching.',
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - OPERATING SYSTEMS
 * ************************************************************************************************************
 */
export const FORCE_FIELD: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> ForceField`,
  `Type: <span class="secondary-color">OPERATING SYSTEM</span>`,
  `Time avaiable during breach: <span class="secondary-color">${
    ConfigService.defencePrograms.FORCE_FIELD.timeOnPerfectBreach / 10
  }s</span>`,
  `Base encrypter protecting <span class="secondary-color">${ConfigService.defencePrograms.FORCE_FIELD.encryptedCommands.join(
    '</span>, <span class="secondary-color">',
  )}</span> commands.`,
  '',
];
export const EVIL_TWIN: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> EvilTwin`,
  `Type: <span class="secondary-color">OPERATING SYSTEM</span>`,
  `Time avaiable during breach: <span class="secondary-color">${
    ConfigService.defencePrograms.EVIL_TWIN.timeOnPerfectBreach / 10
  }s</span>`,
  `High security encrypter protecting mainly private data. Commands: <span class="secondary-color">${ConfigService.defencePrograms.EVIL_TWIN.encryptedCommands.join(
    '</span>, <span class="secondary-color">',
  )}</span> are beeing blocked.`,
  '',
];
export const JOAN_OF_ARC: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> JoanOfArc`,
  `Type: <span class="secondary-color">OPERATING SYSTEM</span>`,
  `Time avaiable during breach: <span class="secondary-color">${
    ConfigService.defencePrograms.JOAN_OF_ARC.timeOnPerfectBreach / 10
  }s</span>`,
  `High security encrypter protecting mainly finnancial data. Commands: <span class="secondary-color">${ConfigService.defencePrograms.JOAN_OF_ARC.encryptedCommands.join(
    '</span>, <span class="secondary-color">',
  )}</span> are beeing blocked.`,
  '',
];
/*
 * ************************************************************************************************************
 * Exploits - ICES
 * ************************************************************************************************************
 */
export const CLEANER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Cleaner`,
  `Type: <span class="secondary-color">ICE</span>`,
  'Defensive program, when it targets hacker its counter-hacks his terminal and starts cleaning terminal.',
  '',
];
export const PING1: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Ping_v1`,
  `Type: <span class="secondary-color">ICE</span>`,
  `Defensive program alerts network's NetOps.`,
  '',
];
export const PING2: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Ping_v2`,
  `Type: <span class="secondary-color">ICE</span>`,
  `Defensive program alerts network's NetOps.`,
  '',
];
export const PING3: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Ping_v3`,
  `Type: <span class="secondary-color">ICE</span>`,
  `Defensive program alerts network's NetOps.`,
  '',
];
export const BOOST: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Boost`,
  `Type: <span class="secondary-color">ICE</span>`,
  'Defensive program that speeds up other ICE programs in subnetwork.',
  '',
];
export const KICKER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Kicker`,
  `Type: <span class="secondary-color">ICE</span>`,
  'Defensive program that kicks hacker out of subnetwork.',
  '',
];
export const BLOCKER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Blocker`,
  `Type: <span class="secondary-color">ICE</span>`,
  `Defensive program that kick hacker out of subnetwork and blocks his CIC Terminal for ${ConfigService.defencePrograms.BLOCKER.blockTimeInMin} min.`,
  '',
];
export const LOCKER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Locker`,
  `Type: <span class="secondary-color">ICE</span>`,
  `Defensive program that kick hacker out of subnetwork and blocks his his access through access point he already uses for ${ConfigService.defencePrograms.LOCKER.blockTimeInMin} min.`,
  '',
];
export const KILLER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Killer`,
  `Type: <span class="secondary-color">ICE</span>`,
  'Defensive program, when it targets hacker its counter-hacks his terminal and starts  terminal.',
  '',
];
/*
 * ************************************************************************************************************
 * PROGRAM TYPES
 * ************************************************************************************************************
 */
export const PROGRAM: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner type programs`,
  `They are divided into defensive programs (installed in the subnetworks) and exploits (used by hackers).`,
  `Exploits: <span class="secondary-color">${Object.values(ConfigService.exploits)
    .map((e) => e.name)
    .join('</span>, <span class="secondary-color">')}</span>.`,
  `Defence programs: <span class="secondary-color">${Object.values(ConfigService.defencePrograms)
    .map((e) => e.name)
    .join('</span>, <span class="secondary-color">')}</span>.`,
  ``,
];
export const EXPLOIT: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner type programs`,
  `Programs used by hackers to break subnet security and manipulate its data.`,
  `Exploits: <span class="secondary-color">${Object.values(ConfigService.exploits)
    .map((e) => e.name)
    .join('</span>, <span class="secondary-color">')}</span>.`,
  '',
];
export const DEFENCE_PROGRAM: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner type programs`,
  `Program installed on the subnet that serves to protect against hackers.`,
  `Defence programs: <span class="secondary-color">${Object.values(ConfigService.defencePrograms)
    .map((e) => e.name)
    .join('</span>, <span class="secondary-color">')}</span>.`,
  '',
];
export const SCANNER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner type programs`,
  `Type: <span class="secondary-color">EXPLOIT</span>`,
  '',
];
export const BREACHER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Breacher type programs`,
  `Type: <span class="secondary-color">EXPLOIT</span>`,
  `Exploit for connecting to a subnetwork, breaking the firewall.`,
  '',
];
export const DECRYPTER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Decrypter type programs`,
  `Type: <span class="secondary-color">EXPLOIT</span>`,
  `An exploit for decrypting commands encrypted by OS Encrypter.`,
  '',
];
export const DISABLER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Disabler type programs`,
  `Type: <span class="secondary-color">EXPLOIT</span>`,
  `Exploit for blocking ICE during hacking.`,
  '',
];
export const FIREWALL: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Firewall type programs`,
  `Type: <span class="secondary-color">DEFENCE_PROGRAM</span>`,
  `Defensive program, the first line of subnet defense against intrusions.`,
  '',
];
export const OS_ENCRYPTER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> OS Encrypter type programs`,
  `Type: <span class="secondary-color">DEFENCE_PROGRAM</span>`,
  `Defensive program that protects some commands (such as copying or money transfer).`,
  '',
];
export const ICE: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> ICE type programs`,
  `Type: <span class="secondary-color">DEFENCE_PROGRAM</span>`,
  `Defensive program that targets a hacker while hacking to obtain information about the hacker or to counterattack him.`,
  '',
];
/*
 * ************************************************************************************************************
 * GENERAL
 * ************************************************************************************************************
 */
export const NETWORK: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Network`,
  `A set of subnetworks operated by a single network operator.`,
  '',
];
export const SUBNETWORK: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Subnetwork`,
  `A collection of user data, protected by a firewall and encrypted with OS Encrypter, sometimes secured by ICE.`,
  '',
];
export const NETOPS: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> NetOps`,
  `A person taking care of the network, with slightly greater possibilities of operating within the network.`,
  '',
];

export const AP: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Access points`,
  `In megablock there are two types of Access points: Red and Green, some subnetworks require a connection to specyfic Access Point.`,
  '<span class="secondary-color">Red</span> Access Points: <span class="secondary-color">OMG-AP</span>, <span class="secondary-color">SynthPulse-AP</span>, <span class="secondary-color">L0-Maint-AP</span>',
  '<span class="secondary-color">Green</span>: Access Points: <span class="secondary-color">L3-Maint-AP</span>, <span class="secondary-color">Motel-AP</span>, <span class="secondary-color">DropoffService-AP</span>',
  '',
];
