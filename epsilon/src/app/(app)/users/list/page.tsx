'use client'

import React from 'react';
import { Paper, Typography } from '@mui/material';

function Page() {
  return (
    <Paper sx={{ width: '100%', padding: '16px' }}>
      <Typography textAlign="center" color="text.secondary">
        Select user
      </Typography>
    </Paper>
  );
}

export default Page;