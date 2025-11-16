import { Stack } from '@mui/material';
import { UserList } from '@/components/modules/users';
import * as React from 'react';
import UserDetails from '@/components/modules/users/components/UserDetails/UserDetails';

export default function UsersPage() {
    return (
      <Stack direction="row" spacing={ 2 } alignItems="flex-start">
        <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0 }}>
          <UserList />
        </Stack>
        <UserDetails />
      </Stack>
    )
}
