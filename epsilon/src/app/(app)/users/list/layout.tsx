import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';
import { UserList } from '@/components/modules/users';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <Stack direction="row" spacing={ 2 } alignItems="flex-start" sx={{ height: '100%' }}>
      <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0, height: '100%' }}>
        <UserList url="/users/list/" />
      </Stack>
      { children }
    </Stack>
  )
}
