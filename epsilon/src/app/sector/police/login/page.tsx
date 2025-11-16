import React from 'react';
import { LoginCard } from '../../_auth/LoginCard';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

async function LoginPage() {
  const session = await auth();
  if (!session) return <LoginCard />;
  if (session.user?.faction === 'o_m_g') redirect('/sector/police/database');
  redirect('/sector/police/logout');
}

export default LoginPage;