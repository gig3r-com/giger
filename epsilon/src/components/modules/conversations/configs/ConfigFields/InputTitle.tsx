import React, { memo, useCallback } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

function InputTitle() {
  const [field, meta, helpers] = useField<string>('title');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      helpers.setValue(e.target.value);
    },
    [helpers],
  );

  return (
    <TextField
      { ...field }
      size="small"
      fullWidth
      label="Conversation title"
      value={ field.value ?? '' }
      onChange={ onChange }
      error={ Boolean(meta.touched && meta.error) }
      helperText={ meta.touched && meta.error ? meta.error : ' ' }
    />
  );
}

export default memo(InputTitle);
