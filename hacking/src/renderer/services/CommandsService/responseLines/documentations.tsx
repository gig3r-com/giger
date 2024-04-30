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
  `<span class="example-color">Example #1: </span><span class="secondary-color">profile .</span>`,
  '<span class="example-color">                    ^ <--dot as placeholder for your own userId</span>',
  '',
  `<span class="example-color">Example #2: </span><span class="secondary-color">profile c9617f92-0c9f-48d6-8212-ae032dfbaee7</span>`,
  '<span class="example-color">                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--userId</span>',
  '',
  `<span class="example-color">Example #3: </span><span class="secondary-color">profile . ecda32f8-0dc4-47b0-8c01-e89db9e81e84</span>`,
  '<span class="example-color">             dot--> ^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--recordId of one of your own records</span>',
  '',
  `<span class="example-color">Example #4: </span><span class="secondary-color">profile 7b02dd55-d6ae-4d45-8791-bd91f35baf9b 51dab2a6-c5fb-49d6-8099-9df9ad71be4a</span>`,
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
  'Version of your Scanner program directly affects your possibility to get correct subnetwork data.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">scan john doe</span>`,
  '<span class="example-color">              ^^^^ ^^^ <--name and surname of a user you wont to scan</span>',
  '',
  `<span class="example-color">Example: <span class="secondary-color">scan 5ab35395-f015-4af7-b89a-01ff2d2f499e</span>`,
  '<span class="example-color">              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--id of a user, network or subnetwork</span>',
  '',
];

export const INSTALL: string[] = [
  '',
  `<span class="secondary-color">Documentation</span> INSTALL`,
  `Full command path: <span class="secondary-color">install [programKey] [options]</span>`,
  'Command installs (or checks if an installation is possible) program to your CIC Terminal. To check type <span class="secondary-color">-check</span> as an option (see example below). Every program key is single use only.',
  'When installing program you will be prompted to enter YES as a confirmation you want to install that program.',
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
  `<span class="example-color">Example: <span class="secondary-color">copydata 5ab35395-f015-4af7-b89a-01ff2d2f499e 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">       user ID--> ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];

export const SLEDGEHAMMER: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Sledgehammer`,
  `Type: <span class="secondary-color">BREACHER</span>`,
  `Breach time: <span class="secondary-color">10s</span>`,
  'Program is used to breach firewalls in subnetworks. It is perfect to breach <span class="secondary-color">VirtualVault</span> firewall. It can be used to breach some other firewalls, bot not perfectly.',
  '',
  `<span class="example-color">Example: <span class="secondary-color">run Sledgehammer 88a8ed46-7a4d-4395-8340-d028bd123773</span>`,
  '<span class="example-color">  program--> ^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ <--subnetwork ID</span>',
  '',
];

export const SCANNER_V1: () => string[] = () => [
  '',
  `<span class="secondary-color">Documentation</span> Scanner v1.22`,
  `Type: <span class="secondary-color">SCANNER</span>`,
  'Scanner used to gather public information about networks, subnetworks and users. It can also detect subnetwork\'s firewall, operating system and ices but it is not fully reliable.',
  '',
];
