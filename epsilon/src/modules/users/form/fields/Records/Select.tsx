import React from 'react';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface SelectProps {
  name: string;
  label: string;
  options?: string[];
  mappedOptions?: React.ReactElement[];
  disabled?: boolean;
}

function Select({ name, label, options, mappedOptions, disabled }: SelectProps) {
  const [field, meta] = useField<string>(name);

  const items =
    mappedOptions ??
    (options ?? []).map((opt) => (
      <MenuItem key={opt} value={opt}>
        {opt}
      </MenuItem>
    ));

  return (
    <TextField
      {...field}
      label={label}
      fullWidth
      size="small"
      margin="dense"
      select
      SelectProps={{ displayEmpty: true }}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched ? meta.error : ''}
      FormHelperTextProps={{
        sx: { marginTop: '2px', marginLeft: 0 }, // matches NEW Input
      }}
      disabled={disabled}
    >
      {items}
    </TextField>
  );
}

export default Select;
