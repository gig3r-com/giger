'use client'

import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { UserList, useUsers } from '@/components/modules/users';
import { redirect } from 'next/navigation';

function Page() {
  const { selected } = useUsers();

  useEffect(() => {
    if (selected) redirect(`/users/list/${selected.handle}`);
  }, [selected]);

  return (
    <Stack direction="row" spacing={ 2 } alignItems="flex-start">
      <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0 }}>
        <UserList />
      </Stack>
      Form?
    </Stack>
  );
}

export default Page;