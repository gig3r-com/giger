import React, { memo } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ControlType } from './';

function Control({ tooltip, icon: Icon, disabled, color, onClick }: ControlType) {
  return (
    <Tooltip title={ tooltip }>
      <span>
        <IconButton size="small" disabled={ disabled } onClick={ onClick as () => void }>
          <Icon fontSize="small" color={ color } />
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default memo(Control);