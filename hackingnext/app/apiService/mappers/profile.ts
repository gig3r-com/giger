import moment from 'moment';
import { ProfileType, EventType } from '../types';
import mapUser from './user';

const CYBERDECK_IMPLANT_NAME = 'Cyberdeck Integration Chip';
export const HACKING_TYPE = 'hacking';
const MINDHACK_IMPLANT_NAMES = ['Symbiotica', 'Artificial Hormon Stabilizer'];
export const MINDHACK_TYPE = 'mindhack';

export default function mapProfile(data: any): ProfileType {
  const hackingData = {
    alias: data.hackerName || data.handle,
    exploits: data.exploits,
  };
  const mindHackData = {
    mindHack: data.mindHack,
  };

  return {
    ...mapUser(data),
    exploits: data.exploits,
    mindHack: data.mindHack,
    hackerName: data.hackerName ? data.hackerName : data.handle,

    cyberwareLevel: data.cyberwareLevel,
    professionActual: data.professionActual,
    typeActual: data.typeActual,
    favoriteUserIds: data.favoriteUserIds,
    relations: data.relations,
    privateRecords: data.privateRecords?.map(mapRecord) || [],
    criminalEvents: data.criminalEvents?.map(mapEvent) || [],
    medicalEvents: data.medicalEvents?.map(mapEvent) || [],
  };

  function mapEvent(data: any): EventType {
    const eventData = {
      id: data.id,
      name: data.name,
      status: data.status,
      type: data.type,
      description: data.eventDescription,
      date: moment(data.timeStamp).format('DD.MM.YYYY'),
    };
    if (eventData.name === CYBERDECK_IMPLANT_NAME) {
      eventData.additionalData = {
        type: HACKING_TYPE,
        ...hackingData,
      };
    } else if (MINDHACK_IMPLANT_NAMES.includes(eventData.name)) {
      eventData.additionalData = {
        type: MINDHACK_TYPE,
        ...mindHackData,
      };
    }

    return eventData;
  }

  function mapRecord(data: any): EventType {
    return {
      id: data.id,
      name: data.title,
      description: data.description,
      date: moment(data.timeStamp).format('DD.MM.YYYY'),
    };
  }
}
