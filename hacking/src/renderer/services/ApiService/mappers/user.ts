import { UserType } from '../../../types';

export default function mapUser(data: any): UserType {
  return {
    id: data.id,
    name: data.name,
    surname: data.surname,
    handle: data.handle,
    aliasMap: data.aliasMap,

    type: data.typePublic,
    profession: data.professionPublic,
    age: data.age,
    wealthLevel: data.wealthLevel,

    networkId: data.networkId,
    subnetworkId: data.subnetworkId,
  };
}
