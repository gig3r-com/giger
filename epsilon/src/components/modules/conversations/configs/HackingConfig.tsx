'use client';

import * as React from 'react';
import {
  Stack
} from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import InputHacker from '@/components/modules/conversations/configs/HackingConfigFields/InputHacker';

export default function HackingConfig() {
  return (
    <Collapsible title="Hacking">
        <Stack spacing={1.5}>
          <InputHacker />
        </Stack>
    </Collapsible>
  );
}
