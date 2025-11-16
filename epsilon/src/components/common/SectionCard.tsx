import * as React from 'react';
import { alpha, Divider, Paper, Stack, Typography, Box } from '@mui/material';

export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  sx?: {};
}

const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
  ({ title, children, right, sx = {}, ...rest }, ref) => {
    return (
      <Paper
        ref={ref}
        variant="outlined"
        sx={{ pb: 2, borderRadius: 1, width: '100%', minWidth: '360px', ...sx }}
        { ...rest }
      >
        <Stack sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between"
                 sx={ t => ({
                   width: '100%',
                   background: alpha(t.palette.primary.main, 0.15),
                   p: 2,
                   borderRadius: 1,
                 }) }
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {right}
          </Stack>
          <Divider sx={{ opacity: 0.5 }} />
          <Stack spacing={1.5} sx={{ px: 2, pt: 2 }}>
            {children}
          </Stack>
        </Stack>
      </Paper>
    );
  }
);

SectionCard.displayName = 'SectionCard';
export default SectionCard;
