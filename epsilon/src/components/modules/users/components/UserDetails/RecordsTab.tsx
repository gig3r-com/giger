import React from 'react';
import { Grid } from '@mui/material';
import { ApiUser } from '@/app/api/mappers/user';
import EmptyTab from './EmptyTab';
import RecordsList from './RecordsList';

function RecordsTab({ user }: { user: ApiUser | null }) {

  if (!user) {
    return <EmptyTab />
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <RecordsList title="Private Records" items={user.privateRecords} />
      </Grid>
      <Grid item xs={12}>
        <RecordsList title="Meta" items={user.meta} />
      </Grid>
      <Grid item xs={12}>
        <RecordsList title="Goals" items={user.goals} />
      </Grid>
      <Grid item xs={12}>
        <RecordsList
          title="Relations"
          items={user.relations.map((r) => ({
            id: r.id,
            title: r.userName,
            description: r.description,
          }))}
        />
      </Grid>
    </Grid>
  );
}

export default RecordsTab;