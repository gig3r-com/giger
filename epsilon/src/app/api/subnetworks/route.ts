import { NextResponse } from 'next/server';
import { get } from '@/services/api'

export async function GET() {
  const data = await get('Networks/subnetwork/all');
  if (!Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid response.' }, { status: 502 })
  }
  const items = data.map(mapSubnetwork);
  return NextResponse.json(items, { status: 200 });
}

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