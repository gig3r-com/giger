import React from 'react';
import Collapsible from '@/components/common/Collapsible';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

function FormControl(props) {
  const { setFieldValue, isSubmitting, submitForm } = useFormikContext();

  return (
    <Collapsible title="Form control">
      <Button type="submit" form='profile-form'>Submit form</Button>
    </Collapsible>
  );
}

export default FormControl;