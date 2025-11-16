import React from 'react';
import type { CriminalEvent, MedicalEvent } from '@/app/api/mappers/user';
import SectionCard from '@/components/common/SectionCard';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

export interface EventsListProps {
  title: string; 
  items: (CriminalEvent | MedicalEvent)[]
}

const titleCase = (s?: string | null) =>
  (s ?? '')
    .toLowerCase()
    .replace(/(^|\s|_|-)+(\w)/g, (_, __, c) => ` ${c.toUpperCase()}`)
    .trim() || '—';

const fmt = (v?: string | number | null) =>
  v === null || v === undefined || v === '' ? '—' : String(v);

const fmtDate = (iso?: string | null) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
};

function EventsList({ title, items }: EventsListProps) {
  return (
    <SectionCard title={title}>
      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {'—'}
        </Typography>
      ) : (
        <List dense disablePadding sx={{ width: '100%' }}>
          {items.map((e) => (
            <ListItem key={e.id} sx={{ px: 0, alignItems: 'flex-start', width: '100%' }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
                primary={
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Typography variant="body2" fontWeight={600}>
                      {fmt(e.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • {titleCase(e.type as string)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • {titleCase(e.status as string)}
                    </Typography>
                  </Stack>
                }
                secondary={
                  e.eventDescription
                    ? `${e.eventDescription} — ${fmtDate(e.timeStamp)}`
                    : fmtDate(e.timeStamp)
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </SectionCard>
  );
}

export default EventsList;