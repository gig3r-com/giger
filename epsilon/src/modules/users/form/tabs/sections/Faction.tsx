import React from 'react';
import { Stack } from '@mui/material';
import Input from '../../fields/Input';
import Collapsible from '@/components/common/Collapsible';

function Profile() {
  return (
    <Collapsible title="Faction">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>

        <Input onlyCreate label="Faction" name="faction" />
        <Input label="Faction Rank (Actual)" name="factionRankActual" />
        <Input onlyCreate label="Faction Rank (Public)" name="factionRankPublic" />

      </Stack>
    </Collapsible>
  );
}

export default Profile;