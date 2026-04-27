import React from 'react';
import { Stack } from '@mui/material';
import Input from '../../fields/Input';
import Collapsible from '@/components/common/Collapsible';
import Select from '@/modules/users/form/fields/Select';
import { USER_HACKING_LVL_OPTIONS } from '@/modules/users/form/enums';

function Hacking() {
  return (
    <Collapsible title="Vibe">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Input label="Hacker name" name="hackerName" flex={ 2 } />
          <Select label="Hacking skills" name="hackingSkills" options={ USER_HACKING_LVL_OPTIONS } flex={ 1 } />
        </Stack>

        <Input onlyCreate disabled multiline minRows={3} label="Exploits" name="exploits" />

      </Stack>
    </Collapsible>
  );
}

export default Hacking;