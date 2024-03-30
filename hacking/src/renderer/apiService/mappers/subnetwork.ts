import { SubnetworkType } from '../types';

export default function mapUser(data: any): SubnetworkType {
  return {
    id: data.id,
    name: data.name,
    users: data.users,
    networkId: data.networkId,
    firewall: data.firewall,
    operatingSystem: data.operatingSystem,
    ice: data.ice || [],
    accessPoint: data.accessPoint,
    pastHacks: data.pastHacks || [],
  };
}
