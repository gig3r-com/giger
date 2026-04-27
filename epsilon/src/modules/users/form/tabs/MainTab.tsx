import React from 'react';
import { Stack } from '@mui/material';
import Profile from './sections/Profile';
import Faction from './sections/Faction';
import Vibe from './sections/Vibe';
import Network from './sections/Network';
import Hacking from './sections/Hacking';
import Sliders from './sections/Sliders';
import GigReputation from './sections/GigReputation';
import Misc from './sections/Misc';

function MainTab() {
  return (
    <Stack direction="row" spacing={ 2 }>

      <Stack direction="column" spacing={ 2 } sx={{ flex: 1, }}>
        <Profile />
        <Faction />
        <Vibe />
      </Stack>

      <Stack direction="column" spacing={ 2 } sx={{ flex: 1, }}>
        <Network />
        <Hacking />
        <Sliders />
        <GigReputation />
        <Misc />
      </Stack>

    </Stack>
  );
}

export default MainTab;