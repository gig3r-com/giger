import React from 'react';
import { Stack, } from '@mui/material';
import Dot from '@/components/common/Dot/Dot';
import { useUsers } from '@/components/modules/users/context';
import { useNetwork } from '@/components/modules/networks';

function FetchStatuses() {
  const { isLoading: usersLoading, } = useUsers();
  const { isLoading: networksLoading } = useNetwork();

  return (
    <Stack direction="row" alignItems="center" sx={{ gap: 1, position: 'absolute', bottom: '12px' }}>
      <Dot tooltip="Users" variant={ usersLoading ? 'error' : 'ok' } />
      <Dot tooltip="Networks" variant={ networksLoading ? 'error' : 'ok' } />
    </Stack>
  )
}

export default FetchStatuses;