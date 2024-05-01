import {
    GigCategoryNames,
    IGig,
    GigStatus,
    GigModes,
    GigSubcategoryNames
} from '../models/gig';

export const mockGigs: IGig[] = [
    {
        status: GigStatus.AVAILABLE,
        id: '1',
        title: 'Corporate Data Heist',
        payout: 500,
        reputationRequired: 5,
        authorId: 'user27',
        clientAccount: 'user27',
        providerAccount: null,
        description:
            'Retrieve confidential data from a heavily guarded corporate server.',
        category: GigCategoryNames.HACKING,
        subcategory: GigSubcategoryNames.SPOOFING,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '2',
        title: 'Undercover Delivery',
        payout: 300,
        reputationRequired: 2,
        authorId: 'user5',
        clientAccount: 'user5',
        providerAccount: null,
        description:
            'Deliver a mysterious package to an undisclosed location without asking questions.',
        category: GigCategoryNames.FIXER,
        subcategory: GigSubcategoryNames.DELIVERY,

        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '6',
        title: 'Prototype Extraction',
        payout: 800,
        reputationRequired: 4,
        authorId: 'user16',
        clientAccount: 'user16',
        providerAccount: null,
        description:
            'Infiltrate a high-security lab and steal experimental tech prototype.',
        category: GigCategoryNames.FIXER,
        subcategory: GigSubcategoryNames.TECH,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '7',
        title: 'High-Speed Assassination',
        payout: 150,

        reputationRequired: 5,
        authorId: 'user4',
        clientAccount: 'user4',
        providerAccount: null,
        description: 'Extract a target from a high-speed corporate convoy.',
        category: GigCategoryNames.KILLER,
        subcategory: GigSubcategoryNames.BODYGUARD,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.PROVIDER
    },
    {
        status: GigStatus.AVAILABLE,
        id: '8',
        title: 'Stolen Implant Recovery',
        payout: 400,

        reputationRequired: 3,
        authorId: 'user22',
        clientAccount: 'user22',
        providerAccount: null,
        description:
            'Retrieve a stolen cybernetic implant from a black market dealer.',
        category: GigCategoryNames.KILLER,
        subcategory: GigSubcategoryNames.DEBT_COLLECTION,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.IN_PROGRESS,
        id: '9',
        title: 'Corporate Hit',
        payout: 250,
        reputationRequired: 4,
        authorId: 'user15',
        providerAccount: 'user15',
        clientAccount: 'user4',
        takenById: 'user4',
        description:
            'Assassinate a corporate executive during a high-profile event.',
        category: GigCategoryNames.KILLER,
        subcategory: GigSubcategoryNames.HIT,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.PROVIDER
    },
    {
        status: GigStatus.IN_PROGRESS,
        id: '10',
        title: 'Cybernetics Sabotage',
        payout: 600,
        reputationRequired: 1,
        authorId: 'user2',
        clientAccount: 'user2',
        providerAccount: 'user3',
        takenById: 'user3',
        description: "Sabotage a rival gang's illegal cybernetics operation.",
        category: GigCategoryNames.FIXER,
        subcategory: GigSubcategoryNames.TECH,
        mode: GigModes.CLIENT,
        createdAt: '2021-09-01T12:00:00Z'
    },
    {
        status: GigStatus.AVAILABLE,
        id: '11',
        title: 'Prototype AI Smuggling',
        payout: 350,
        reputationRequired: 0,
        authorId: 'user29',
        clientAccount: 'user29',
        providerAccount: null,
        description:
            'Smuggle a prototype AI out of a restricted research facility.',
        category: GigCategoryNames.HACKING,
        subcategory: GigSubcategoryNames.SECURITY,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '12',
        title: 'High-Profile Rescue',
        payout: 700,
        reputationRequired: 2,
        authorId: 'user10',
        clientAccount: 'user10',
        providerAccount: null,
        description:
            'Rescue a high-profile target from a corrupt law enforcement raid.',
        category: GigCategoryNames.KILLER,
        subcategory: GigSubcategoryNames.BODYGUARD,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.AVAILABLE,
        id: '13',
        title: 'Corporate Data Theft',
        payout: 250,
        reputationRequired: 0,
        authorId: 'user30',
        clientAccount: 'user30',
        providerAccount: null,
        description:
            'Steal sensitive corporate financial data from a heavily fortified server.',
        category: GigCategoryNames.HACKING,
        subcategory: GigSubcategoryNames.SECURITY,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.PENDING_CONFIRMATION,
        id: '14',
        title: 'Corporate Data Heist',
        payout: 500,
        reputationRequired: 5,
        authorId: '55566ssaa5',
        clientAccount: '55566ssaa5',
        providerAccount: 'user6',
        takenById: 'user6',
        description:
            'Retrieve confidential data from a heavily guarded corporate server.',
        category: GigCategoryNames.HACKING,
        subcategory: GigSubcategoryNames.SPOOFING,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.DISPUTE,
        id: '15',
        title: 'Undercover Delivery',
        payout: 300,
        reputationRequired: 2,
        authorId: 'user5',
        clientAccount: 'user5',
        providerAccount: '55566ssaa5',
        takenById: '55566ssaa5',
        description:
            'Deliver a mysterious package to an undisclosed location without asking questions.',
        category: GigCategoryNames.FIXER,
        subcategory: GigSubcategoryNames.DELIVERY,
        createdAt: '2021-09-01T12:00:00Z',
        markedAsComplaintAt: '2021-09-01T12:00:00Z',
        complaintReason: 'Package was damaged during delivery.',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.COMPLETED,
        id: '16',
        title: 'Prototype Extraction',
        payout: 800,
        reputationRequired: 4,
        authorId: 'user16',
        clientAccount: 'user16',
        providerAccount: '55566ssaa5',
        takenById: '55566ssaa5',
        description:
            'Infiltrate a high-security lab and steal experimental tech prototype.',
        category: GigCategoryNames.FIXER,
        subcategory: GigSubcategoryNames.TECH,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    },
    {
        status: GigStatus.EXPIRED,
        id: '17',
        title: 'High-Speed Assassination',
        payout: 150,
        reputationRequired: 5,
        authorId: 'user4',
        clientAccount: 'user4',
        providerAccount: null,
        description: 'Extract a target from a high-speed corporate convoy.',
        category: GigCategoryNames.KILLER,
        subcategory: GigSubcategoryNames.BODYGUARD,
        createdAt: '2021-09-01T12:00:00Z',
        mode: GigModes.CLIENT
    }
];
