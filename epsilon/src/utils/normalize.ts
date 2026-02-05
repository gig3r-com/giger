import type { Conversation } from '@/types'


// Merge two conversation objects that may represent the same conversation
export function mergeConversations(a: Conversation, b: Conversation): Conversation {
    const messagesA = a.messages ?? []
    const messagesB = b.messages ?? []
// simple message dedupe by id
    const map = new Map<string, any>()
    for (const m of messagesA) map.set(m.id, m)
    for (const m of messagesB) map.set(m.id, m)


    const participants = Array.from(new Set([...(a.participants ?? []), ...(b.participants ?? [])]))


    return {
        ...a,
        ...b,
        participants,
        messages: Array.from(map.values()),
    }
}