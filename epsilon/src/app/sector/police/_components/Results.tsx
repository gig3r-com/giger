import React from 'react';
import {
  Paper,
  Typography,
  Chip,
  Stack,
  Box,
  Card,
  CardActionArea,
  Divider,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { SearchBuckets, Subject } from '../_lib/types';
import { ResultsWrap } from './styles';

/** ——— Helpers ——— */

const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

const typeColor = (
  t?: string
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' => {
  switch ((t ?? '').toLowerCase()) {
    case 'officer':
    case 'agent':
      return 'primary';
    case 'vip':
      return 'secondary';
    case 'suspect':
      return 'warning';
    case 'wanted':
      return 'error';
    case 'civilian':
      return 'default';
    default:
      return 'info';
  }
};

const threatLabel = (n?: number) => {
  const v = Number(n ?? 0);
  if (v >= 80) return 'High';
  if (v >= 40) return 'Medium';
  return 'Low';
};

const threatColor = (n?: number): 'default' | 'success' | 'warning' | 'error' => {
  const v = Number(n ?? 0);
  if (v >= 80) return 'error';
  if (v >= 40) return 'warning';
  return 'success';
};

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(text: string | undefined, q: string, maxLen = 140) {
  if (!text) return '';
  const safe = escapeHtml(text);
  if (!q) return safe.length > maxLen ? `${safe.slice(0, maxLen)}…` : safe;

  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  let marked = safe.replace(re, '<mark>$1</mark>');

  const firstIdx = marked?.toLowerCase().indexOf('<mark>');
  if (firstIdx > maxLen) {
    const start = Math.max(0, firstIdx - Math.floor(maxLen / 2));
    marked = `…${marked.slice(start)}`;
  }
  if (marked.length > maxLen + 40) {
    marked = `${marked.slice(0, maxLen)}…`;
  }
  return marked;
}

/** ——— Types ——— */

// NOTE: removed 'type' bucket entirely
type SearchKind = 'identity' | 'eventTitle' | 'eventDesc' | 'faction';

type IdentityItem = {
  kind: 'identity';
  subject: Subject;
  field: keyof Subject & string; // e.g. 'name', 'surname', 'handle'
};

type EventItem = {
  kind: 'eventTitle' | 'eventDesc';
  subject: Subject;
  event: {
    name: string;
    eventDescription: string;
    type: string;
    status: string;
    timeStamp: string | number | Date;
  };
};

type FactionGroup = {
  kind: 'faction';
  faction: string;      // faction name
  subjects: Subject[];  // users in this faction
};

type SearchItem = IdentityItem | EventItem;

type Buckets = {
  identity: IdentityItem[];
  eventTitle: EventItem[];
  eventDesc: EventItem[];
  faction: FactionGroup[]; // new shape
};

interface ResultsProps {
  q: string;
  buckets: SearchBuckets | Buckets;
  total: number;
  officerClearance: 1 | 2 | 3;
  onOpen: (s: Subject) => void;
}

/** ——— Main ——— */

export default function Results({
                                  q,
                                  buckets,
                                  total,
                                  officerClearance,
                                  onOpen,
                                }: ResultsProps) {
  const order: SearchKind[] = ['identity', 'eventTitle', 'eventDesc', 'faction'];
  const titles: Record<SearchKind, string> = {
    identity: 'Identity Matches',
    eventTitle: 'Criminal Record Titles',
    eventDesc: 'Criminal Record Descriptions',
    faction: 'Factions',
  };

  const b = buckets as Buckets;

  return (
    <ResultsWrap>
      <Paper sx={{ p: 1, borderStyle: 'solid', borderWidth: 1 }}>
        <Typography variant="caption" fontFamily="ui-monospace, monospace">
          {total} hit{total === 1 ? '' : 's'} found
        </Typography>
      </Paper>

      <Stack spacing={2} sx={{ mt: 1 }}>
        {order.map((cat) => {
          const list = b[cat] ?? [];
          if (!list.length) return null;

          if (cat === 'faction') {
            // Render one card per faction, with clickable users inside
            return (
              <Box key={cat}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 1, mt: 2 }}>
                  <Typography variant="h5">{titles[cat]}</Typography>
                  <Chip
                    size="small"
                    label={
                      // total users across factions
                      (list as FactionGroup[]).reduce((sum, g) => sum + g.subjects.length, 0)
                    }
                    sx={{ ml: 2 }}
                  />
                </Stack>

                <Stack spacing={1.25}>
                  {(list as FactionGroup[]).map((group, idx) => (
                    <FactionGroupCard
                      key={`${group.faction}-${idx}`}
                      group={group}
                      q={q}
                      officerClearance={officerClearance}
                      onOpen={onOpen}
                    />
                  ))}
                </Stack>
              </Box>
            );
          }

          // Default categories (identity/eventTitle/eventDesc) remain card-per-result
          return (
            <SingleCategory
              key={cat}
              q={q}
              title={titles[cat]}
              list={list as SearchItem[]}
              officerClearance={officerClearance}
              onOpen={onOpen}
            />
          );
        })}
      </Stack>
    </ResultsWrap>
  );
}

/** ——— Category (non-faction) ——— */

