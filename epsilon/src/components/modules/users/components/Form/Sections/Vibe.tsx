import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Input from '../Fields/Input';
import Select from '../Fields/Select';
import {
  USER_VIBE_ENGAGEMENT_OPTIONS,
  USER_VIBE_OPTIONS,
} from '@/components/modules/users/components/Form/enums';

function Vibe() {
  return (
    <SectionCard title="Vibe">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Select label="Vibe" name="vibe" options={ USER_VIBE_OPTIONS } />
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Input label="Vibe Function" name="vibeFunction" />
          <Select label="Vibe Engagement" name="vibeEngagement" options={ USER_VIBE_ENGAGEMENT_OPTIONS } />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default Vibe;