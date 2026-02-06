import React, { memo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

interface TypeSelectProps {
  value: string;
}

function TypeSelect({ value }: TypeSelectProps) {
  return (
    <Box flex={ 1 }>
      <FormControl fullWidth>
        <Select disabled value={ value } size="small" MenuProps={{ disableScrollLock: true }}>
          <MenuItem value="text">Text</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(TypeSelect);