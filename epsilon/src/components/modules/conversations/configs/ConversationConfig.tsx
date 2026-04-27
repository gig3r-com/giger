'use client';

import * as React from 'react';
import { Stack } from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import SelectMainHandle from '@/components/modules/conversations/configs/ConfigFields/SelectMainHandle';
import InputTitle from '@/components/modules/conversations/configs/ConfigFields/InputTitle';
import ParticipantsSelect from './ConfigFields/ParticipantsSelect';

export default function ConversationConfig() {

  return (
    <Collapsible title="Config">
      <Stack spacing={1.5}>
        <InputTitle />
        <SelectMainHandle />
        <ParticipantsSelect name="participants" />
      </Stack>
    </Collapsible>
  );
}
