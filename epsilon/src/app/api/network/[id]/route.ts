import { NextResponse } from 'next/server'
import { get } from '@/services/api'
import mapSubnetwork from '@/app/api/mappers/subnetwork'
import mapNetwork from '@/app/api/mappers/network'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const [networkResponse, subnetworksResponse] = await Promise.all([
    get(`Networks/network?id=${params.id}`),
    get('Networks/subnetwork/all'),
  ])
  const subnetworks = subnetworksResponse.map(mapSubnetwork);
  const network = mapNetwork(networkResponse, subnetworks);
  return NextResponse.json({ network }, { status: 200 })
}
