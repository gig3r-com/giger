import React from 'react';
import Content from '../_components/Content';
import { signOutAction } from '@/actions/auth';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

async function DatabasePage() {
  const session = await auth();
  if (!session) redirect('/sector/police/login');

  if (session.user?.faction === 'o_m_g') return (
    <Content user={ session.user } signOut={ signOutAction } />
  );

  redirect('/sector/police/logout');
}

export default DatabasePage;