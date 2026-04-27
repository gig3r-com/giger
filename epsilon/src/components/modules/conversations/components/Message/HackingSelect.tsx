"use client";

import React, { memo } from 'react';
import { Box, Select, MenuItem, Button, } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import PestControlIcon from '@mui/icons-material/PestControl';

export interface HackingSelectProps {
  isHacked: boolean;
  changeIsHacked: (value: boolean) => void;
  hackers: string[];
  hacker: string;
  changeHacker: (value: string) => void;
}

function HackingSelect({ isHacked, changeIsHacked, hackers, hacker, changeHacker, }: HackingSelectProps) {
  const toggle = () => changeIsHacked(!isHacked);

  const button = isHacked ? (
    <Button
      sx={{ borderRight: 'none', borderRadius: '4px 0 0 4px' }}
      variant="outlined"
      onClick={ toggle }
      color="error"
    >
      <PestControlIcon color="error" />
    </Button>
  ) : (
    <Button
      sx={{ borderRight: 'none', borderRadius: '4px 0 0 4px' }}
      variant="outlined"
      onClick={ toggle }
      color="success"
    >
      <SecurityIcon color="success" />
    </Button>
  );

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      { button }
      <Select
        size="small"
        color="error"
        variant="outlined"
        value={hacker}
        disabled={ !isHacked }
        onChange={(e) => changeHacker(e.target.value as string)}
        displayEmpty
        renderValue={(val) => (isHacked ? val ? String(val) : 'Select hacker' : 'Secure')}
      >
        { hackers.map((name) => (
          <MenuItem key={ name } value={ name }>
            { name }
          </MenuItem>
        )) }
      </Select>
    </Box>
  );
}

export default memo(HackingSelect);