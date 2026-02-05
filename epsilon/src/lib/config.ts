export const API = {
    USERS: '/api/users',
    CONVERSATIONS_BY_PARTICIPANT: (participant: string) =>
        `/api/conversation/byParticipant?participant=${encodeURIComponent(participant)}`,
    SUBNETWORKS: '/api/subnetworks',
    NETWORK_BY_NAME: (name: string) => `/api/network?name=${encodeURIComponent(name)}`,
    ACCOUNTS_BY_OWNER: (ownerHandle: string) =>
        `/api/account/byOwner?owner=${encodeURIComponent(ownerHandle)}`,
}
