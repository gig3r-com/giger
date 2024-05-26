import { UserType } from '../../../types';

export default function mapUser(data: any): UserType {
  return {
    id: data.id,
    name: data.name,
    surname: data.surname,
    handle: data.handle,

    type: data.typePublic,
    profession: data.professionPublic,
    wealthLevel: data.wealthLevel,

    networkId: data.networkId,
    networkName: data.networkName,
    subnetworkId: data.subnetworkId,
    subnetworkName: data.subnetworkName,
  };
}
