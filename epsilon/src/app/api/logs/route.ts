import { NextResponse } from 'next/server'
import { get } from '@/services/api'

export async function GET() {
  const id = 'd3484b46-a31c-43b5-87fe-7465f5b3be3e'; // basesubnetwork
  const data = await get(`Log/${id}/all`);
  if (!Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid response.' }, { status: 502 })
  }
  const items = data.map(mapLog);
  return NextResponse.json({ items }, { status: 200 });
}

export default function mapLog(data: ApiLog) {
  return {
    ...data
    // id: data.id,
    // name: data.name,
    // users: data.users,
    // network: data.networkId,
    // accessPoint: data.accessPoint,
    // firewall: data.firewall,
  }
}

interface ApiLog {
  id: string;
  // name: string;
  // users: string;
  // networkId: string;
  // accessPoint: string;
  // firewall: string;
}