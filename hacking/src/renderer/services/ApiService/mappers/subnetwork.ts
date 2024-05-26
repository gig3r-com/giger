import { SubnetworkType } from '../../../types';
import { ConfigService } from '../../index';

export default function mapSubnetwork(data: any): SubnetworkType {
  const hasLocker = data.ice?.includes('LOCKER');
  let accessPoint;
  if (hasLocker) {
    const networkIdsByAC = ConfigService.getNetworks();
    if (networkIdsByAC[data.networkId]) {
      accessPoint = networkIdsByAC[data.networkId].ac;
    }
  }
  return {
    id: data.id,
    name: data.name,
    users: data.users,
    networkId: data.networkId,
    firewall: data.firewall,
    operatingSystem: data.operatingSystem,
    ice: data.ice || [],
    accessPoint: accessPoint || 'none',
    pastHacks: data.pastHacks || [],
  };
}
