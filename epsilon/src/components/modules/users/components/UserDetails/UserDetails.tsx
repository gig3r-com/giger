'use client';

import  * as React from 'react';
import { Stack, } from '@mui/material';
import { useUsers } from '@/components/modules/users/context';
import Tabs from '@/components/common/Tabs';
import Title from './Title';
import type { ApiUser } from '@/app/api/mappers/user';
import OverviewTab from './OverviewTab';
import RecordsTab from './RecordsTab';
import EventsTab from './EventsTab';
import ExtrasTab from './ExtrasTab';
import ConversationsTab from './ConversationsTab';

export function UserDetailsPanel({ defaultTab = 0 }: { defaultTab?: number }) {
  const { selected } = useUsers();
  const [tab, setTab] = React.useState(defaultTab);

  const fullName = React.useMemo(() => {
    if (!selected) return '—';
    const n = [selected.name, selected.surname].filter(Boolean).join(' ').trim();
    return n ?? selected.handle;
  }, [selected]);

  return (
    <Stack spacing={ 2 } sx={{ width: '100%' }}>
      <Title user={ selected } fullName={ fullName } />
      <Tabs
        value={ tab }
        onChange={ (_, v) => setTab(v) }
        tabs={ [
          { key: 'Overview', label: 'Overview', component: <OverviewTab user={ selected } fullName={ fullName } />, },
          { key: 'Records', label: 'Records', component: <RecordsTab user={ selected } />, },
          { key: 'Events', label: 'Events', component: <EventsTab user={ selected } />, },
          { key: 'Extras', label: 'Extras', component: <ExtrasTab user={ selected } />, },
          { key: 'Conversations', label: 'Conversations', component: <ConversationsTab user={ selected } />, },
        ] }
      />
    </Stack>
  );
}

export default UserDetailsPanel;
