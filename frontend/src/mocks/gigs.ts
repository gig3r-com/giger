import { GigCategoryNames, IGig, GigStatus } from '../models/gig';

export const mockGigs: IGig[] = [
    {
        status: GigStatus.AVAILABLE,
        id: '1',
        title: 'Corporate Data Heist',
        payout: 500,
        reputationRequired: 5,
        authorId: 'user27',
        description:
            'Retrieve confidential data from a heavily guarded corporate server.',
        category: GigCategoryNames.SPOOFING
    },
    {
        status: GigStatus.AVAILABLE,
        id: '2',
        title: 'Undercover Delivery',
        payout: 300,
        reputationRequired: 2,
        authorId: 'user5',
        description:
            'Deliver a mysterious package to an undisclosed location without asking questions.',
        category: GigCategoryNames.DELIVERY
    },
    {
        status: GigStatus.AVAILABLE,
        id: '6',
        title: 'Prototype Extraction',
        payout: 800,
        reputationRequired: 4,
        authorId: 'user16',
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
        authorId: 'user4',
        description: 'Extract a target from a high-speed corporate convoy.',
        category: GigCategoryNames.BODYGUARD
    },
    {
        status: GigStatus.AVAILABLE,
        id: '8',
        title: 'Stolen Implant Recovery',
        payout: 400,

        reputationRequired: 3,
        authorId: 'user22',
        description:
            'Retrieve a stolen cybernetic implant from a black market dealer.',
        category: GigCategoryNames.DEBT_COLLECTION
    },
    {
        status: GigStatus.IN_PROGRESS,
        id: '9',
        title: 'Corporate Hit',
        payout: 250,
        reputationRequired: 4,
        authorId: 'user15',
        description:
            'Assassinate a corporate executive during a high-profile event.',
        category: GigCategoryNames.HIT
    },
    {
        status: GigStatus.IN_PROGRESS,
        id: '10',
        title: 'Cybernetics Sabotage',
        payout: 600,
        reputationRequired: 1,
        authorId: 'user2',
        description: "Sabotage a rival gang's illegal cybernetics operation.",
        category: GigCategoryNames.TECH
    },
    {
        status: GigStatus.AVAILABLE,
        id: '11',
        title: 'Prototype AI Smuggling',
        payout: 350,
        reputationRequired: 0,
        authorId: 'user29',
        description:
            'Smuggle a prototype AI out of a restricted research facility.',
        category: GigCategoryNames.SECURITY
    },
    {
        status: GigStatus.AVAILABLE,
        id: '12',
        title: 'High-Profile Rescue',
        payout: 700,
        reputationRequired: 2,
        authorId: 'user10',
        description:
            'Rescue a high-profile target from a corrupt law enforcement raid.',
        category: GigCategoryNames.BODYGUARD
    },
    {
        status: GigStatus.AVAILABLE,
        id: '13',
        title: 'Corporate Data Theft',
        payout: 250,
        reputationRequired: 0,
        authorId: 'user30',
        description:
            'Steal sensitive corporate financial data from a heavily fortified server.',
        category: GigCategoryNames.SECURITY
    }
];
