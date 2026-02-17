import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import StatLine from '@/components/common/StatLine';
import { Grid, Typography } from '@mui/material';

export interface GigReputationBlockProps {
  fixer?: number;
  hacking?: number;
  wellbeing?: number;
  killer?: number;
  max?: number;
}

function GigReputationBlock({ fixer, hacking, wellbeing, killer, max = 5 }: GigReputationBlockProps) {
  return (
    <SectionCard title="Gig Reputation" right={<Typography variant="caption">0–{max}</Typography>}>
      <Grid container spacing={1.25} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <StatLine label="Fixer" value={{ stat: fixer ?? 0 }} max={max} />
        </Grid>
        <Grid item xs={12}>
          <StatLine label="Hacking" value={{ stat: hacking ?? 0 }} max={max} />
        </Grid>
        <Grid item xs={12}>
          <StatLine label="Wellbeing" value={{ stat: wellbeing ?? 0 }} max={max} />
        </Grid>
        <Grid item xs={12}>
          <StatLine label="Killer" value={{ stat: killer ?? 0 }} max={max} />
        </Grid>
      </Grid>
    </SectionCard>
  );
}

export default GigReputationBlock;