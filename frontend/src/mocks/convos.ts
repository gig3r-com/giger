import { IConversation } from '../models/message';
import {
    systemUser,
    ripperdoc,
    hiredGun,
    assassin,
    fixer,
    hacker,
    merc,
    netrunner,
    runner,
    tech
} from './users';

export const gig1Convo: IConversation = {
    id: '1',
    participants: [systemUser.id, ripperdoc.id, hiredGun.id],
    gigConversation: true,
    messages: [
        {
            id: '1',
            date: '2023-08-11T15:20:32',
            sender: systemUser.id,
            text: 'ACCEPTED'
        },
        {
            id: '2',
            date: '2023-08-11T15:23:13',
            sender: ripperdoc.id,
            text: 'Shop is at P3 North, ask for Steven'
        },
        {
            id: '3',
            date: '2023-08-11T15:25:37',
            sender: hiredGun.id,
            text: 'Anesthesia is paid extra though'
        }
    ]
};
export const gig2Convo: IConversation = {
    id: '2',
    participants: [systemUser.id, fixer.id],
    gigConversation: true,
    messages: [
        {
            id: '4',
            date: '2023-08-11T16:05:22',
            sender: systemUser.id,
            text: 'ACCEPTED'
        },
        {
            id: '5',
            date: '2023-08-11T16:08:46',
            sender: fixer.id,
            text: 'Package must be delivered by midnight, no exceptions.'
        }
    ]
};
export const gig3Convo: IConversation = {
    id: '6',
    participants: [systemUser.id, netrunner.id, hiredGun.id],
    gigConversation: true,
    messages: [
        {
            id: '10',
            date: '2023-08-12T09:45:00',
            sender: systemUser.id,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '11',
            date: '2023-08-12T10:20:30',
            sender: netrunner.id,
            text: "Lab's security is top-notch, might need some distraction."
        },
        {
            id: '12',
            date: '2023-08-12T11:05:15',
            sender: hiredGun.id,
            text: "Any idea what they're paying for this tech.id?"
        }
    ]
};
export const gig4Convo: IConversation = {
    id: '7',
    participants: [systemUser.id, fixer.id, runner.id],
    gigConversation: true,
    messages: [
        {
            id: '13',
            date: '2023-08-13T14:30:00',
            sender: systemUser.id,
            text: 'Gig posted, details limited.'
        },
        {
            id: '14',
            date: '2023-08-13T15:10:45',
            sender: fixer.id,
            text: 'Convo: IConversationy route confirmed, moving fast through sector 7.'
        },
        {
            id: '15',
            date: '2023-08-13T15:45:20',
            sender: runner.id,
            text: "I'll need some serious firepower to pull this off."
        }
    ]
};
export const gig5Convo: IConversation = {
    id: '8',
    participants: [systemUser.id, fixer.id, tech.id],
    gigConversation: true,
    messages: [
        {
            id: '16',
            date: '2023-08-14T11:30:00',
            sender: systemUser.id,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '17',
            date: '2023-08-14T12:15:20',
            sender: fixer.id,
            text: "Dealer's hideout located in an abandoned factory, be cautious."
        },
        {
            id: '18',
            date: '2023-08-14T12:45:55',
            sender: tech.id,
            text: 'Implant is encrypted, bring decryption tools.'
        }
    ]
};
export const gig6Convo: IConversation = {
    id: '9',
    participants: [systemUser.id, fixer.id, assassin.id],
    gigConversation: true,
    messages: [
        {
            id: '19',
            date: '2023-08-15T18:00:00',
            sender: systemUser.id,
            text: 'Contract details sent, handle with discretion.'
        },
        {
            id: '20',
            date: '2023-08-15T18:30:25',
            sender: fixer.id,
            text: 'Event location: NeoLux Tower, tight security expected.'
        },
        {
            id: '21',
            date: '2023-08-15T19:15:10',
            sender: assassin.id,
            text: 'Providing poison-tipped blade for a clean kill.'
        }
    ]
};
export const gig7Convo: IConversation = {
    id: '9',
    participants: [systemUser.id, fixer.id, assassin.id],
    gigConversation: true,
    messages: [
        {
            id: '19',
            date: '2023-08-15T18:00:00',
            sender: systemUser.id,
            text: 'Contract details sent, handle with discretion.'
        },
        {
            id: '20',
            date: '2023-08-15T18:30:25',
            sender: fixer.id,
            text: 'Event location: NeoLux Tower, tight security expected.'
        },
        {
            id: '21',
            date: '2023-08-15T19:15:10',
            sender: assassin.id,
            text: 'Providing poison-tipped blade for a clean kill.'
        }
    ]
};
export const gig8Convo: IConversation = {
    id: '10',
    participants: [systemUser.id, netrunner.id, merc.id],
    gigConversation: true,
    messages: [
        {
            id: '22',
            date: '2023-08-16T14:00:00',
            sender: systemUser.id,
            text: 'Gig details sent, ensure their operation is crippled.'
        },
        {
            id: '23',
            date: '2023-08-16T14:30:40',
            sender: netrunner.id,
            text: 'Operation center is heavily guarded, hack into their systems to disable defenses.'
        },
        {
            id: '24',
            date: '2023-08-16T15:10:15',
            sender: merc.id,
            text: "I'll handle the muscle, expect a loud entrance."
        }
    ]
};
export const gig9Convo: IConversation = {
    id: '11',
    participants: [systemUser.id, fixer.id, hacker.id],
    gigConversation: true,
    messages: [
        {
            id: '25',
            date: '2023-08-17T09:30:00',
            sender: systemUser.id,
            text: 'Gig posted, prototype AI code-name: merc.idury.'
        },
        {
            id: '26',
            date: '2023-08-17T10:15:20',
            sender: fixer.id,
            text: 'Facility layout received, AI stored in Lab D5.'
        },
        {
            id: '27',
            date: '2023-08-17T11:00:45',
            sender: hacker.id,
            text: "Expect heavy digital defenses, I'll work on a backdoor."
        }
    ]
};
export const gig10Convo: IConversation = {
    id: '12',
    participants: [systemUser.id, fixer.id, merc.id],
    gigConversation: true,
    messages: [
        {
            id: '28',
            date: '2023-08-18T15:00:00',
            sender: systemUser.id,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '29',
            date: '2023-08-18T15:30:40',
            sender: fixer.id,
            text: "Target's last known location: Blackhaven Hotel, room 407."
        },
        {
            id: '30',
            date: '2023-08-18T16:15:15',
            sender: merc.id,
            text: "Expect opposition, I'll provide cover for the escape."
        }
    ]
};
export const gig11Convo: IConversation = {
    id: '13',
    participants: [systemUser.id, netrunner.id, hacker.id],
    gigConversation: true,
    messages: [
        {
            id: '31',
            date: '2023-08-19T12:30:00',
            sender: systemUser.id,
            text: 'Gig posted, details limited for security.'
        },
        {
            id: '32',
            date: '2023-08-19T13:00:20',
            sender: netrunner.id,
            text: 'Server located in a secret facility beneath Eden Tower.'
        },
        {
            id: '33',
            date: '2023-08-19T13:45:45',
            sender: hacker.id,
            text: "Firewalls are cutting-edge, I'm working on a breach plan."
        }
    ]
};

