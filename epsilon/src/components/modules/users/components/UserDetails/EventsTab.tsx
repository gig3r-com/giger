import React from 'react';
import { Grid } from '@mui/material';
import { ApiUser } from '@/app/api/mappers/user';
import EmptyTab from './EmptyTab';
import EventsList from './EventsList';

function EventsTab({ user }: { user: ApiUser | null }) {

  if (!user) {
    return <EmptyTab />
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <EventsList title="Criminal Events" items={user.criminalEvents} />
      </Grid>
      <Grid item xs={12}>
        <EventsList title="Medical Events" items={user.medicalEvents} />
      </Grid>
    </Grid>
  );
}

export default EventsTab;