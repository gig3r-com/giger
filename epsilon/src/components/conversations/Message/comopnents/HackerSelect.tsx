"use client";

import React, { memo, useMemo } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

export interface HackingSelectProps {
  value: string,
  options: string[],
  onChange: (e: SelectChangeEvent<string>) => void;
}

function HackingSelect({ value, options, onChange, }: HackingSelectProps) {
  const parsedOptions = useMemo(() => {
    if (options?.length === 0) return <MenuItem value="" disabled>No hackers</MenuItem>;
    return options.map(participant => (
      <MenuItem key={ participant } value={ participant }>{ participant }</MenuItem>
    ))
  }, [options]);

  return (
    <Box flex={ 2 }>
      <FormControl fullWidth>
        <InputLabel>Hacker</InputLabel>
        <Select value={ value } onChange={ onChange } size="small" label="Hacker" MenuProps={{ disableScrollLock: true }}>
          { parsedOptions }
        </Select>
      </FormControl>
    </Box>
  );
}

export default memo(HackingSelect);