import React from 'react';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { EventItemWrap, EventBody, Dot, FadeMask } from './styles';
import type { CriminalEvent } from '@/app/sector/police/_lib/types';

const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

/* ---------- Config ---------- */

const COLLAPSED_MAX_PX = 160; // tweak as desired for the "preview" height

/* ---------- Helpers ---------- */

function eventTypeColor(
  t: string
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' {
  switch (t) {
    case 'WANTED':
      return 'secondary';
    case 'SUSPECT':
      return 'error';
    case 'PUNISHMENT':
      return 'warning';
    default:
      return 'default';
  }
}

function statusColor(s: string): 'default' | 'primary' {
  return s === 'CURRENT' ? 'primary' : 'default';
}

function statusVariant(s: string): 'filled' | 'outlined' {
  return s === 'CURRENT' ? 'filled' : 'outlined';
}

/* ---------- Component ---------- */

export default function EventItem({
                                    ev,
                                    onViewed,
                                  }: {
  ev: CriminalEvent;
  onViewed: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [hasViewed, setHasViewed] = React.useState(false);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  // Call onViewed only once (when first expanded)
  React.useEffect(() => {
    if (open && !hasViewed) {
      setHasViewed(true);
      onViewed();
    }
  }, [open, hasViewed, onViewed]);

  // Measure overflow: show FadeMask only when collapsed AND content overflows
  const measure = React.useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;

    // Temporarily force collapsed max-height for accurate overflow detection
    const prevMaxHeight = el.style.maxHeight;
    el.style.maxHeight = `${COLLAPSED_MAX_PX}px`;

    // If scrollHeight > clientHeight, there's overflow in collapsed state
    const overflowing = el.scrollHeight > el.clientHeight;
    setIsOverflowing(overflowing);

    // Restore style according to current "open" state
    el.style.maxHeight = open ? 'none' : `${COLLAPSED_MAX_PX}px`;

    // Ensure layout settles
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    // Restore any prior inline style (not strictly needed since we set above)
    if (!open) el.style.maxHeight = `${COLLAPSED_MAX_PX}px`;
  }, [open]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure, ev.eventDescription]);

  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el || !('ResizeObserver' in window)) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const canExpand = isOverflowing; // if no overflow, hide button & mask
  const showMask = !open && isOverflowing;

  const toggle = () => setOpen((o) => !o);

  const bodyId = React.useId();

  return (
    <EventItemWrap>
      <Dot />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ pl: 0.5 }}
      >
        <Chip
          size="small"
          label={ev.type}
          color={eventTypeColor(ev.type)}
          variant="outlined"
        />

        <Typography fontWeight={700}>{ev.name}</Typography>

        <Chip
          size="small"
          label={ev.status}
          color={statusColor(ev.status)}
          variant={statusVariant(ev.status)}
        />

        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
          {fmt.format(new Date(ev.timeStamp))}
        </Typography>
      </Stack>

      <EventBody
        ref={bodyRef}
        id={bodyId}
        style={{ maxHeight: open ? 'none' : `${COLLAPSED_MAX_PX}px` }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>
          {ev.eventDescription}
        </Typography>

        {showMask && <FadeMask aria-hidden />}
      </EventBody>

      <Box sx={{ pl: 0.5, mt: 0.5 }}>
        {canExpand && (
          <Button
            size="small"
            variant="text"
            onClick={toggle}
            aria-expanded={open ? 'true' : 'false'}
            aria-controls={bodyId}
          >
            {open ? 'Collapse' : 'Expand'}
          </Button>
        )}
      </Box>
    </EventItemWrap>
  );
}
