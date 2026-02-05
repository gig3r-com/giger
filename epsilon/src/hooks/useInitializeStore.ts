'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    fetchAccountsByOwner,
    fetchConversationsByParticipant,
    fetchNetworkByName,
    fetchSubnetworks,
    fetchUsers,
} from '@/lib/api';
import { useStore } from '@/store/useStore';

const NETWORK_NAMES = [
    'AeroSpace',
    'Neonode',
    'Synapse',
    'TechNet',
    'directorsnetwork',
    'Sektor 5',
    'OpenNet',
];

export function useInitializeStore() {
    const hasInitializedRef = useRef(false);
    const {
        startUsersLoading,
        hydrateUsers,
        startConversationsLoading,
        hydrateConversations,
        startSubnetworksLoading,
        hydrateSubnetworks,
        startNetworksLoading,
        hydrateNetworks,
        startAccountsLoading,
        hydrateAccounts,
        startDerivedLoading,
        computeDerived,
    } = useStore();

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    useEffect(() => {
        if (!usersQuery.data) return;
        if (hasInitializedRef.current) return;

        hasInitializedRef.current = true;
        let cancelled = false;

        async function run() {
            try {
                const users = usersQuery.data;

                /* 1️⃣ Mark all entities & derived as loading */
                startUsersLoading();
                startConversationsLoading();
                startSubnetworksLoading();
                startNetworksLoading();
                startAccountsLoading();
                startDerivedLoading();

                hydrateUsers(users);
                if (cancelled) return;

                const conversationsPromise = Promise.all(
                    users.map((u) =>
                        fetchConversationsByParticipant(u.handle).catch((err) => {
                            console.warn(`Failed conversations for ${u.handle}`, err);
                            return [];
                        })
                    )
                ).then((res) => {
                    if (cancelled) return;
                    hydrateConversations(res.flat());
                });

                const subnetworksPromise = fetchSubnetworks()
                    .catch((err) => {
                        console.warn('Failed to fetch subnetworks', err);
                        return [];
                    })
                    .then((res) => {
                        if (cancelled) return;
                        hydrateSubnetworks(res);
                    });

                const networksPromise = Promise.all(
                    NETWORK_NAMES.map((name) =>
                        fetchNetworkByName(name).catch((err) => {
                            console.warn(`Failed network ${name}`, err);
                            return null;
                        })
                    )
                )
                    .then((res) => res.filter(Boolean))
                    .then((res) => {
                        if (cancelled) return;
                        hydrateNetworks(res);
                    });

                const accountsPromise = Promise.all(
                    users.map((u) =>
                        fetchAccountsByOwner(u.handle).catch((err) => {
                            console.warn(`Failed accounts for ${u.handle}`, err);
                            return [];
                        })
                    )
                )
                    .then((res) => res.flat())
                    .then((res) => {
                        if (cancelled) return;
                        hydrateAccounts(res);
                    });

                /* 4️⃣ Once conversations are hydrated, compute derived */
                conversationsPromise.then(() => {
                    if (cancelled) return;
                    computeDerived();
                });

                await Promise.all([conversationsPromise, subnetworksPromise, networksPromise, accountsPromise]);
            } catch (err) {
                console.error('Store initialization failed', err);
            }
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [usersQuery.data]);


    return { usersQuery };
}
