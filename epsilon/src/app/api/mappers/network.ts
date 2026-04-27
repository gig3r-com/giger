import { SubnetworkType } from '@/types';

export default function mapNetwork(data: ApiNetwork, subnetworks: SubnetworkType[]) {
  return {
    id: data.id,
    name: data.name,
    subnetworks: subnetworks.filter(s => data.subnetworks.includes(s.id)),
    admin: data.adminId || '',
  };
}

interface ApiNetwork {
  id: string;
  name: string;
  subnetworks: string[];
  adminId: string;
  accessPoint: string;
  firewall: string;
}