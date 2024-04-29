import { SubnetworkType, NetworkType, UserType } from '../../types';
import { field, tabField, title, tabArray, array, onlyTab } from './utils';

export function getUserIdLines(userId: string): string[] {
  return [`User ID: ${onlyTab(userId)}`];
}
export function getUserDataLines(data: UserType): string[] {
  return [
    `${title('User')}`,
    // eslint-disable-next-line
    `${tabField('id', data.id)} ${tabField('handle', data.handle,)} ${field('name', data.name)} ${field('surname', data.surname,)}`,
    // eslint-disable-next-line
    `${tabField('network', data.networkId)} ${tabField('subnetwork', data.subnetworkId,)}`,
    // eslint-disable-next-line
    `${field('type', data.type)} ${field('profession', data.profession,)} ${field('age', String(data.age))}`,
  ];
}

export function getSubnetworkDataLines(data: SubnetworkType): string[] {
  return [
    `${title('Subnetwork')}`,
    // eslint-disable-next-line
    `${tabField('id', data.id)} ${tabField('name', data.name)} ${tabField('networkId', data.networkId,)}`,
    // eslint-disable-next-line
    `${tabArray('users', data.users)}`,
    // eslint-disable-next-line
    `${field('firewall', data.firewall)} ${field('system', data.operatingSystem,)} ${field('accessPoint', data.accessPoint)}`,
    // eslint-disable-next-line
    `${array('ice', data.ice.length ? data.ice : ['none'])}`,
  ];
}

export function getNetworkDataLines(data: NetworkType): string[] {
  return [
    `${title('Network')}`,
    // eslint-disable-next-line
    `${tabField('id', data.id)} ${tabField('name', data.name)}`,
    // eslint-disable-next-line
    `${tabArray('subnetworks', data.subnetworks)}`,
  ];
}
