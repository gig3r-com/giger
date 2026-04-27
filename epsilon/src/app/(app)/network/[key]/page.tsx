'use client'

import { Stack } from '@mui/material';
import { useNetwork, Subnetworks, Overview } from '@/components/modules/networks';
import * as React from 'react';

interface NetworkPageProps {
  params: {
    id: string;
  };
}

export default function NetworkPage({ params }: NetworkPageProps) {
  const { key } = React.use(params);
  const { networksByName } = useNetwork();

  if (!networksByName[key]) return null;

  return (
    <Stack direction="row" spacing={ 2 } alignItems="flex-start">
      <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0 }}>
        <Overview network={ networksByName[key] } />
      </Stack>
      <Subnetworks network={ networksByName[key] } />
      {/*<UserDetails />*/}
    </Stack>
  )
}
