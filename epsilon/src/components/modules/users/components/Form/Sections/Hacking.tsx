import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Select from '../Fields/Select';
import {
  USER_SKILL_OPTIONS,
} from '@/components/modules/users/components/Form/enums';

function Hacking() {
  return (
    <SectionCard title="Hacking">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Hacking skill" name="hackingSkills" options={ USER_SKILL_OPTIONS } />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default Hacking;