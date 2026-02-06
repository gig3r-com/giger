import React from 'react';
import { Stack } from '@mui/material';
import Profile from '../Sections/Profile';
import Wealth from '../Sections/Wealth';
import Vibe from '../Sections/Vibe';
import Faction from '../Sections/Faction';
import Character from '../Sections/Character';
import GigReputation from '../Sections/GigReputation';
import Network from '../Sections/Network';
import Hacking from '../Sections/Hacking';

function ProfileTab() {
  return (
    <Stack direction="row" spacing={ 2 }>
      <Stack direction="column" spacing={ 2 }>
        <Profile />
        <Character />
        <Wealth />
        <Hacking />
      </Stack>

      <Stack direction="column" spacing={ 2 }>
        <Network />
        <Vibe />
        <Faction />
        <GigReputation />
      </Stack>
    </Stack>
  );
}

export default ProfileTab;