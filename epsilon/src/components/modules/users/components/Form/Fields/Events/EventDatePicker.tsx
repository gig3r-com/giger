import React from 'react';
import { useField } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { alpha } from '@mui/material/styles';

type EventDatePickerProps = {
  name: string;
  label: string;
};

function EventDatePicker({ name, label }: EventDatePickerProps) {
  const [field, meta, helpers] = useField<string | ''>(name);

  const value: Dayjs | null = field.value ? dayjs(field.value) : null;

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={(newVal) => {
        helpers.setValue(newVal ? newVal.toDate().toISOString() : '');
      }}
      onClose={() => helpers.setTouched(true)}
      slotProps={{
        // TextField under the hood (PickersTextField)
        textField: {
          name,
          fullWidth: true,
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          error: meta.touched && Boolean(meta.error),
          helperText: meta.touched ? meta.error : '',
          onBlur: () => helpers.setTouched(true),
          FormHelperTextProps: {
            sx: { mt: '2px', ml: 0, lineHeight: 1.2, fontSize: '0.75rem' },
          },
          sx: (theme) => ({
            // Root of the outlined input
            '& .MuiOutlinedInput-root': {
              background:
                'linear-gradient(180deg, rgba(17,22,29,.6), rgba(21,28,36,.6))',
              // Border colors
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.35),
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.6),
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused': {
                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
              },
            },
            // Dense input text
            '& .MuiOutlinedInput-input': {
              fontSize: '0.8rem',
              paddingTop: 4,
              paddingBottom: 4,
              color: alpha(theme.palette.text.primary, 0.8),
            },
            // Label size + focused color
            '& .MuiInputLabel-root': { fontSize: '0.8rem' },
            '& .MuiInputLabel-root.Mui-focused': {
              color: theme.palette.primary.main,
            },
          }),
        },
        // Opening button (IconButton) sizing via documented slot
        openPickerButton: { size: 'small' },
      }}
    />
  );
}

export default EventDatePicker;
