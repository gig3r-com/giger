import React from 'react';
import SubnetworksTable from './SubnetworkTable/SubnetworkTable';
import { Stack } from '@mui/material';
import { NetworkType } from '@/types';

function Subnetworks({ network, }: { network: NetworkType }) {
  return (
    <Stack direction="column" spacing="20">
      { network.subnetworks.map(subnetwork => {
        return (
          <SubnetworksTable key={ subnetwork.id } subnetwork={ subnetwork } />
        )
      }) }
    </Stack>
  );
}

export default Subnetworks;