export const gig12Convo: IConversation = {
    id: '14',
    participants: [systemUser.id, fixer.id, runner.id],
    gigConversation: true,
    messages: [
        {
            id: '34',
            date: '2023-08-20T09:00:00',
            sender: systemUser.id,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '35',
            date: '2023-08-20T09:30:20',
            sender: fixer.id,
            text: 'Target location: Corporate HQ, high security.'
        },
        {
            id: '36',
            date: '2023-08-20T10:15:45',
            sender: runner.id,
            text: 'I need a distraction to get inside unnoticed.'
        }
    ]
};

export const gig13Convo: IConversation = {
    id: '15',
    participants: [systemUser.id, netrunner.id, hacker.id],
    gigConversation: true,
    messages: [
        {
            id: '37',
            date: '2023-08-21T14:30:00',
            sender: systemUser.id,
            text: 'Gig posted, details limited for security.'
        },
        {
            id: '38',
            date: '2023-08-21T15:00:20',
            sender: netrunner.id,
            text: 'Target has a heavily fortified data center.'
        },
        {
            id: '39',
            date: '2023-08-21T15:45:45',
            sender: hacker.id,
            text: 'I need time to crack their encryption.'
        }
    ]
};

export const gig14Convo: IConversation = {
    id: '16',
    participants: [systemUser.id, fixer.id, merc.id],
    gigConversation: true,
    messages: [
        {
            id: '40',
            date: '2023-08-22T11:30:00',
            sender: systemUser.id,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '41',
            date: '2023-08-22T12:00:20',
            sender: fixer.id,
            text: 'Target is a high-profile VIP, expect heavy security.'
        },
        {
            id: '42',
            date: '2023-08-22T12:45:45',
            sender: merc.id,
            text: 'I need a sniper position for a clean shot.'
        }
    ]
};
export const gig15Convo: IConversation = {
    id: '17',
    participants: [systemUser.id, netrunner.id, hiredGun.id],
    gigConversation: true,
    messages: [
        {
            id: '43',
            date: '2023-08-23T09:45:00',
            sender: systemUser.id,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '44',
            date: '2023-08-23T10:20:30',
            sender: netrunner.id,
            text: "Target's location is a heavily guarded corporate facility."
        },
        {
            id: '45',
            date: '2023-08-23T11:05:15',
            sender: hiredGun.id,
            text: "I'll need some serious firepower for this one."
        }
    ]
};

export const gig16Convo: IConversation = {
    id: '18',
    participants: [systemUser.id, fixer.id, runner.id],
    gigConversation: true,
    messages: [
        {
            id: '46',
            date: '2023-08-24T14:30:00',
            sender: systemUser.id,
            text: 'Gig posted, details limited.'
        },
        {
            id: '47',
            date: '2023-08-24T15:10:45',
            sender: fixer.id,
            text: 'Target is on the move, keep up the pace.'
        },
        {
            id: '48',
            date: '2023-08-24T15:45:20',
            sender: runner.id,
            text: "I'll need some stealth skills to complete this gig."
        }
    ]
};

export const mockConvos = [
    gig1Convo,
    gig2Convo,
    gig3Convo,
    gig4Convo,
    gig5Convo,
    gig6Convo,
    gig7Convo,
    gig8Convo,
    gig9Convo,
    gig10Convo,
    gig11Convo,
    gig12Convo,
    gig13Convo,
    gig14Convo,
    gig15Convo,
    gig16Convo
];
