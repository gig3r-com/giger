import { GigCategoryNames, IGig, GigStatus } from '../models/gig';

export const mockGigs: IGig[] = [
    {
        status: GigStatus.AVAILABLE,
        id: '1',
        title: 'Corporate Data Heist',
        payout: 500,
        description:
            'Retrieve confidential data from a heavily guarded corporate server.',
        messages: [
            {
                id: '1',
                date: new Date('2023-08-11T15:20:32Z'),
                sender: '@SYSTEM',
                text: 'ACCEPTED'
            },
            {
                id: '2',
                date: new Date('2023-08-11T15:23:13Z'),
                sender: '@ripperdoc',
                text: 'Shop is at P3 North, ask for Steven'
            },
            {
                id: '3',
                date: new Date('2023-08-11T15:25:37Z'),
                sender: '@user',
                text: 'Anesthesia is paid extra though'
            }
        ],
        category: GigCategoryNames.HACKING
    },
    {
        status: GigStatus.AVAILABLE,
        id: '2',
        title: 'Undercover Delivery',
        payout: 300,
        description:
            'Deliver a mysterious package to an undisclosed location without asking questions.',
        messages: [
            {
                id: '4',
                date: new Date('2023-08-11T16:05:22Z'),
                sender: '@SYSTEM',
                text: 'ACCEPTED'
            },
            {
                id: '5',
                date: new Date('2023-08-11T16:08:46Z'),
                sender: '@fixer',
                text: 'Package must be delivered by midnight, no exceptions.'
            }
        ],
        category: GigCategoryNames.COURIER
    },
    {
        status: GigStatus.AVAILABLE,
        id: '6',
        title: 'Prototype Extraction',
        payout: 800,
        description:
            'Infiltrate a high-security lab and steal experimental tech prototype.',
        messages: [
            {
                id: '10',
                date: new Date('2023-08-12T09:45:00Z'),
                sender: '@SYSTEM',
                text: 'Gig details encrypted, access key sent.'
            },
            {
                id: '11',
                date: new Date('2023-08-12T10:20:30Z'),
                sender: '@netrunner',
                text: "Lab's security is top-notch, might need some distraction."
            },
            {
                id: '12',
                date: new Date('2023-08-12T11:05:15Z'),
                sender: '@user',
                text: "Any idea what they're paying for this tech?"
            }
        ],
        category: GigCategoryNames.TECH
    },
    {
        status: GigStatus.AVAILABLE,
        id: '7',
        title: 'High-Speed Assassination',
        payout: 150,
        description: 'Extract a target from a high-speed corporate convoy.',
        messages: [
            {
                id: '13',
                date: new Date('2023-08-13T14:30:00Z'),
                sender: '@SYSTEM',
                text: 'Gig posted, details limited.'
            },
            {
                id: '14',
                date: new Date('2023-08-13T15:10:45Z'),
                sender: '@fixer',
                text: 'Convoy route confirmed, moving fast through sector 7.'
            },
            {
                id: '15',
                date: new Date('2023-08-13T15:45:20Z'),
                sender: '@runner',
                text: "I'll need some serious firepower to pull this off."
            }
        ],
        category: GigCategoryNames.COMBAT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '8',
        title: 'Stolen Implant Recovery',
        payout: 400,
        description:
            'Retrieve a stolen cybernetic implant from a black market dealer.',
        messages: [
            {
                id: '16',
                date: new Date('2023-08-14T11:30:00Z'),
                sender: '@SYSTEM',
                text: 'Gig details encrypted, access key sent.'
            },
            {
                id: '17',
                date: new Date('2023-08-14T12:15:20Z'),
                sender: '@fixer',
                text: "Dealer's hideout located in an abandoned factory, be cautious."
            },
            {
                id: '18',
                date: new Date('2023-08-14T12:45:55Z'),
                sender: '@tech',
                text: 'Implant is encrypted, bring decryption tools.'
            }
        ],
        category: GigCategoryNames.RELATION
    },
    {
        status: GigStatus.AVAILABLE,
        id: '9',
        title: 'Corporate Hit',
        payout: 250,
        description:
            'Assassinate a corporate executive during a high-profile event.',
        messages: [
            {
                id: '19',
                date: new Date('2023-08-15T18:00:00Z'),
                sender: '@SYSTEM',
                text: 'Contract details sent, handle with discretion.'
            },
            {
                id: '20',
                date: new Date('2023-08-15T18:30:25Z'),
                sender: '@fixer',
                text: 'Event location: NeoLux Tower, tight security expected.'
            },
            {
                id: '21',
                date: new Date('2023-08-15T19:15:10Z'),
                sender: '@assassin',
                text: 'Providing poison-tipped blade for a clean kill.'
            }
        ],
        category: GigCategoryNames.COMBAT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '10',
        title: 'Cybernetics Sabotage',
        payout: 600,
        description: "Sabotage a rival gang's illegal cybernetics operation.",
        messages: [
            {
                id: '22',
                date: new Date('2023-08-16T14:00:00Z'),
                sender: '@SYSTEM',
                text: 'Gig details sent, ensure their operation is crippled.'
            },
            {
                id: '23',
                date: new Date('2023-08-16T14:30:40Z'),
                sender: '@netrunner',
                text: 'Operation center is heavily guarded, hack into their systems to disable defenses.'
            },
            {
                id: '24',
                date: new Date('2023-08-16T15:10:15Z'),
                sender: '@merc',
                text: "I'll handle the muscle, expect a loud entrance."
            }
        ],
        category: GigCategoryNames.TECH
    },
    {
        status: GigStatus.AVAILABLE,
        id: '11',
        title: 'Prototype AI Smuggling',
        payout: 350,
        description:
            'Smuggle a prototype AI out of a restricted research facility.',
        messages: [
            {
                id: '25',
                date: new Date('2023-08-17T09:30:00Z'),
                sender: '@SYSTEM',
                text: 'Gig posted, prototype AI code-name: Mercury.'
            },
            {
                id: '26',
                date: new Date('2023-08-17T10:15:20Z'),
                sender: '@fixer',
                text: 'Facility layout received, AI stored in Lab D5.'
            },
            {
                id: '27',
                date: new Date('2023-08-17T11:00:45Z'),
                sender: '@hacker',
                text: "Expect heavy digital defenses, I'll work on a backdoor."
            }
        ],
        category: GigCategoryNames.HACKING
    },
    {
        status: GigStatus.AVAILABLE,
        id: '12',
        title: 'High-Profile Rescue',
        payout: 700,
        description:
            'Rescue a high-profile target from a corrupt law enforcement raid.',
        messages: [
            {
                id: '28',
                date: new Date('2023-08-18T15:00:00Z'),
                sender: '@SYSTEM',
                text: 'Gig details encrypted, access key sent.'
            },
            {
                id: '29',
                date: new Date('2023-08-18T15:30:40Z'),
                sender: '@fixer',
                text: "Target's last known location: Blackhaven Hotel, room 407."
            },
            {
                id: '30',
                date: new Date('2023-08-18T16:15:15Z'),
                sender: '@merc',
                text: "Expect opposition, I'll provide cover for the escape."
            }
        ],
        category: GigCategoryNames.COMBAT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '13',
        title: 'Corporate Data Theft',
        payout: 250,
        description:
            'Steal sensitive corporate financial data from a heavily fortified server.',
        messages: [
            {
                id: '31',
                date: new Date('2023-08-19T12:30:00Z'),
                sender: '@SYSTEM',
                text: 'Gig posted, details limited for security.'
            },
            {
                id: '32',
                date: new Date('2023-08-19T13:00:20Z'),
                sender: '@netrunner',
                text: 'Server located in a secret facility beneath Eden Tower.'
            },
            {
                id: '33',
                date: new Date('2023-08-19T13:45:45Z'),
                sender: '@hacker',
                text: "Firewalls are cutting-edge, I'm working on a breach plan."
            }
        ],
        category: GigCategoryNames.HACKING
    }
];
