import { NetworkType } from '../../../types';

export default function mapUser(data: any): NetworkType {
  return {
    id: data.id,
    name: data.name,
    adminId: data.adminId,
    subnetworks: data.subnetworks || [],
  };
}
