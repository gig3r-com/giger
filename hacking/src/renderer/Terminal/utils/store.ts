import { ProfileType, SubnetworkType } from '../../apiService/types';

const loginUserKey: string = 'loginUser';
const connectedSubnetworkKey: string = 'connectedSubnetwork';

export function setLoginUserData(data: ProfileType | null): void {
  localStorage.setItem(loginUserKey, JSON.stringify(data));
}

export function getLoginUserData(): ProfileType | null {
  const rawData = localStorage.getItem(loginUserKey);
  if (rawData) return JSON.parse(rawData);
  return null;
}

export function setConnectedSubnetworkData(data: SubnetworkType | null): void {
  localStorage.setItem(connectedSubnetworkKey, JSON.stringify(data));
}

export function getConnectedSubnetworkData(): SubnetworkType | null {
  const rawData = localStorage.getItem(connectedSubnetworkKey);
  if (rawData) return JSON.parse(rawData);
  return null;
}

export function isConnected(): boolean {
  const subnetworkData = getConnectedSubnetworkData();
  return !!(subnetworkData && subnetworkData.id);
}
