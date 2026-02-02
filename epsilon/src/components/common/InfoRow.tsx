import React from 'react';
import { Stack, Typography, styled, alpha } from '@mui/material';

export interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  highlight?: boolean;
}

const RowContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'highlight',
})<{ highlight?: boolean }>(({ theme, highlight }) => ({
  minHeight: 24,
  width: '100%',
  borderRadius: '8px',
  padding: theme.spacing(0.25, 0.75),
  ...(highlight && {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  }),
}));

function InfoRow({ label, value, highlight = false }: InfoRowProps) {
  return (
    <RowContainer
      direction="row"
      alignItems="baseline"
      spacing={1}
      highlight={highlight}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ width: 180 }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ flex: 1 }}
      >
        {value ?? '—'}
      </Typography>
    </RowContainer>
  );
}

export default InfoRow;
