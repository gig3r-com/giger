import React, { useMemo } from 'react';
import { useNetwork } from '@/components/modules/networks';
import { MenuItem } from '@mui/material';
import Select from './Select';

function NetworkSelect({ name, label }: { name: string, label: string, }) {
  const { networksByName } = useNetwork();

  const options = useMemo(() => Object.keys(networksByName) .map(networkKey => (
    <MenuItem key={ networkKey } value={ networkKey }>
      { networkKey }
    </MenuItem>
  )), [networksByName]);

  return (
    <Select
      label={ label }
      name={ name }
      mappedOptions={ options || [] }
    />
  );
}

export default NetworkSelect;