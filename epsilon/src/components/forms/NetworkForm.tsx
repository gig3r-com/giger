import React, { useMemo } from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect, Stack } from '@mui/material';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNetwork } from '@/components/modules/networks';
import { NetworkType } from '@/types';

const schema = Yup.object({
  network: Yup.string().required('Network is required'),
  subnetwork: Yup.string().required('Subnetwork is required'),
});

function NetworkInput() {
  const { networksByName } = useNetwork();
  const [field, meta, helpers] = useField('network');

  const options = useMemo(() => Object.keys(networksByName) .map(networkKey => (
    <MenuItem key={ networkKey } value={ networkKey }>
      { networkKey }
    </MenuItem>
  )), [networksByName]);

  return (
    <FormControl fullWidth error={ meta.touched && Boolean(meta.error) } size='small'>
      <InputLabel>Network</InputLabel>
      <MuiSelect{ ...field } label="Network" onChange={ (e) => helpers.setValue(e.target.value) }>
        { options }
      </MuiSelect>
      <FormHelperText>{ meta.touched ? meta.error : `` }</FormHelperText>
    </FormControl>
  )
}

function SubnetworkInput() {
  const { networksByName } = useNetwork();
  const [networkField] = useField('network');
  const [field, meta, helpers] = useField('subnetwork');

  const options = useMemo(() => {
    if (!networkField.value) {
      return [
        <MenuItem key="empty" value={ ` ` }>
          Select network first
        </MenuItem>
      ]
    }

    return networksByName[networkField.value]?.subnetworks.map(({ name, id }) => (
      <MenuItem key={ id } value={ id }>
        { name }
      </MenuItem>
    ));
  }, [networksByName, networkField.value]);

  return (
    <FormControl fullWidth error={ meta.touched && Boolean(meta.error) } size='small'>
      <InputLabel>Subnetwork</InputLabel>
      <MuiSelect{ ...field } label="Subnetwork" onChange={ (e) => helpers.setValue(e.target.value) }>
        { options }
      </MuiSelect>
      <FormHelperText>{ meta.touched ? meta.error : `` }</FormHelperText>
    </FormControl>
  )
}

function getNetwork(networksByName?: Record<string, NetworkType>, network?: string) {
  if (networksByName[network]) return networksByName[network];
  const filteredNetworks = Object.values(networksByName).filter(
    ({ name, id }) => name === network || id === network)
  if (filteredNetworks[0]) return filteredNetworks[0];
  return null;
}

function getSubnetwork(network?: NetworkType | null, subnetwork?: string) {
  if (!network) return null;
  if (!subnetwork) return null;
  const filteredSubnetworks = network.subnetworks?.filter(
    ({ name, id }) => name === subnetwork || id === subnetwork)
  if (filteredSubnetworks?.[0]) return filteredSubnetworks[0];
  return null;
}

function NetworkForm({ network, subnetwork, onSubmit }: { network?: string, subnetwork?: string }) {
  const { networksByName } = useNetwork();
  const initialNetwork = useMemo(() => getNetwork(networksByName, network), []);
  const initialSubnetwork = useMemo(() => getSubnetwork(initialNetwork, subnetwork), []);
  const initialValues = useMemo(() => ({
    network: initialNetwork?.name?.toLowerCase() ?? '',
    subnetwork: initialSubnetwork?.id ?? '',
  }), [initialNetwork, initialSubnetwork]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={ (values, formikHelpers) => {
        const network = getNetwork(networksByName, values.network);
        const subnetwork = getSubnetwork(network, values.subnetwork);
        onSubmit({ network, subnetwork, initialNetwork, initialSubnetwork }, formikHelpers)
      }}
    >
      <Form id='network-form'>
        <Stack spacing={2}>
          <NetworkInput />
          <SubnetworkInput />
          <Button type='submit' variant='contained'>
            Save
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}

export default NetworkForm;