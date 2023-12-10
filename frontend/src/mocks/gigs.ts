import { GigCategoryNames, IGig, GigStatus } from '../models/gig';

export const mockGigs: IGig[] = [
    {
        status: GigStatus.AVAILABLE,
        id: '1',
        title: 'Corporate Data Heist',
        payout: 500,
        reputationRequired: 5,
        author: {
            id: '555665',
            name: 'NeonTiger',
            handle: 'Jerry Tarkovsky'
        },
        description:
            'Retrieve confidential data from a heavily guarded corporate server.',
        category: GigCategoryNames.HACKING
    },
    {
        status: GigStatus.AVAILABLE,
        id: '2',
        title: 'Undercover Delivery',
        payout: 300,
        reputationRequired: 2,
        author: {
            id: '555dd6ss65',
            name: 'World Breaker',
            handle: 'Adria Warren'
        },
        description:
            'Deliver a mysterious package to an undisclosed location without asking questions.',
        category: GigCategoryNames.COURIER
    },
    {
        status: GigStatus.AVAILABLE,
        id: '6',
        title: 'Prototype Extraction',
        payout: 800,
        reputationRequired: 4,
        author: {
            id: '555dd6ss65',
            name: 'World Breaker',
            handle: 'Adria Warren'
        },
        description:
            'Infiltrate a high-security lab and steal experimental tech prototype.',
        category: GigCategoryNames.TECH
    },
    {
        status: GigStatus.AVAILABLE,
        id: '7',
        title: 'High-Speed Assassination',
        payout: 150,

        reputationRequired: 5,
        author: {
            id: '555665',
            name: 'NeonTiger',
            handle: 'Jerry Tarkovsky'
        },
        description: 'Extract a target from a high-speed corporate convoy.',
        category: GigCategoryNames.COMBAT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '8',
        title: 'Stolen Implant Recovery',
        payout: 400,

        reputationRequired: 3,
        author: {
            id: '555665',
            name: 'NeonTiger',
            handle: 'Jerry Tarkovsky'
        },
        description:
            'Retrieve a stolen cybernetic implant from a black market dealer.',
        category: GigCategoryNames.RELATION
    },
    {
        status: GigStatus.IN_PROGRESS,
        id: '9',
        title: 'Corporate Hit',
        payout: 250,
        reputationRequired: 4,
        author: {
            id: '555665',
            name: 'NeonTiger',
            handle: 'Jerry Tarkovsky'
        },
        description:
            'Assassinate a corporate executive during a high-profile event.',
        category: GigCategoryNames.COMBAT
    },
    {
        status: GigStatus.IN_PROGRESS,
        id: '10',
        title: 'Cybernetics Sabotage',
        payout: 600,
        reputationRequired: 1,
        author: {
            id: '555dd665',
            handle: 'Internet Explorer',
            name: 'Marion Brown'
        },
        description: "Sabotage a rival gang's illegal cybernetics operation.",
        category: GigCategoryNames.TECH
    },
    {
        status: GigStatus.AVAILABLE,
        id: '11',
        title: 'Prototype AI Smuggling',
        payout: 350,
        reputationRequired: 0,
        author: {
            id: '555dd665',
            handle: 'Internet Explorer',
            name: 'Marion Brown'
        },
        description:
            'Smuggle a prototype AI out of a restricted research facility.',
        category: GigCategoryNames.HACKING
    },
    {
        status: GigStatus.AVAILABLE,
        id: '12',
        title: 'High-Profile Rescue',
        payout: 700,
        reputationRequired: 2,
        author: {
            id: '555dd665',
            handle: 'Internet Explorer',
            name: 'Marion Brown'
        },
        description:
            'Rescue a high-profile target from a corrupt law enforcement raid.',
        category: GigCategoryNames.COMBAT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '13',
        title: 'Corporate Data Theft',
        payout: 250,
        reputationRequired: 0,
        author: {
            id: '555dd665',
            handle: 'Internet Explorer',
            name: 'Marion Brown'
        },
        description:
            'Steal sensitive corporate financial data from a heavily fortified server.',
        category: GigCategoryNames.HACKING
    }
];
