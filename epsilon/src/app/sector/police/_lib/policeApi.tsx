import { SearchBuckets } from '../_lib/types';
import { getUsers } from '@/app/sector/_api/users';

export async function apiSearch(q: string): Promise<SearchBuckets> {
  const query = q.toLowerCase();
  const users = await getUsers();
  const buckets: SearchBuckets = { identity: [], eventTitle: [], eventDesc: [], faction: [], type: [] };
  const factions = {};
  for (const subject of users) {
    subject.clearanceRequired = subject.highSecurity ? 2 : 1;

    // Identity search
    const { handle = '', name = '', surname = '' } = subject;
    const h = handle?.toLowerCase(); const n = name?.toLowerCase(); const s = surname?.toLowerCase();
    if (h?.includes(query)) buckets.identity.push({ kind: 'identity', field: 'handle', subject });
    else if (n?.includes(query)) buckets.identity.push({ kind: 'identity', field: 'name', subject });
    else if (s?.includes(query)) buckets.identity.push({ kind: 'identity', field: 'surname', subject });

    // Criminal events search
    for (const event of subject.criminalEvents) {
      if (event.name?.toLowerCase().includes(query)) buckets.eventTitle.push({ kind: 'eventTitle', subject, event });
      if (event.eventDescription?.toLowerCase().includes(query)) buckets.eventDesc.push({ kind: 'eventDesc', subject, event });
    }

    // Faction search
    if (subject.faction?.toLowerCase().includes(query)) {
      console.log(factions, subject.faction, factions[subject.faction], Array.isArray(factions[subject.faction]))
      if (Array.isArray(factions[subject.faction])) factions[subject.faction].push(subject);
      else factions[subject.faction] = [subject];
    }

    // if (user.factionRankPublic?.toLowerCase().includes(query)) factions[subject.id] = subject;
    // if (user.typePublic?.toLowerCase().includes(query)) buckets.type.push({ kind: 'type', subject: user });
  }
  Object.keys(factions).forEach(key => buckets.faction.push({ kind: 'faction', faction: key, subjects: factions[key] }))
  console.log(buckets)
  return buckets;
}