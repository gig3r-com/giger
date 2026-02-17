import React from 'react';
import { Box } from '@mui/material';

function EmptyTab() {
  return (
    <Box
      sx={(t) => ({
        p: 3,
        borderRadius: 2,
        border: `1px dashed ${t.palette.divider}`,
        color: 'text.secondary',
        textAlign: 'center',
        width: '100%',
      })}
    >
      Select a user to view details.
    </Box>
  );
}

export default EmptyTab;