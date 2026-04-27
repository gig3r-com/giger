'use client';
import React, { memo, useMemo } from 'react';
import { Stack, } from '@mui/material';
import Control from './Control';
import { ControlType } from './';

export interface ControlsProps {
  index: number;
  controls: ControlType[];
}

function Controls({ index, controls, }: ControlsProps) {
  return useMemo(() => {
    if (!controls?.length) return;
    return (
      <Stack spacing={0.5} sx={{ pt: 0.5, width: 40, alignItems: 'center', flexShrink: 0 }}>
        { controls.map(control => <Control key={ control.tooltip } index={ index } { ...control } />) }
      </Stack>
    );
  }, [index, controls]);
}

export default memo(Controls);