import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export interface MessageBodyProps {
  index: number,
}

const INPUT_PROPS = { style: { lineHeight: 1.4 } } as const;

function MessageBody({ index }: MessageBodyProps) {
  const [text, , textHelpers] = useField(`messages[${index}].text`);
  const [hacker] = useField(`messages[${index}].hack.by`);
  const [value, setValue] = useState<string>(text.value as string ?? '');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setValue(text.value as string ?? '');
  }, [text.value]);

  const commitDebounced = useCallback(
    (v: string, shouldValidate: boolean) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        textHelpers.setValue(v, shouldValidate);
      }, 500);
    },
    [textHelpers]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
      commitDebounced(e.target.value, false);
    },
    [commitDebounced]
  );

  const onBlur = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    textHelpers.setValue(value, true);
    textHelpers.setTouched(true, true);
  }, [textHelpers, value]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const isHacked = !!hacker.value;

  return (
    <TextField fullWidth multiline
      label={ isHacked ? 'Message (impersonated)' : 'Message' }
      name={ text.name }
      value={ value }
      onChange={ onChange }
      onBlur={ onBlur }
      minRows={ 2 }
      variant="outlined"
      size="small"
      inputProps={ INPUT_PROPS }
    />
  );
}

export default memo(MessageBody);