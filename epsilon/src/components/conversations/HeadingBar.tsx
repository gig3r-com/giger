'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useConversations } from '@/components/modules/conversations/context';
import { useField } from 'formik';

export default function HeadingBar() {
  const { selected } = useConversations();
  const [title] = useField('title');

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2, minHeight: '44px' }}>
      <Typography variant="h4" className="glitch" data-glitch="CONVERSATION">
        CONVERSATION
      </Typography>
      { selected ?
        <Typography variant="h6" color="text.secondary" sx={{ pl: '150px', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          { title.value ?? 'untitled' }
        </Typography>
        : null
      }
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
}
