// app/users/_components/schema.ts
import * as Yup from 'yup';
import type { User } from '@/notes';

const str = () => Yup.string().defined();
const num = () => Yup.number().defined();
const bool = () => Yup.boolean().defined();
const strArr = () => Yup.array().of(Yup.string().defined()).defined();

export const userSchema: Yup.ObjectSchema<User> = Yup.object({
        id: str().required(),
        active: bool().required(),
        roles: strArr().required(),
        handle: str().required(),

        name: str().required(),
        surname: str().required(),
        species: str().required(),
        cyberwareLevel: num().min(0).required(),

        faction: str(),
        factionRankPublic: str(),
        factionRankActual: str(),

        speciesPrivate: str(),
        hardRecords: Yup.array().of(Yup.mixed()).defined(),
        favoriteUsers: strArr(),

        offGameRecords: Yup.array().of(Yup.mixed()).defined(),
        combatSkill: num().min(0),

        // Keep the canonical key only:
        hackingSkill: num().min(0),

        confrontationistVsAgreeable: num(),
        cowardVsBrave: num(),
        talkativeVsSilent: num(),
        thinkerVsDoer: num(),

        vibe: str(),
        mindRecords: Yup.array().of(Yup.mixed()).defined(),
        affiliation: str(),
        profession: str(),
        wealth: str(),

        accounts: Yup.array().of(Yup.mixed()).defined(),
        mainAccount: str(),

        conversations: Yup.array().of(Yup.mixed()).defined(),

        network: str(),
        networkAdmin: str(),
        subnetwork: str(),

        gigReputation: Yup.object().defined(),

        personalIce: num().min(0),
        hackerName: str(),
        exploits: Yup.array().of(Yup.mixed()).defined(),
}).noUnknown(true) as Yup.ObjectSchema<User>;
