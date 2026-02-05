import { API } from './config';
/** -----------------------
 * Accounts
 * ----------------------- */
import type { Account, Conversation, Network, Subnetwork, User } from '@/types';

/** -----------------------
 * Users
 * ----------------------- */
export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(API.USERS);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

/** -----------------------
 * Conversations by participant
 * ----------------------- */
export async function fetchConversationsByParticipant(participant: string): Promise<Conversation[]> {
    const res = await fetch(API.CONVERSATIONS_BY_PARTICIPANT(participant));
    if (!res.ok) {
        console.warn(`Failed to fetch conversations for ${ participant }`);
        return [];
    }
    return res.json();
}

/** -----------------------
 * Subnetworks
 * ----------------------- */
export async function fetchSubnetworks(): Promise<Subnetwork[]> {
    const res = await fetch(API.SUBNETWORKS);
    if (!res.ok) {
        console.warn('Failed to fetch subnetworks');
        return [];
    }
    return res.json();
}

/** -----------------------
 * Network by Name
 * ----------------------- */
export async function fetchNetworkByName(name: string): Promise<Network | null> {
    const res = await fetch(API.NETWORK_BY_NAME(name));
    if (!res.ok) {
        console.warn(`Failed to fetch network ${ name }`);
        return null;
    }
    return res.json();
}


export async function fetchAccountsByOwner(ownerHandle: string): Promise<Account[]> {
    const res = await fetch(API.ACCOUNTS_BY_OWNER(ownerHandle));
    if (!res.ok) {
        console.warn(`Failed to fetch accounts for owner ${ ownerHandle }`);
        return [];
    }
    return res.json();
}
