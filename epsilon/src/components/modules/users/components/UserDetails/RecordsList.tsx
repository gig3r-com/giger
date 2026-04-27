import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export interface RecordsListProps {
  title: string;
  items: { id: string; title: string; description: string }[];
}

const fmt = (v?: string | number | null) =>
  v === null || v === undefined || v === '' ? '—' : String(v);

function RecordsList({ title, items }: RecordsListProps) {
  return (
    <SectionCard title={title}>
      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {'—'}
        </Typography>
      ) : (
        <List dense disablePadding sx={{ width: '100%' }}>
          {items.map((r) => (
            <ListItem key={r.id} sx={{ px: 0, alignItems: 'flex-start', width: '100%' }}>
              <ListItemText
                primary={<Typography variant="body2" fontWeight={600}>{fmt(r.title)}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{fmt(r.description)}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      )}
    </SectionCard>
  );
}

export default RecordsList;