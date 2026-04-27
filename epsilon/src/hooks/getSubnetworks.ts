import { cookies } from 'next/headers';
import { SubnetworkType } from '@/types';
import { getOrigin } from '@/utils';

export default async function getSubnetworks(): Promise<SubnetworkType[]> {
  const cookieHeader = (await cookies()).toString();
  const origin = await getOrigin();

  const response = await fetch(`${origin}/api/subnetworks`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  let items: SubnetworkType[] = [];
  if (response.ok) {
    const data = await response.json().catch(() => null);
    items = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [] ;
  }

  return items;
}