import { ProfileType } from '../types';
import mapUser from './user';

export default function mapProfile(data: any): ProfileType {
  return {
    ...mapUser(data),
    exploits: data.exploits,
    mindHack: data.mindHack,
    hackerName: data.hackerName ? data.hackerName : data.handle,

    cyberwareLevel: data.cyberwareLevel,
    professionActual: data.professionActual,
    typeActual: data.typeActual,
    assets: data.assets,
    hackingSkills: data.hackingSkills,
    favoriteUserIds: data.favoriteUserIds,
    relations: data.relations,
    privateRecords: data.privateRecords,
    criminalEvents: data.criminalEvents,
    medicalEvents: data.medicalEvents,
  };
}
