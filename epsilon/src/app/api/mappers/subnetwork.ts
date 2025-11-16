export default function mapSubnetwork(data: ApiSubnetwork) {
  return {
    id: data.id,
    name: data.name,
    users: data.users,
    network: data.networkId,
    accessPoint: data.accessPoint,
    firewall: data.firewall,
  }
}

interface ApiSubnetwork {
  id: string;
  name: string;
  users: string;
  networkId: string;
  accessPoint: string;
  firewall: string;
}