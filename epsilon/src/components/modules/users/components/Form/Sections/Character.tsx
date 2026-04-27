import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Select from '../Fields/Select';
import {
  USER_CHAR_OPTIONS,
} from '@/components/modules/users/components/Form/enums';

function Character() {
  return (
    <SectionCard title="Character">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Confrontationist vs Agreeable" name="confrontationistVsAgreeable" options={ USER_CHAR_OPTIONS } />
          <Select label="Coward vs Brave" name="cowardVsBrave" options={ USER_CHAR_OPTIONS } />
        </Stack>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Talkative vs Silent" name="talkativeVsSilent" options={ USER_CHAR_OPTIONS } />
          <Select label="Thinker vs Doer" name="thinkerVsDoer" options={ USER_CHAR_OPTIONS } />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default Character;