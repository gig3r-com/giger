'use client';
import { SearchBuckets, Subject } from './types';

// ——— same dataset as earlier (trimmed for brevity) ———
const DATA: Subject[] = [/* ... paste subjects from previous mock ... */];

// helpers
const delay = (min=450, max=900) => new Promise(res => setTimeout(res, min + Math.round(Math.random()*(max-min))));
const maybeFail = (p=0.07) => { if (Math.random() < p) throw new Error('Network timeout'); };

export async function searchAll(query: string): Promise<SearchBuckets> {
  await delay(); maybeFail();
  const q = query.toLowerCase();
  const buckets: SearchBuckets = { identity: [], eventTitle: [], eventDesc: [], faction: [], type: [] };
  for (const s of DATA) {
    if (s.handle.toLowerCase().includes(q)) buckets.identity.push({ kind:'identity', field:'handle', subject:s });
    if (s.name.toLowerCase().includes(q))   buckets.identity.push({ kind:'identity', field:'name', subject:s });
    if (s.surname.toLowerCase().includes(q))buckets.identity.push({ kind:'identity', field:'surname', subject:s });
    if (s.faction.toLowerCase().includes(q))     buckets.faction.push({ kind:'faction', field:'faction', subject:s });
    if (s.factionRank.toLowerCase().includes(q)) buckets.faction.push({ kind:'faction', field:'factionRank', subject:s });
    if (s.type.toLowerCase().includes(q)) buckets.type.push({ kind:'type', subject:s });
    for (const ev of s.criminalEvents) {
      if (ev.name.toLowerCase().includes(q)) buckets.eventTitle.push({ kind:'eventTitle', subject:s, event:ev });
      if (ev.eventDescription.toLowerCase().includes(q)) buckets.eventDesc.push({ kind:'eventDesc', subject:s, event:ev });
      if (ev.type.toLowerCase().includes(q as any)) buckets.eventTitle.push({ kind:'eventTitle', subject:s, event:ev });
    }
  }
  return buckets;
}

export async function getDossier(handle: string): Promise<Subject> {
  await delay(); maybeFail(0.05);
  const s = DATA.find(x => x.handle.toLowerCase() === handle.toLowerCase());
  if (!s) throw new Error('Subject not found');
  return JSON.parse(JSON.stringify(s));
}
