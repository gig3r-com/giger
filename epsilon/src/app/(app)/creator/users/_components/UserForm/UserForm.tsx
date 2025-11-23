// app/users/_components/UserForm.tsx
'use client';

import * as React from 'react';
import { Formik, Form } from 'formik';
import { userSchema } from './schema';
import { FormDebug } from './FormDebug';
import Tabs from '@/components/common/Tabs';
import MainTab from './tabs/MainTab';
import HardRecordsTab from './tabs/HardRecordsTab';
import HackingTab from './tabs/HackingTab';
import BankingTab from './tabs/BankingTab';
import ConversationsTab from './tabs/ConversationsTab';
import type { User } from '@/notes';
import {
    HARD_RECORD_CATEGORIES
} from '@/configs/Record';

type UserFormProps = {
    /** When provided (e.g. from /users/[handle]) the form will prefill with this user */
    initialUser?: Partial<User>;
};

/** Canonical, type-safe defaults for a new user */
const BASE_USER = {
    id: '',
    active: false,
    roles: [],
    handle: '',

    name: '',
    surname: '',
    species: '',
    cyberwareLevel: 0,

    faction: '',
    factionRankPublic: '',
    factionRankActual: '',

    speciesPrivate: '',
    hardRecords: [],
    favoriteUsers: [],

    offGameRecords: [],
    combatSkill: 0,

    // 🔧 Keep only the canonical key; remove the duplicate:
    // hackerSkill: 0, // <-- removed to satisfy the User type
    hackingSkill: 0,

    confrontationistVsAgreeable: 0,
    cowardVsBrave: 0,
    talkativeVsSilent: 0,
    thinkerVsDoer: 0,

    vibe: '',
    mindRecords: [],
    affiliation: '',
    profession: '',
    wealth: '',

    accounts: [],
    mainAccount: '',

    conversations: [],

    network: '',
    networkAdmin: '',
    subnetwork: '',

    gigReputation: {},

    personalIce: 0,
    hackerName: '',
    exploits: [],
} satisfies User;

const mapUserToForm = (partial?: Partial<User>): User => {
    const hardRecords = partial?.hardRecords ?? BASE_USER.hardRecords;
    const mindRecords = partial?.mindRecords ?? BASE_USER.mindRecords;
    const offGameRecords = partial?.offGameRecords ?? BASE_USER.offGameRecords;


    return ({
        ...BASE_USER,
        ...partial,
        // Ensure arrays/objects are always defined
        roles: partial?.roles ?? BASE_USER.roles,
        // hardRecords: partial?.hardRecords ?? BASE_USER.hardRecords,
        favoriteUsers: partial?.favoriteUsers ?? BASE_USER.favoriteUsers,
        // offGameRecords: partial?.offGameRecords ?? BASE_USER.offGameRecords,
        // mindRecords: partial?.mindRecords ?? BASE_USER.mindRecords,
        accounts: partial?.accounts ?? BASE_USER.accounts,
        conversations: partial?.conversations ?? BASE_USER.conversations,
        exploits: partial?.exploits ?? BASE_USER.exploits,
        gigReputation: partial?.gigReputation ?? BASE_USER.gigReputation,//
        // Records
        criminalHardRecords: hardRecords
            .filter(r => r.category === HARD_RECORD_CATEGORIES.CRIMINAL)
            .sort((r1, r2) => r1.timestamp.localeCompare(r2.timestamp)),
        medicalHardRecords: hardRecords
            .filter(r => r.category === HARD_RECORD_CATEGORIES.MEDICAL)
            .sort((r1, r2) => r1.timestamp.localeCompare(r2.timestamp)),
        fileHardRecords: hardRecords
            .filter(r => r.category === HARD_RECORD_CATEGORIES.FILE)
            .sort((r1, r2) => r1.timestamp.localeCompare(r2.timestamp)),
        memoryMindRecords: [],
        goalMindRecords: [],
        relationMindRecords: [],
        goalOffGameRecords: [],
        ruleOffGameHardRecords: [],
    });
}

export const UserForm: React.FC<UserFormProps> = ({ initialUser }) => {
    const [tab, setTab] = React.useState('main');
    const initialValues = React.useMemo(() => mapUserToForm(initialUser), [initialUser]);

    return (
        <Formik<User>
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => {
                console.log('SUBMIT', values);
                alert('Submitted! Check console for output.');
            }}
            validateOnBlur
            validateOnChange
            enableReinitialize
        >
            <Form noValidate>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    tabs={[
                        { key: 'main', label: 'Main', component: <MainTab /> },
                        { key: 'hard-records', label: 'Hard Records', component: <HardRecordsTab /> },
                        { key: 'mind-records', label: 'Mind Records', component: <HardRecordsTab /> },
                        { key: 'off-game-records', label: 'OffGame Records', component: <HardRecordsTab /> },
                        { key: 'hacking', label: 'Hacking', component: <HackingTab /> },
                        { key: 'conversations', label: 'Conversations', component: <ConversationsTab /> },
                        { key: 'banking', label: 'Banking', component: <BankingTab /> },
                        { key: 'debug', label: 'Debug', component: <FormDebug /> },
                    ]}
                />
            </Form>
        </Formik>
    );
};

export default UserForm;
