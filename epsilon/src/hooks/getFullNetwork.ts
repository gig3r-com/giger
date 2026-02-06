import { cookies } from 'next/headers';
import { getOrigin } from '@/utils';

type FullNetworkResponse = {
  network: unknown;
  usersByHandle: Record<string, unknown>;
};

export default async function getFullNetwork(id: string): Promise<FullNetworkResponse | null> {
  const cookieHeader = (await cookies()).toString();
  const origin = await getOrigin();

  const url = `${origin}/api/network/${encodeURIComponent(id)}`;
  const response = await fetch(url, {
    headers: { cookie: cookieHeader },
    cache: 'no-store',
  });

  if (!response.ok) return null;
  return await response.json().catch(() => null);
}
