import { User } from '@/types';

export async function getUsers() {
  const res = await fetch('/api/users', { cache: 'no-store', });

  if (!res.ok) {
    throw new Error(`GET /api/users failed: ${res.status}`);
  }

  const data = (await res.json().catch(() => null)) as
    | { users?: User[] }
    | null;

  return Array.isArray(data?.users) ? data!.users : [];
}