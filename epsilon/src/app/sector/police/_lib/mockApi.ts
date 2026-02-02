import { LoginResult, SearchBuckets, Subject, CriminalEvent } from './types';

// Test users (clearance 1..5) — pass for all: delta-9
const USERS: Record<string, LoginResult> = {
  alpha:   { name: 'alpha',   clearance: 1 },
  bravo:   { name: 'bravo',   clearance: 2 },
  charlie: { name: 'charlie', clearance: 3 },
  delta:   { name: 'delta',   clearance: 4 },
  omega:   { name: 'omega',   clearance: 5 },
};

const DATA: Subject[] = [
  {
    name: 'Kara', surname: 'Mirov', handle: 'NullKit', type: 'HUMAN',
    faction: 'GhostMarket', factionRank: 'Operator', cyberwareLevel: 5, combatSkill: 2,
    highSecurity: false, clearanceRequired: 3,
    criminalEvents: [
      {
        type: 'SUSPECT',
        name: 'Municipal Grid Breach',
        eventDescription:
          'Unsupervised intrusion into Node S12 with lateral movement across substations S12-S14. Indicators of custom ICE signature “SABLE-9”. Exfil attempts thwarted, but persistence suspected. Dossier holds packet captures and device telemetry.',
        status: 'CURRENT', timeStamp: '2090-11-03T23:12:44.000Z',
      },
      {
        type: 'WANTED',
        name: 'Prohibited ICE Distribution',
        eventDescription:
          'Exchange of black ICE modules via GhostMarket link hubs. Trails obfuscated using time-sliced wallets and relay drones along Dockline.',
        status: 'CURRENT', timeStamp: '2090-07-19T04:27:00.000Z',
      },
    ],
  },
  {
    name: 'Rex', surname: 'Talbot', handle: 'TinWolf', type: 'ANDROID',
    faction: 'Scrap Guild', factionRank: 'Hired Muscle', cyberwareLevel: 3, combatSkill: 3,
    highSecurity: false, clearanceRequired: 2,
    criminalEvents: [
      {
        type: 'SUSPECT',
        name: 'Aggravated Assault — Arena F3',
        eventDescription:
          'Brawl escalated with illegal servo-boosters. Victim sustained compound fractures. Arena feeds show subject as initiator; footage partially corrupted due to EMP flare.',
        status: 'CURRENT', timeStamp: '2090-01-14T19:02:10.000Z',
      },
      {
        type: 'PUNISHMENT',
        name: 'Detainment (24h)',
        eventDescription:
          'Subject detained and released with fines. Compliance chip check passed. Behavioral risk remains elevated per post-release assessments.',
        status: 'HISTORICAL', timeStamp: '2089-05-21T07:51:00.000Z',
      },
    ],
  },
  {
    name: 'Aya', surname: 'Chen', handle: 'BlueCanary', type: 'HUMAN',
    faction: 'Transit Syndicate', factionRank: 'Courier', cyberwareLevel: 2, combatSkill: 1,
    highSecurity: true, clearanceRequired: 4,
    criminalEvents: [
      {
        type: 'WITNESS',
        name: 'Transit Node 06 Signal Jam',
        eventDescription:
          'Testimony on wideband interference affecting emergency channels. Includes routing maps and protection notes (redacted without clearance).',
        status: 'HISTORICAL', timeStamp: '2088-10-08T08:05:00.000Z',
      },
    ],
  },
  {
    name: 'Unknown', surname: '“Moth”', handle: 'Moth', type: 'AI',
    faction: 'Unattributed', factionRank: 'n/a', cyberwareLevel: 0, combatSkill: 3,
    highSecurity: false, clearanceRequired: 5,
    criminalEvents: [
      {
        type: 'WANTED',
        name: 'Biohazard Release (Attempted)',
        eventDescription:
          'Coordinated micro-drone dispersion attempt in sub-level tunnels. Pattern suggests swarm-level cognition. Dossier includes toxicology sims and recovered firmware.',
        status: 'CURRENT', timeStamp: '2090-06-02T01:20:00.000Z',
      },
      {
        type: 'SUSPECT',
        name: 'Terror Reconnaissance',
        eventDescription:
          'Thermals show multi-node scouting runs across service shafts. Latency profile implies non-human operator.',
        status: 'HISTORICAL', timeStamp: '2090-06-01T22:10:00.000Z',
      },
    ],
  },
];

const delay = (min=450, max=900) => new Promise(res => setTimeout(res, min + Math.round(Math.random()*(max-min))));
const maybeFail = (p=0.08) => { if (Math.random() < p) throw new Error('Network timeout'); };

export async function apiLogin(username: string, password: string): Promise<LoginResult> {
  await delay();
  maybeFail(0.06);
  const u = USERS[username.toLowerCase()];
  if (!u || password !== 'delta-9') throw new Error('Invalid credentials');
  return u;
}

export async function apiSearch(query: string): Promise<SearchBuckets> {
  await delay(500, 1000);
  maybeFail(0.07);
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

export async function apiGetDossier(handle: string): Promise<Subject> {
  await delay();
  maybeFail(0.05);
  const s = DATA.find(x => x.handle.toLowerCase() === handle.toLowerCase());
  if (!s) throw new Error('Subject not found');
  // deep clone (mock)
  return JSON.parse(JSON.stringify(s));
}
