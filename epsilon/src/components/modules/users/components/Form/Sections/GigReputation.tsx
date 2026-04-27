import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Select from '../Fields/Select';
import {
  USER_GIG_REP_OPTIONS
} from '@/components/modules/users/components/Form/enums';

function GigReputation() {
  return (
    <SectionCard title="Gig reputation">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Fixer" name="gigReputation.fixer" options={ USER_GIG_REP_OPTIONS } />
          <Select label="Hacking" name="gigReputation.hacking" options={ USER_GIG_REP_OPTIONS } />
        </Stack>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Wellbeing" name="gigReputation.wellbeing" options={ USER_GIG_REP_OPTIONS } />
          <Select label="Killer" name="gigReputation.killer" options={ USER_GIG_REP_OPTIONS } />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default GigReputation;