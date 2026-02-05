export type GigUpdate = {
    from: string; // previous status
    to: string; // next status
    date: string;
    sourceHandle: string; // handle of a user that initiated changing of a status
}

export type Gig = {
    title: string;
    description: string;
    descriptionDetailed: string;

    status: string;
    category: string;
    subCategory: string;
    reputationRequired: number;

    isAnonymizedAuthor: boolean;
    mode: 'authorIsHiring' | 'authorWantsToBeHired';
    isRevealedTo: string[]; // user handles, author is here from start

    authorId: string;
    authorHandle: string;
    authorAccountNumber: string;

    workerId: string;
    workerHandle: string;
    workerAccountNumber: string;

    conversationId: string; // conversation Id
    createdAt: string;
    updates: GigUpdate[];
    complaintReason: string;
}