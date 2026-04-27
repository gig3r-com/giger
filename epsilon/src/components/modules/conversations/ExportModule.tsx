'use client'
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from '@mui/material';
import Loader from './configs/Loader';
import ChatPicker from './configs/ChatPicker';

function EditModule() {
  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs }>
      <Stack direction="row" spacing={ 2 } alignItems="flex-start">
        <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0 }}>
          <Loader />
          <ChatPicker />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}

export default EditModule;