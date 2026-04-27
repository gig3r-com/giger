import React, { memo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

interface HackingSelectProps {
  value: string;
}

function HackingSelect({ value }: HackingSelectProps) {
  return (
    <Box flex={ 1 }>
      <FormControl fullWidth>
        <Select disabled value={ value } size="small" MenuProps={{ disableScrollLock: true }}>
          <MenuItem value="0">Level 0</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(HackingSelect);