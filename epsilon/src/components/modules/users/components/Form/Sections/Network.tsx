import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import NetworkSelect from '../Fields/NetworkSelect';
import SubnetworkSelect from '../Fields/SubnetworkSelect';
import { useField } from 'formik';

function Network() {
  const [networkField] = useField('network')

  return (
    <SectionCard title="Network">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <NetworkSelect label="Network" name="network" />
        <SubnetworkSelect label="Subnetowrk" name="subnetwork" network={ networkField?.value } />
      </Stack>
    </SectionCard>
  );
}

export default Network;