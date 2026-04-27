import React from 'react';
import { Divider, Stack } from '@mui/material';
import Input from '../../fields/Input';
import Collapsible from '@/components/common/Collapsible';

function Misc() {
  return (
    <Collapsible title="Misc">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Input disabled multiline minRows={2} label="Roles" name="roles" />
        <Input disabled multiline minRows={2} label="Assets" name="assets" />
        <Input disabled multiline minRows={4} label="Reputation description" name="reputationDescription" />

        <Divider />

        <Input disabled label="MindHack" name="mindHack" />
        <Input disabled multiline minRows={3} label="MindHack enabled for" name="mindHackEnabledFor" />
      </Stack>
    </Collapsible>
  );
}

export default Misc;