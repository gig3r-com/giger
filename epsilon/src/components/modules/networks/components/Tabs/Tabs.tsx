import React from 'react';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

function Tabs(props) {
  return (
    <ButtonGroup fullWidth size="small" variant="contained" sx={{ margin: '0 !important' }}>
      <Tooltip title="Impoer conversation from a JSON">
            <span>
            <Button variant="outlined" startIcon={<UploadIcon />}>
              Import JSON…
            </Button>
            </span>
      </Tooltip>
      <Tooltip title="Make a new conversation">
            <span>
            <Button variant="outlined" startIcon={<UploadIcon />}>
              Import JSON…
            </Button>
            </span>
      </Tooltip>
    </ButtonGroup>
  );
}

export default Tabs;