function SingleCategory({
                          list,
                          title,
                          q,
                          officerClearance,
                          onOpen,
                        }: {
  list: SearchItem[];
  title: string;
  q: string;
  officerClearance: 1 | 2 | 3;
  onOpen: (s: Subject) => void;
}) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 1, mt: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <Chip size="small" label={list.length} sx={{ ml: 2 }} />
      </Stack>

      <Stack spacing={1.25}>
        {list.map((item, idx) => (
          <ResponseCard
            key={item.subject?.id ?? `${item.subject?.handle ?? 'row'}-${idx}`}
            item={item}
            q={q}
            officerClearance={officerClearance}
            onOpen={onOpen}
          />
        ))}
      </Stack>
    </Box>
  );
}

/** ——— Faction Group Card ——— */

function FactionGroupCard({
                            group,
                            q,
                            officerClearance,
                            onOpen,
                          }: {
  group: FactionGroup;
  q: string;
  officerClearance: 1 | 2 | 3;
  onOpen: (s: Subject) => void;
}) {
  const factionLabel = highlight(group.faction, q);

  return (
    <Card variant="outlined">
      <Box sx={{ p: 1.25 }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Typography
            variant="subtitle2"
            component="div"
            dangerouslySetInnerHTML={{ __html: factionLabel }}
          />
          <Chip size="small" label={`${group.subjects.length}`} sx={{ ml: 2 }} />
        </Stack>

        <Divider sx={{ mb: 1 }} />

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {group.subjects.map((s, i) => {
            const locked = officerClearance < (s.clearanceRequired as number);

            const chipEl = (
              <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="nowrap">
                <Chip size="small" label={s.typePublic} color={typeColor(String(s.typePublic))} variant="outlined" />
                {s.highSecurity && <Chip size="small" label="VIP" color="secondary" variant="filled" />}
                <Chip
                  size="small"
                  label={`L${s.highSecurity ? 2 : 1}`}
                  variant="outlined"
                />
              </Stack>
            );

            const content = (
              <Stack direction="flex" justifyContent="space-between" sx={{ p: 2 }}>
                <Box>
                  <Typography fontWeight={700} noWrap>
                    {s.name} {s.surname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    @{s.handle}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>{chipEl}</Box>
              </Stack>
            );

            return (
              <Card
                key={s.id ?? `${s.handle}-${i}`}
                variant="outlined"
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 8px)' },
                  opacity: locked ? 0.7 : 1,
                }}
              >
                <Tooltip title={locked ? `Clearance L${s.clearanceRequired} required` : ''}>
                  <CardActionArea onClick={() => !locked && onOpen(s)} disableRipple={locked}>
                    {content}
                  </CardActionArea>
                </Tooltip>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Card>
  );
}

/** ——— Single Result Card (identity/event*) ——— */

function ResponseCard({
                        item,
                        q,
                        officerClearance,
                        onOpen,
                      }: {
  item: SearchItem;
  q: string;
  officerClearance: 1 | 2 | 3;
  onOpen: (s: Subject) => void;
}) {
  const s = item.subject;
  const locked = officerClearance < (s.clearanceRequired as number);

  const snippet = (() => {
    if (item.kind === 'identity') {
      const val = (s as any)[item.field] as string;
      return highlight(val, q);
    }
    // eventTitle / eventDesc
    const text = item.kind === 'eventTitle' ? item.event.name : item.event.eventDescription;
    return highlight(text, q, 220);
  })();

  const handleClick = () => {
    if (!locked) onOpen(s);
  };

  return (
    <Card variant="outlined" sx={{ opacity: locked ? 0.7 : 1 }}>
      <CardActionArea onClick={handleClick} disableRipple={locked}>
        <Box sx={{ p: 1.25 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={800} noWrap>
                {s.name} {s.surname}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                @{s.handle}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" justifyContent="flex-end">
              <Chip size="small" label={s.typePublic} color={typeColor(String(s.typePublic))} variant="outlined" />
              {s.highSecurity && <Chip size="small" label="VIP" color="secondary" variant="filled" />}
              <Chip
                size="small"
                label={`Threat ${threatLabel(Number((s as any).combatSkill))}`}
                color={threatColor(Number((s as any).combatSkill))}
              />
              <Chip size="small" label={`L${s.clearanceRequired}`} variant="outlined" />
            </Stack>
          </Stack>

          {'event' in item && item.event && (
            <>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  label={`${item.event.type} • ${item.event.status}`}
                  color={
                    item.event.type === 'WANTED'
                      ? 'secondary'
                      : item.event.type === 'SUSPECT'
                        ? 'error'
                        : item.event.type === 'PUNISHMENT'
                          ? 'warning'
                          : 'default'
                  }
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  {fmt.format(new Date(item.event.timeStamp))}
                </Typography>
              </Stack>
            </>
          )}

          {snippet && (
            <Typography
              variant="body2"
              sx={{ mt: 1 }}
              component="div"
              dangerouslySetInnerHTML={{ __html: snippet }}
            />
          )}

          {locked && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                mt: 1,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: 'action.hover',
                color: 'text.secondary',
              }}
            >
              <LockIcon fontSize="small" />
              <Typography variant="caption">Clearance L{s.clearanceRequired} required</Typography>
            </Stack>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}
