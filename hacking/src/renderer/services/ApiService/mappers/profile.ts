import moment from 'moment';
import { ProfileType, EventType } from '../../../types';
import mapUser from './user';
import { startingPrograms } from './exploits';

const CYBERDECK_IMPLANT_NAME = 'Cyberdeck Integration Chip';
export const HACKING_TYPE = 'hacking';
const MINDHACK_IMPLANT_NAMES = ['Symbiotica', 'Artificial Hormon Stabilizer'];
export const MINDHACK_TYPE = 'mindhack';

export default function mapProfile(
  data: any,
  accounts = [],
  conversations = [],
  gigs = [],
): ProfileType {
  const hackingData = {
    alias: data.hackerName || data.handle,
    exploits: data.exploits,
  };
  const mindHackData = {
    mindHack: data.mindHack,
  };
  const privateR =
    data.privateRecords?.filter((event) => event.isRevealed === true) || [];
  const medical =
    data.medicalEvents?.filter((event) => event.isRevealed === true) || [];
  const criminal =
    data.criminalEvents?.filter((event) => event.isRevealed === true) || [];

  // todo DO USUNIĘCIa PRZED GRĄ!
  const exploits = startingPrograms[data.handle]
    ? startingPrograms[data.handle]
    : data.exploits;

  return {
    ...mapUser(data),
    exploits,
    mindHack: data.mindHack,
    hackerName: data.hackerName ? data.hackerName : data.handle,

    cyberwareLevel: data.cyberwareLevel,
    professionActual: data.professionActual,
    typeActual: data.typeActual,
    favoriteUserIds: data.favoriteUserIds,
    relations: data.relations,
    privateRecords: privateR?.map(mapRecord) || [],
    criminalEvents: criminal?.map(mapEvent) || [],
    medicalEvents: medical?.map(mapEvent) || [],
    accounts: accounts || [],
    conversations: conversations || [],
    gigs: gigs || [],
  };

  function mapEvent(data: any): EventType {
    const eventData = {
      id: data.id,
      name: data.name,
      status: data.status,
      type: data.type,
      description: data.eventDescription,
      date: moment(data.timeStamp).format('DD/MM HH:mm:ss'),
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
      date: moment(data.timeStamp).format('DD/MM HH:mm:ss'),
    };
  }
}
