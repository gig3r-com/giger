import { cookies } from 'next/headers';
import { LogType } from '@/types';
import { getOrigin } from '@/utils';

export default async function getLogs(): Promise<LogType[]> {
  const cookieHeader = (await cookies()).toString();
  const origin = await getOrigin();

  const response = await fetch(`${origin}/api/logs`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  let items: LogType[] = [];
  if (response.ok) {
    const data = await response.json().catch(() => null);
    items = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [] ;
  }

  return items;
}