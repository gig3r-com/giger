import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Input from '../Fields/Input';
import Select from '../Fields/Select';
import {
  USER_FACTION_OPTIONS,
} from '@/components/modules/users/components/Form/enums';

function Faction() {
  return (
    <SectionCard title="Faction">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Select label="Faction" name="faction" options={ USER_FACTION_OPTIONS } />
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Input label="Faction Rank (Actual)" name="factionRankActual" />
          <Input label="Faction Rank (Public)" name="factionRankPublic" />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default Faction;