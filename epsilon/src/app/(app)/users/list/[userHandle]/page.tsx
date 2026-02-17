'use client';

import React from 'react';
import UserDetails from '@/components/modules/users/components/UserDetails/UserDetails';
import { useUsers } from '@/components/modules/users';

function Page({ params }: { params: { userHandle: string; } }) {
  const { selected, setSelected } = useUsers();

  console.log(selected, params)
  if (selected && params.userHandle !== selected.handle) {
    setSelected(params.userHandle);
  }

  return (
    <UserDetails />
  );
}

export default Page;
