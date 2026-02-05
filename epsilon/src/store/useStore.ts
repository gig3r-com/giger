'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
    User,
    Conversation,
    Subnetwork,
    Network,
    Account,
} from '@/types';
import { mergeConversations } from '@/utils/normalize';
import { derivedWorkerSource } from './derivedWorker';

/* -----------------------
 * Load status
 * --------------------- */
export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

/* -----------------------
 * Store shape
 * --------------------- */
type Store = {
    /* status */
    status: {
        entities: {
            users: LoadStatus;
            conversations: LoadStatus;
            subnetworks: LoadStatus;
            networks: LoadStatus;
            accounts: LoadStatus;
        };
        derived: LoadStatus;
    };

    /* entities */
    entities: {
        users: Record<string, User>;
        conversations: Record<string, Conversation>;
        subnetworks: Record<string, Subnetwork>;
        networks: Record<string, Network>;
        accounts: Record<string, Account>;
    };

    /* derived */
    derived: {
        conversationMessageCounts: Record<string, number>;
        userMessageCounts: Record<string, number>;
        busiestConversationId: string | null;
        userWithMostMessagesId: string | null;
    };

    /* -------- users -------- */
    startUsersLoading: () => void;
    hydrateUsers: (users: User[]) => void;

    /* -------- conversations -------- */
    startConversationsLoading: () => void;
    hydrateConversations: (conversations: Conversation[]) => void;

    /* -------- subnetworks -------- */
    startSubnetworksLoading: () => void;
    hydrateSubnetworks: (subnetworks: Subnetwork[]) => void;

    /* -------- networks -------- */
    startNetworksLoading: () => void;
    hydrateNetworks: (networks: Network[]) => void;

    /* -------- accounts -------- */
    startAccountsLoading: () => void;
    hydrateAccounts: (accounts: Account[]) => void;

    /* -------- derived -------- */
    startDerivedLoading: () => void;
    hydrateDerived: (data: Store['derived']) => void;
    computeDerived: () => void;
};

/* -----------------------
 * Worker singleton
 * --------------------- */
let worker: Worker | null = null;

function getDerivedWorker() {
    if (worker) return worker;
    const blob = new Blob([derivedWorkerSource], { type: 'application/javascript' });
    worker = new Worker(URL.createObjectURL(blob));
    return worker;
}

/* -----------------------
 * Store
 * --------------------- */
export const useStore = create<Store>()(
    devtools((set, get) => ({
        /* ----------------- initial state ----------------- */
        status: {
            entities: {
                users: 'idle',
                conversations: 'idle',
                subnetworks: 'idle',
                networks: 'idle',
                accounts: 'idle',
            },
            derived: 'idle',
        },
        entities: {
            users: {},
            conversations: {},
            subnetworks: {},
            networks: {},
            accounts: {},
        },
        derived: {
            conversationMessageCounts: {},
            userMessageCounts: {},
            busiestConversationId: null,
            userWithMostMessagesId: null,
        },

        /* ----------------- users ----------------- */
        startUsersLoading() {
            set((s) => ({ status: { ...s.status, entities: { ...s.status.entities, users: 'loading' } } }), false, 'users/loading');
        },
        hydrateUsers(users) {
            set((s) => ({
                entities: { ...s.entities, users: users.reduce<Record<string, User>>((acc, u) => { acc[u.handle ?? u.id] = u; return acc; }, {}) },
                status: { ...s.status, entities: { ...s.status.entities, users: 'ready' } },
            }), false, 'users/ready');
        },

        /* ----------------- conversations ----------------- */
        startConversationsLoading() {
            set((s) => ({ status: { ...s.status, entities: { ...s.status.entities, conversations: 'loading' } } }), false, 'conversations/loading');
        },
        hydrateConversations(conversations) {
            set((s) => {
                const next = { ...s.entities.conversations };
                for (const c of conversations) {
                    if (!c?.id) continue;
                    next[c.id] = next[c.id] ? mergeConversations(next[c.id], c) : c;
                }
                return {
                    entities: { ...s.entities, conversations: next },
                    status: { ...s.status, entities: { ...s.status.entities, conversations: 'ready' } },
                };
            }, false, 'conversations/ready');
        },

        /* ----------------- subnetworks ----------------- */
        startSubnetworksLoading() {
            set((s) => ({ status: { ...s.status, entities: { ...s.status.entities, subnetworks: 'loading' } } }), false, 'subnetworks/loading');
        },
        hydrateSubnetworks(subnetworks) {
            set((s) => ({
                entities: { ...s.entities, subnetworks: subnetworks.reduce<Record<string, Subnetwork>>((acc, sn) => { if (sn?.id) acc[sn.id] = sn; return acc; }, {}) },
                status: { ...s.status, entities: { ...s.status.entities, subnetworks: 'ready' } },
            }), false, 'subnetworks/ready');
        },

        /* ----------------- networks ----------------- */
        startNetworksLoading() {
            set((s) => ({ status: { ...s.status, entities: { ...s.status.entities, networks: 'loading' } } }), false, 'networks/loading');
        },
        hydrateNetworks(networks) {
            set((s) => ({
                entities: { ...s.entities, networks: networks.reduce<Record<string, Network>>((acc, n) => { if (n?.id) acc[n.id] = n; return acc; }, {}) },
                status: { ...s.status, entities: { ...s.status.entities, networks: 'ready' } },
            }), false, 'networks/ready');
        },

        /* ----------------- accounts ----------------- */
        startAccountsLoading() {
            set((s) => ({ status: { ...s.status, entities: { ...s.status.entities, accounts: 'loading' } } }), false, 'accounts/loading');
        },
        hydrateAccounts(accounts) {
            set((s) => ({
                entities: { ...s.entities, accounts: accounts.reduce<Record<string, Account>>((acc, a) => { if (a?.id) acc[a.id] = a; return acc; }, {}) },
                status: { ...s.status, entities: { ...s.status.entities, accounts: 'ready' } },
            }), false, 'accounts/ready');
        },

        /* ----------------- derived ----------------- */
        startDerivedLoading() {
            set((s) => ({ status: { ...s.status, derived: 'loading' } }), false, 'derived/loading');
        },
        hydrateDerived(data) {
            set((s) => ({ derived: data, status: { ...s.status, derived: 'ready' } }), false, 'derived/ready');
        },
        computeDerived() {
            const w = getDerivedWorker();
            get().startDerivedLoading();
            w.postMessage({ conversations: get().entities.conversations });
            w.onmessage = (e) => get().hydrateDerived(e.data);
            w.onerror = () => set((s) => ({ status: { ...s.status, derived: 'error' } }), false, 'derived/error');
        },
    })),
);
