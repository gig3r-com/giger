import React, { memo, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { Typography, Stack, } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePickerProps, DateTimePicker } from '@mui/x-date-pickers';

export interface DatePickerProps {
  value: Dayjs,
  onChange: () => void,
}

function DatePicker({ index }: DatePickerProps) {
  const anchorRef = React.useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [date, , dateHelpers] = useField(`messages[${index}].date`);
  const value = useMemo(() => date.value ? dayjs(date.value as string) : null, [date]);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    dateHelpers.setTouched(true, true);
  }, [dateHelpers]);
  const onChange = useCallback((newValue) => {
    dateHelpers.setValue(newValue);
  }, [dateHelpers]);

  const input = value ?
    <Typography ref={anchorRef} variant="caption" color="text.secondary" sx={{ opacity: 0.9, cursor: 'pointer' }} onClick={ handleOpen }>
      { value.format('D MMM, YYYY • HH:mm:ss') }
    </Typography>
    :
    <Typography ref={anchorRef} variant="caption" color="error" sx={{ opacity: 0.9, cursor: 'pointer', fontWeight: 900 }} onClick={ handleOpen }>
      - ---, ---- • --:--:--
    </Typography>

  return (
    <Stack direction="row" spacing={ 1 } alignItems="center">
      { input }
      <DateTimePicker
        value={ value }
        onChange={ onChange }
        open={open}
        onClose={ handleClose }
        slotProps={{
          popper: {
            anchorEl: anchorRef.current,
          },
          textField: { sx: { display: "none" } }
        }}
      />
    </Stack>
  );
}

export default memo(DatePicker);