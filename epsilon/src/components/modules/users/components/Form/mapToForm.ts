import dayjs from 'dayjs';
import { initialValues } from '@/components/modules/users/components/Form/schema';

export default function mapUserToForm(data: any) {
  return {
    ...initialValues,
    id: data.id ?? crypto.randomUUID(),
    name: data.name ?? '',
    handle: data.handle ?? '',
    name: data.name ?? '',
    surname: data.surname ?? '',
    // roles: [],
    // aliasMap: {},
    // active: true,
    typePublic: data.typePublic ?? '',
    factionRankPublic: data.factionRankPublic ?? '',
    surname: data.surname ?? '',
    vibe: data.vibe ?? '',
    wealthLevel: data.wealthLevel ?? '',

    // network and subnetwork
    network: data.networkName?.toLowerCase() ?? '',
    subnetwork: data.subnetworkId,

    hasPlatinumPass: data.hasPlatinumPass ? 'Yes' : 'No',
    highSecurity: data.highSecurity ? 'Yes' : 'No',
    reputationDescription: data.reputationDescription ?? '',
    cyberwareLevel: Number(data.cyberwareLevel?.stat) ?? 0,
    typeActual: data.typeActual ?? '',
    factionRankActual: data.factionRankActual ?? '',
    assets: [],
    hackingSkills: Number(data.hackingSkills?.stat) ?? 0,
    confrontationistVsAgreeable: Number(data.confrontationistVsAgreeable?.stat) ?? 0,
    cowardVsBrave: Number(data.cowardVsBrave?.stat) ?? 0,
    talkativeVsSilent: Number(data.talkativeVsSilent?.stat) ?? 0,
    thinkerVsDoer: Number(data.thinkerVsDoer?.stat) ?? 0,
    combatSkill: Number(data.combatSkill?.stat) ?? 0,
    vibeFunction: data.vibeFunction ?? '',
    vibeOpinions: data.vibeOpinions ?? '',
    vibeEngagement: data.vibeEngagement ?? '',
    // favoriteUserIds: [],
    faction: data.faction ?? '',
    insuredAmount: Number(data.insuredAmount) ?? 0,
    gigReputation: {
      fixer: Number(data.gigReputation.fixer) ?? 0,
      hacking: Number(data.gigReputation.hacking) ?? 0,
      wellbeing: Number(data.gigReputation.wellbeing) ?? 0,
      killer: Number(data.gigReputation.killer) ?? 0,
    },
    networkAdminName: '',
    relations: data.relations.map(mapRelation),
    goals: data.goals.map(mapRecord),
    meta: data.meta.map(mapMeta),
    privateRecords: data.privateRecords.map(mapRecord),
    criminalEvents: data.criminalEvents.map(mapEvent),
    medicalEvents: data.medicalEvents.map(mapEvent),
    // exploits: [],
    // mindHack: 'BANNED',
    // mindHackEnabledFor: [],
    // hackerName: ''
  }
}

function mapMeta(data) {
  return {
    // "id": "string",
    id: data.id ?? crypto.randomUUID(),
    description: data.description ?? '',
    recordType: data.recordType ?? '',
    title: data.userName ?? '',
  }
}

function mapRelation(data) {
  return {
    // "id": "string",
    // isRevealed: true,
    id: data.id ?? crypto.randomUUID(),
    description: data.description ?? '',
    recordType: data.recordType ?? '',
    title: data.userName ?? '',
  }
}

function mapRecord(data) {
  return {
    // "id": "string",
    // isRevealed: true,
    id: data.id ?? crypto.randomUUID(),
    description: data.description ?? '',
    recordType: data.recordType ?? '',
    title: data.title ?? '',
  }
}

function mapEvent(data) {
  return {
    // "id": "string",
    // isRevealed: true,
    id: data.id ?? crypto.randomUUID(),
    title: data.name ?? '',
    description: data.eventDescription ?? '',
    status: data.status ?? '',
    timeStamp: dayjs(data.timeStamp).toDate().toISOString(),
    type: data.type ?? '',
  }
}