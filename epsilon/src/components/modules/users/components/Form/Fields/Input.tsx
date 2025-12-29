import React from 'react';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';

interface InputProps {
  name: string;
  label: string;
  multiline?: boolean;
  minRows?: number;
}

function Input({ name, label, multiline, minRows }: InputProps) {
  const [field, meta] = useField(name);

  return (
    <TextField
      { ...field }
      label={ label }
      fullWidth
      size='small'
      margin='dense'
      error={ meta.touched && Boolean(meta.error) }
      helperText= {meta.touched ? meta.error : `` }
      FormHelperTextProps={{
        sx: { marginTop: '2px', marginLeft: 0 },
      }}
      multiline={ multiline }
      minRows={ minRows }
    />
  );
}

export default Input;
