import { signOut } from '@/auth';

export async function GET() {
  return await signOut({ redirectTo: '/sector/police/login' });
}
