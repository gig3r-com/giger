import React from 'react';
import { Stack } from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import Select from '@/modules/users/form/fields/Select';
import { USER_GIG_REP_OPTIONS } from '@/modules/users/form/enums';

function GigReputation() {
  return (
    <Collapsible title="Giger reputation">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Fixer" name="gigReputationFixer" options={ USER_GIG_REP_OPTIONS } />
          <Select label="Hacking" name="gigReputationHacking" options={ USER_GIG_REP_OPTIONS } />
        </Stack>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Killer" name="gigReputationKiller" options={ USER_GIG_REP_OPTIONS } />
          <Select label="Wellbeing" name="gigReputationWellbeing" options={ USER_GIG_REP_OPTIONS } />
        </Stack>

      </Stack>
    </Collapsible>
  );
}

export default GigReputation;