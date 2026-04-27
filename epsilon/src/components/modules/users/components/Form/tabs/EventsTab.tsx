import React from 'react';
import { Stack } from '@mui/material';
import Events from '../Fields/Events';

function EventsTab() {
  return (
    <>
      <Stack direction="row" spacing={ 2 } sx={{ width: '100%' }}>
        <Stack direction="column" spacing={ 2 } sx={{ flex: 1 }}>
          <Events name="medicalEvents" addLabel="Add medical event" />
        </Stack>
        <Stack direction="column" spacing={ 2 } sx={{ flex: 1 }}>
          <Events name="criminalEvents" addLabel="Add criminal event" />
        </Stack>
      </Stack>
    </>
  );
}

export default EventsTab;