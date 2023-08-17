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
    participants: [systemUser, ripperdoc, hiredGun],
    gigConversation: true,
    messages: [
        {
            id: '1',
            date: '2023-08-11T15:20:32',
            sender: systemUser,
            text: 'ACCEPTED'
        },
        {
            id: '2',
            date: '2023-08-11T15:23:13',
            sender: ripperdoc,
            text: 'Shop is at P3 North, ask for Steven'
        },
        {
            id: '3',
            date: '2023-08-11T15:25:37',
            sender: hiredGun,
            text: 'Anesthesia is paid extra though'
        }
    ]
};
export const gig2Convo: IConversation = {
    id: '2',
    participants: [systemUser, fixer],
    gigConversation: true,
    messages: [
        {
            id: '4',
            date: '2023-08-11T16:05:22',
            sender: systemUser,
            text: 'ACCEPTED'
        },
        {
            id: '5',
            date: '2023-08-11T16:08:46',
            sender: fixer,
            text: 'Package must be delivered by midnight, no exceptions.'
        }
    ]
};
export const gig3Convo: IConversation = {
    id: '6',
    participants: [systemUser, netrunner, hiredGun],
    gigConversation: true,
    messages: [
        {
            id: '10',
            date: '2023-08-12T09:45:00',
            sender: systemUser,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '11',
            date: '2023-08-12T10:20:30',
            sender: netrunner,
            text: "Lab's security is top-notch, might need some distraction."
        },
        {
            id: '12',
            date: '2023-08-12T11:05:15',
            sender: hiredGun,
            text: "Any idea what they're paying for this tech?"
        }
    ]
};
export const gig4Convo: IConversation = {
    id: '7',
    participants: [systemUser, fixer, runner],
    gigConversation: true,
    messages: [
        {
            id: '13',
            date: '2023-08-13T14:30:00',
            sender: systemUser,
            text: 'Gig posted, details limited.'
        },
        {
            id: '14',
            date: '2023-08-13T15:10:45',
            sender: fixer,
            text: 'Convo: IConversationy route confirmed, moving fast through sector 7.'
        },
        {
            id: '15',
            date: '2023-08-13T15:45:20',
            sender: runner,
            text: "I'll need some serious firepower to pull this off."
        }
    ]
};
export const gig5Convo: IConversation = {
    id: '8',
    participants: [systemUser, fixer, tech],
    gigConversation: true,
    messages: [
        {
            id: '16',
            date: '2023-08-14T11:30:00',
            sender: systemUser,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '17',
            date: '2023-08-14T12:15:20',
            sender: fixer,
            text: "Dealer's hideout located in an abandoned factory, be cautious."
        },
        {
            id: '18',
            date: '2023-08-14T12:45:55',
            sender: tech,
            text: 'Implant is encrypted, bring decryption tools.'
        }
    ]
};
export const gig6Convo: IConversation = {
    id: '9',
    participants: [systemUser, fixer, assassin],
    gigConversation: true,
    messages: [
        {
            id: '19',
            date: '2023-08-15T18:00:00',
            sender: systemUser,
            text: 'Contract details sent, handle with discretion.'
        },
        {
            id: '20',
            date: '2023-08-15T18:30:25',
            sender: fixer,
            text: 'Event location: NeoLux Tower, tight security expected.'
        },
        {
            id: '21',
            date: '2023-08-15T19:15:10',
            sender: assassin,
            text: 'Providing poison-tipped blade for a clean kill.'
        }
    ]
};
export const gig7Convo: IConversation = {
    id: '9',
    participants: [systemUser, fixer, assassin],
    gigConversation: true,
    messages: [
        {
            id: '19',
            date: '2023-08-15T18:00:00',
            sender: systemUser,
            text: 'Contract details sent, handle with discretion.'
        },
        {
            id: '20',
            date: '2023-08-15T18:30:25',
            sender: fixer,
            text: 'Event location: NeoLux Tower, tight security expected.'
        },
        {
            id: '21',
            date: '2023-08-15T19:15:10',
            sender: assassin,
            text: 'Providing poison-tipped blade for a clean kill.'
        }
    ]
};
export const gig8Convo: IConversation = {
    id: '10',
    participants: [systemUser, netrunner, merc],
    gigConversation: true,
    messages: [
        {
            id: '22',
            date: '2023-08-16T14:00:00',
            sender: systemUser,
            text: 'Gig details sent, ensure their operation is crippled.'
        },
        {
            id: '23',
            date: '2023-08-16T14:30:40',
            sender: netrunner,
            text: 'Operation center is heavily guarded, hack into their systems to disable defenses.'
        },
        {
            id: '24',
            date: '2023-08-16T15:10:15',
            sender: merc,
            text: "I'll handle the muscle, expect a loud entrance."
        }
    ]
};
export const gig9Convo: IConversation = {
    id: '11',
    participants: [systemUser, fixer, hacker],
    gigConversation: true,
    messages: [
        {
            id: '25',
            date: '2023-08-17T09:30:00',
            sender: systemUser,
            text: 'Gig posted, prototype AI code-name: Mercury.'
        },
        {
            id: '26',
            date: '2023-08-17T10:15:20',
            sender: fixer,
            text: 'Facility layout received, AI stored in Lab D5.'
        },
        {
            id: '27',
            date: '2023-08-17T11:00:45',
            sender: hacker,
            text: "Expect heavy digital defenses, I'll work on a backdoor."
        }
    ]
};
export const gig10Convo: IConversation = {
    id: '12',
    participants: [systemUser, fixer, merc],
    gigConversation: true,
    messages: [
        {
            id: '28',
            date: '2023-08-18T15:00:00',
            sender: systemUser,
            text: 'Gig details encrypted, access key sent.'
        },
        {
            id: '29',
            date: '2023-08-18T15:30:40',
            sender: fixer,
            text: "Target's last known location: Blackhaven Hotel, room 407."
        },
        {
            id: '30',
            date: '2023-08-18T16:15:15',
            sender: merc,
            text: "Expect opposition, I'll provide cover for the escape."
        }
    ]
};
export const gig11Convo: IConversation = {
    id: '13',
    participants: [systemUser, netrunner, hacker],
    gigConversation: true,
    messages: [
        {
            id: '31',
            date: '2023-08-19T12:30:00',
            sender: systemUser,
            text: 'Gig posted, details limited for security.'
        },
        {
            id: '32',
            date: '2023-08-19T13:00:20',
            sender: netrunner,
            text: 'Server located in a secret facility beneath Eden Tower.'
        },
        {
            id: '33',
            date: '2023-08-19T13:45:45',
            sender: hacker,
            text: "Firewalls are cutting-edge, I'm working on a breach plan."
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
    gig11Convo
];
