import React, { useMemo } from 'react';
import { useNetwork } from '@/components/modules/networks';
import { MenuItem } from '@mui/material';
import Select from './Select';

function SubnetworkSelect({ name, label, network }: { name: string, label: string, }) {
  const { networksByName } = useNetwork();

  const options = useMemo(() => {
    if (!network) {
      return [
        <MenuItem key="empty" value={ ` ` } disabled>
          Select network first
        </MenuItem>
      ]
    }

    if (!networksByName[network]?.subnetworks) {
      return [
        <MenuItem key="empty" value={ ` ` } disabled>
          Select network first
        </MenuItem>
      ]
    }

    return networksByName[network].subnetworks.map(({ name, id }) => (
      <MenuItem key={ id } value={ id }>
        { name }
      </MenuItem>
    ));
  }, [networksByName, network]);

  return (
    <Select
      label={ label }
      name={ name }
      mappedOptions={ options }
      disabled={ !network }
      value={ network ? undefined : ` ` }
    />
  );
}

export default SubnetworkSelect;