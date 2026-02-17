'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

interface DotProps {
  tooltip?: string;
  variant: 'ok' | 'warning' | 'error';
}

const DotRoot = styled('span')<{ variant: DotProps['variant'] }>(({ theme, variant }) => {
  const colors: Record<DotProps['variant'], string> = {
    ok: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
  };

  return {
    display: 'inline-block',
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: colors[variant],
    boxShadow: `0 0 6px ${colors[variant]}, 0 0 12px ${colors[variant]}55`,
    border: `1px solid ${theme.palette.grey[900]}`,
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.3)',
      boxShadow: `0 0 12px ${colors[variant]}, 0 0 24px ${colors[variant]}88`,
    },
  };
});

function Dot ({ tooltip, variant }: DotProps) {
  const dot = <DotRoot variant={variant} />;
  return tooltip ? <Tooltip title={tooltip}>{dot}</Tooltip> : dot;
}

export default Dot;