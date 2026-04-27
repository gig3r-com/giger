'use client'

import React from 'react';
import { UserForm, TemplateProvider, FormController } from '@/modules/users';
import { Stack } from '@mui/material';

function Page() {
  return (
    <Stack direction="row" spacing={ 2 } alignItems="flex-start" sx={{ height: '100%' }}>
      <Stack spacing={ 2 } sx={{ width: 400, flexShrink: 0, height: '100%' }}>
        <FormController />
        <TemplateProvider />
      </Stack>
      <UserForm />
    </Stack>
  );
}

export default Page;