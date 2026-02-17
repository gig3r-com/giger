import React from 'react';
import { Stack } from '@mui/material';
import Input from '../../fields/Input';
import Collapsible from '@/components/common/Collapsible';

function Vibe() {
  return (
    <Collapsible title="Vibe">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>

        <Input onlyCreate label="Vibe" name="vibe" />

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Input onlyCreate label="Vibe function" name="vibeFunction" />
          <Input onlyCreate label="Vibe engagement" name="vibeEngagement" />
        </Stack>

        <Input onlyCreate multiline minRows={6} label="Vibe opinions" name="vibeOpinions" />

      </Stack>
    </Collapsible>
  );
}

export default Vibe;