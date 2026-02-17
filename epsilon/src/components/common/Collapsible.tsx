'use client';
import * as React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Collapsible({
                                      title,
                                      defaultExpanded = true,
                                      secondary = false,
                                      children,
                                    }: {
  title: React.ReactNode;
  defaultExpanded?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, minWidth: 'calc(100% - 16px)' }} fontWeight>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
