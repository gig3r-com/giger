import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/sector/police/login');
  if (session.user?.faction === 'o_m_g') redirect('/sector/police/database');
  redirect('/sector/police/logout');
}
