import React from 'react';
import { Stack } from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import Select from '@/modules/users/form/fields/Select';
import { USER_CHAR_OPTIONS } from '@/modules/users/form/enums';

function Sliders() {
  return (
    <Collapsible title="Sliders">
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
    </Collapsible>
  );
}

export default Sliders;