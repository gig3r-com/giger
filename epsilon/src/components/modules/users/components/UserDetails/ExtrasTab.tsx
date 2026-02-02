import React from 'react';
import { Grid } from '@mui/material';
import { ApiUser } from '@/app/api/mappers/user';
import EmptyTab from './EmptyTab';
import SectionCard from '@/components/common/SectionCard';
import InfoRow from '@/components/common/InfoRow';

const fmt = (v?: string | number | null) =>
  v === null || v === undefined || v === '' ? '—' : String(v);

function ExtrasTab({ user }: { user: ApiUser | null }) {

  if (!user) {
    return <EmptyTab />
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <SectionCard title="Aliases & Favorites">
          <InfoRow
            label="Aliases"
            value={
              Object.keys(user.aliasMap || {}).length
                ? JSON.stringify(user.aliasMap)
                : '—'
            }
          />
          <InfoRow
            label="Favorite User IDs"
            value={user.favoriteUserIds?.length ? user.favoriteUserIds.join(', ') : '—'}
          />
        </SectionCard>
      </Grid>
      <Grid item xs={12}>
        <SectionCard title="Tools & Access">
          <InfoRow label="Exploits" value={user.exploits?.length ? user.exploits.join(', ') : '—'} />
          <InfoRow label="Mind Hack" value={fmt(user.mindHack)} />
          <InfoRow
            label="Mind Hack Enabled For"
            value={user.mindHackEnabledFor?.length ? user.mindHackEnabledFor.join(', ') : '—'}
          />
        </SectionCard>
      </Grid>
    </Grid>
  );
}

export default ExtrasTab;