import * as Yup from 'yup';
import {
  USER_VIBE_OPTIONS,
  UserVibe,
  USER_TYPE_OPTIONS,
  UserType,
  USER_VIBE_ENGAGEMENT_OPTIONS,
  UserVibeEngagement,
  USER_FACTION_OPTIONS,
  UserFaction, UserChar, USER_CHAR_OPTIONS, UserWealth, USER_WEALTH_OPTIONS,
} from './enums';

export const initialValues = {
  // Profile Section
  handle: '',
  name: '',
  surname: '',
  typeActual: 'HUMAN',
  typePublic: 'HUMAN',
  combatSkill: '0',
  cyberwareLevel: '0',

  // Character Section
  confrontationistVsAgreeable: '0',
  cowardVsBrave: '0',
  talkativeVsSilent: '0',
  thinkerVsDoer: '0',

  // Wealth Section
  wealthLevel: 'BROKE',
  insuredAmount: '0',
  reputationDescription: '',
  highSecurity: 'No',
  hasPlatinumPass: 'No',

  // Hacking Section
  hackingSkills: '0',

  // Vibe Section
  vibe: 'NO_VIBE',
  vibeFunction: '',
  vibeEngagement: 'NO_VIBE',

  // Faction Section
  faction: 'no_faction',
  factionRankActual: '',
  factionRankPublic: '',

  // Gig reputation Section
  gigReputation: {
    fixer: '0',
    hacking: '0',
    wellbeing: '0',
    killer: '0',
  },

  // Network Section
  network: '',
  subnetwork: '',

  // Private records
  privateRecords: [],
  meta: [],
  goals: [],
  relations: [],

  // Events
  medicalEvents: [],
  criminalEvents: [],
}

const typeSchema = Yup.string<UserType>().oneOf(USER_TYPE_OPTIONS, 'Invalid option').required('Please select type')

const charSchema = Yup.string<UserChar>()
    .oneOf(USER_CHAR_OPTIONS, 'Invalid option')
    .required('Please select option');

const recordsSchema = Yup.array(Yup.object({
  id: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
}));

const eventSchema = Yup.array(Yup.object({
  id: Yup.string().required(),
  type: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  timestamp: Yup.string().required(),
  status: Yup.string().required(),
}));

export const schema = Yup.object({
  // Profile
  handle: Yup.string().trim().required('Handle is required'),
  name: Yup.string().trim(),
  surname: Yup.string().trim(),
  typeActual: typeSchema,
  typePublic: typeSchema,

  // Character
  confrontationistVsAgreeable: charSchema,
  cowardVsBrave: charSchema,
  talkativeVsSilent: charSchema,
  thinkerVsDoer: charSchema,

  // Wealth
  wealthLevel: Yup.string<UserWealth>()
    .oneOf(USER_WEALTH_OPTIONS, 'Invalid option')
    .required('Please select option'),
  insuredAmount: Yup.string().required(),
  reputationDescription: Yup.string(),
  highSecurity: Yup.string().required(),
  hasPlatinumPass: Yup.string().required(),

  // Hacking
  hackingSkills: Yup.string().required(),

  // Vibe
  vibe: Yup.string<UserVibe>()
    .oneOf(USER_VIBE_OPTIONS, 'Invalid vibe')
    .required('Please select vibe'),
  vibeFunction: Yup.string(),
  vibeEngagement: Yup.string<UserVibeEngagement>()
    .transform((v) => (v === '' ? undefined : v))
    .oneOf(USER_VIBE_ENGAGEMENT_OPTIONS, 'Invalid vibe engagement')
    .required('Please select vibe engagement'),

  // Faction
  faction: Yup.string<UserFaction>()
    .oneOf(USER_FACTION_OPTIONS, 'Invalid faction')
    .required('Please select faction'),
  factionRankActual: Yup.string(),
  factionRankPublic: Yup.string(),

  // Gig reputation Section
  gigReputation: Yup.object({
    fixer: Yup.string().required(),
    hacking: Yup.string().required(),
    wellbeing: Yup.string().required(),
    killer: Yup.string().required(),
  }),

  // Network Section
  network: Yup.string().required(),
  subnetwork: Yup.string().required(),

  // Records
  privateRecords: recordsSchema,
  meta: recordsSchema,
  goals: recordsSchema,
  relations: recordsSchema,

  // Events
  medicalEvents: Yup.array(eventSchema),
  criminalEvents: Yup.array(eventSchema),
});
