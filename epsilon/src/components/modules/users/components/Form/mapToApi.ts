import dayjs from 'dayjs';

export default function mapUserToApi(data: any, networksByName) {
  const network = networksByName[data.network];
  const subnetwork = networksByName[data.network].subnetworks.filter(s => s.id === data.subnetwork)[0];
  return {
    id: crypto.randomUUID(),
    name: data.name ?? '',
    handle: data.handle ?? '',
    name: data.name ?? '',
    surname: data.surname ?? '',
    roles: [],
    aliasMap: {},
    active: true,
    typePublic: data.typePublic ?? '',
    factionRankPublic: data.factionRankPublic ?? '',
    surname: data.surname ?? '',
    vibe: data.vibe ?? '',
    wealthLevel: data.wealthLevel ?? '',
    networkId: network.id,
    networkName: network.name,
    subnetworkId: subnetwork.id,
    subnetworkName: subnetwork.name,
    hasPlatinumPass: data.hasPlatinumPass === 'Yes' ? true : false,
    highSecurity: data.highSecurity === 'Yes' ? true : false,
    reputationDescription: data.reputationDescription ?? '',
    cyberwareLevel: {
      stat: Number(data.cyberwareLevel) ?? 0,
    },
    typeActual: data.typeActual ?? '',
    factionRankActual: data.factionRankActual ?? '',
    assets: [],
    hackingSkills: {
      "stat": Number(data.hackingSkills) ?? 0,
    },
    confrontationistVsAgreeable: {
      "stat": Number(data.confrontationistVsAgreeable) ?? 0,
    },
    cowardVsBrave: {
      "stat": Number(data.cowardVsBrave) ?? 0,
    },
    talkativeVsSilent: {
      "stat": Number(data.talkativeVsSilent) ?? 0,
    },
    thinkerVsDoer: {
      "stat": Number(data.thinkerVsDoer) ?? 0,
    },
    combatSkill: {
      "stat": Number(data.combatSkill) ?? 0,
    },
    vibeFunction: data.vibeFunction ?? '',
    vibeOpinions: data.vibeOpinions ?? '',
    vibeEngagement: data.vibeEngagement ?? '',
    favoriteUserIds: [],
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
    exploits: [],
    mindHack: 'BANNED',
    mindHackEnabledFor: [],
    hackerName: ''
  }
}

function mapMeta(data) {
  return {
    // "id": "string",
    description: data.description ?? '',
    recordType: data.recordType ?? '',
    userName: data.title ?? '',
  }
}

function mapRelation(data) {
  return {
    // "id": "string",
    isRevealed: true,
    description: data.description ?? '',
    recordType: data.recordType ?? '',
    userName: data.title ?? '',
  }
}

function mapRecord(data) {
  return {
    // "id": "string",
    isRevealed: true,
    description: data.description ?? '',
    recordType: data.recordType ?? '',
    title: data.title ?? '',
  }
}

function mapEvent(data) {
  return {
    // "id": "string",
    isRevealed: true,
    name: data.title ?? '',
    eventDescription: data.description ?? '',
    status: data.status ?? '',
    timeStamp: dayjs(data.timeStamp).toDate().toISOString(),
    type: data.type ?? '',
  }
}