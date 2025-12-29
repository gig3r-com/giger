'use client'
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from '@mui/material';
import Subnetworks from './configs/subnetworks';
import Subnetworks from './components/Subnetworks';

function NetworkModule() {


  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs }>
      <Stack direction="row" spacing={ 2 } alignItems="flex-start">
        <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0 }}>
          <Subnetworks />
        </Stack>
        <Subnetworks />
      </Stack>
    </LocalizationProvider>
  );
}

export default NetworkModule;