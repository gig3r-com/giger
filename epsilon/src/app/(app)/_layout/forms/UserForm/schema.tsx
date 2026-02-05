import * as Yup from 'yup';
import U from '@/configs/entities/user';

const str = () => Yup.string().defined();
const bool = () => Yup.boolean().defined();

export const userSchema = Yup.object({
    id: str().required(),
    roles: Yup.array().of(Yup.string().oneOf(U.roles)),

    handle: str().required(),
    summary: str(),
    active: bool().required(),
    name: str(),
    surname: str(),

    faction: str().oneOf(U.factions),
    factionRankPublic: str().oneOf(U.factionRanks),
    factionRankActual: str().oneOf(U.factionRanks),

    speciesPublic: str().oneOf(U.species),
    speciesActual: str().oneOf(U.species),
    vibe: str().oneOf(U.vibes),
    vibeLevel: str().oneOf(U.vibeLevels), // Number in API

    confrontationistVsAgreeable: str().oneOf(U.personalityStats), // Number in API
    cowardVsBrave: str().oneOf(U.personalityStats), // Number in API
    talkativeVsSilent: str().oneOf(U.personalityStats), // Number in API
    thinkerVsDoer: str().oneOf(U.personalityStats), // Number in API

    affiliation: str().oneOf(U.affiliations),
    profession: str().oneOf(U.professions),
    wealth: str().oneOf(U.wealth),
    cyberwareLevel: str().oneOf(U.cyberwareLavels), // Number in API

    network: str(), // networkName
    networkAdmin: str(),
    subnetwork: str(), // subnetworkName

    combatSkill: str().oneOf(U.combatSkills), // Number in API
    hackerSkill: str().oneOf(U.hackingSkills), // Number in API

    favoriteUsers: Yup.array().of(Yup.string()), // user handles

    // hardRecords: RecordType[];
    // offGameRecords: RecordType[];
    // mindRecords: RecordType[];

    // accounts: Account[];
    // mainAccount: string; // accountNumber

    // conversations: Conversation[];

    // gigReputation: Record<string, number>; // { [string]: [number] }

    // personalIce: str(), // Number in API
    // hackerName: str(),
    // exploits: Yup.array().of(Yup.string()),

    // plots: Plot[]; // connection to Plots, many to many

    epsilonNotes: str(),
    epsilonBankingNotes: str(),
    epsilonConversationNotes: str(),
    // epsilonConversationsNotes: { participants: string[], notes: string, }[];
    epsilonPlots: str(),
    epsilonData: Yup.object(),
});
