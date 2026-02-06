'use client'

import React from 'react';
import Collapsible from '@/components/common/Collapsible';
import { Button, ButtonGroup, Divider, Stack } from '@mui/material';
import { useFormikContext } from 'formik';

function FormController() {
  const { submitForm } = useFormikContext();

  return (
    <Collapsible title="Form controls" defaultExpanded>
      <Stack display="flex" direction="column">
        <Button type="submit" variant="outlined" color="primary">Submit</Button>
        <Divider sx={{ my: 2 }}/>
        <ButtonGroup fullWidth>
          <Button>Reset</Button>
          <Button>Reset</Button>
        </ButtonGroup>
      </Stack>
    </Collapsible>
  );
}

export default FormController;