import React, { useMemo } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';

interface SelectProps {
  name: string;
  label: string;
  options: string[];
  mappedOptions?: Element[];
  disabled?: boolean;
  value?: string;
}

function Select({ name, label, options, mappedOptions, disabled, value }: SelectProps) {
  const [field, meta, helpers] = useField(name);

  const items = useMemo(() => {
    if (mappedOptions) return mappedOptions;
    return options.map((opt) => (
      <MenuItem key={ opt } value={ opt }>
        { opt }
      </MenuItem>));
  }, [options, mappedOptions]);

  const v = useMemo(() => {
    if (value === undefined) return field?.value ?? '';
    return value;
  }, [field, value]);

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)} size='small'>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        { ...field }
        disabled={ disabled }
        value={ v }
        label={ label }
        onChange={ (e) => helpers.setValue(e.target.value) }
      >
        { items }
      </MuiSelect>
      <FormHelperText>{ meta.touched ? meta.error : `` }</FormHelperText>
    </FormControl>
  );
}

export default Select;
