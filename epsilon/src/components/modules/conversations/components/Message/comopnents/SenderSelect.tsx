import React, { memo, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface SenderSelectProps {
  index: number;
}

interface SubSelectsProps {
  value: string;
  options: string[];
  onChange: (e: SelectChangeEvent<string>) => void;
}

function SenderSelect({ index, }: SenderSelectProps) {
  const [sender, , senderHelpers] = useField(`messages[${index}].sender`);
  const [participants] = useField(`participants`);
  const onChange = useCallback((e) => {
    senderHelpers.setValue(e.target.value);
  }, [senderHelpers]);

  return useMemo(() => {
    const value = sender.value as string ?? '';
    const options = participants.value as string[] ?? [];
    if (options.length === 2) return <TwoPersonSelect value={ value } onChange={ onChange } options={ options } />;
    return <FullSelect value={ value } onChange={ onChange } options={ options } />;
  }, [participants, sender, onChange])
}

function TwoPersonSelect({ options, value, onChange, }: SubSelectsProps) {
  return (
    <Box flex={ 2 }>
      <ToggleButtonGroup exclusive value={ value } onChange={ onChange } size="small" fullWidth>
        <ToggleButton value={ options[0] } sx={{ flex: 1 }}>
          { options[0] }
        </ToggleButton>
        <ToggleButton value={ options[1] } sx={{ flex: 1 }}>
          { options[1] }
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

function FullSelect({ options, value, onChange, }: SubSelectsProps) {
  const parsedOptions = useMemo(() => {
    if (options?.length === 0) return <MenuItem value="" disabled>No participants</MenuItem>;
    return options.map(participant => (
      <MenuItem key={ participant } value={ participant }>{ participant }</MenuItem>
    ))
  }, [options]);

  return (
    <Box flex={ 2 }>
      <FormControl fullWidth>
        <InputLabel>Sender</InputLabel>
        <Select value={ value } onChange={ onChange } size="small" label="Sender" MenuProps={{ disableScrollLock: true }}>
          { parsedOptions }
        </Select>
      </FormControl>
    </Box>
  );
}

export default memo(SenderSelect);