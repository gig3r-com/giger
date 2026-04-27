import { initialValues } from './schema';
import { UserFormValues } from './types';
import { ApiUser } from '@/app/api/mappers/user';

export function mapUserToForm(user: ApiUser): UserFormValues {
  return {
    ...initialValues,

    // Meta Form Data
    submitting: null,
    tab: 'profile',

    id: user.id ?? crypto.randomUUID(),

    // Main - Profile
    handle: user.handle ?? '',
    active: user.active ? 'Yes' : 'No',
    name: user.name ?? '',
    surname: user.surname ?? '',
    typeActual: user.typeActual ?? '',
    typePublic: user.typePublic ?? '',
    cyberwareLevel: user.cyberwareLevel.stat ?? '0',
    combatSkill: user.combatSkill?.stat ?? '0',
    wealthLevel: user.wealthLevel ?? '',
    insuredAmount: user.insuredAmount ?? '0',
    hasPlatinumPass: user.hasPlatinumPass ? 'Yes' : 'No',
    highSecurity: user.highSecurity ? 'Yes' : 'No',

    // Main - Faction
    vibe: user.vibe ?? '',
    vibeFunction: user.vibeFunction ?? '',
    vibeEngagement: user.vibeEngagement ?? '',
    vibeOpinions: user.vibeOpinions ?? '',

    // Main - Vibe
    faction: user.faction ?? '',
    factionRankActual: user.factionRankActual ?? '',
    factionRankPublic: user.factionRankPublic ?? '',

    // Main - Hacking
    hackerName: user.hackerName ?? '',
    hackingSkills: user.hackingSkills?.stat ?? '0',
    exploits: user.exploits?.join(', ') ?? '',

    // Main - Network
    network: user.networkName?.toLowerCase() ?? '', // networkId, networkName
    subnetwork: user.subnetworkId ?? '', // networkId, networkName
    networkAdminName: user.networkAdminName ?? '',

    // Main - Sliders
    confrontationistVsAgreeable: user.confrontationistVsAgreeable?.stat ?? '0',
    cowardVsBrave: user.cowardVsBrave?.stat ?? '0',
    talkativeVsSilent: user.talkativeVsSilent?.stat ?? '0',
    thinkerVsDoer: user.thinkerVsDoer?.stat ?? '0',

    // Main - Gig reputation
    gigReputationFixer: user.gigReputation?.FIXER ?? '0',
    gigReputationHacking: user.gigReputation?.HACKING ?? '0',
    gigReputationKiller: user.gigReputation?.KILLER ?? '0',
    gigReputationWellbeing: user.gigReputation?.WELLBEING ?? '0',

    // Main - Misc + aliasMap
    mindHack: user.mindHack ?? '',
    mindHackEnabledFor: user.mindHackEnabledFor?.join(', ') ?? '',
    roles: user.roles?.join(', ') ?? '',
    assets: user.assets?.join(', ') ?? '',
    reputationDescription: user.reputationDescription ?? '',

    // Records
    privateRecords: user.privateRecords?.map(mapRecord),
    relations: user.relations?.map(mapRelations),
    goals: user.goals?.map(mapRecord),
    meta: user.meta?.map(mapRecord),
    // favoriteUserIds: user.favoriteUserIds?.map(mapRecord),

    // Events
    criminalEvents: user.criminalEvents?.map(mapEvent),
    medicalEvents: user.medicalEvents?.map(mapEvent),
  }
}

const mapRecord = (record) => ({
  id: record.id ?? crypto.randomUUID(),
  description: record.description ?? '',
  recordType: record.recordType ?? '',
  title: record.title ?? '',
})

const mapRelations = (record) => ({
  id: record.id ?? crypto.randomUUID(),
  description: record.description ?? '',
  recordType: record.recordType ?? '',
  title: record.userName ?? '',
})

const mapEvent = (event) => ({
  id: event.id ?? crypto.randomUUID(),
  description: event.eventDescription ?? '',
  title: event.name ?? '',
  eventType: event.type ?? '',
  status: event.status ?? '',
  timeStamp: event.timeStamp ?? '',
})