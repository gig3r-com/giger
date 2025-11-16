'use client';

import * as React from 'react';
import {
  Stack, Typography, Chip, Box, TextField, IconButton, Tooltip,
  Switch, FormControlLabel, Autocomplete, Divider, Button, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Collapsible from '@/components/common/Collapsible';
import SecurityIcon from '@mui/icons-material/Security';

import { useConversations } from '@/contexts/conversations';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import { useTags } from '@/contexts/tags';

const AddParticipantSchema = Yup.object({
  handle: Yup.string().trim().min(1, 'Required').required('Required'),
  color: Yup.string().matches(/^#([0-9A-Fa-f]{6})$/, 'Hex color like #89a3ff').required('Required'),
});

export default function ConversationConfig() {
  const { showTimestamps, setShowTimestamps, uiMainHandle, setUiMainHandle } = useConversations();
  const form = useConversationForm();
  const { byName } = useTags();

  const participants = form.values.participants ?? [];
  const colors = form.values.participantColors ?? {};
  const tags = form.values.tags ?? [];

  // Participant quick “search” (visual only; you can hook it to filter list if you prefer)
  const search = useFormik({ initialValues: { q: '' }, onSubmit: () => {} });

  const addForm = useFormik<{ handle: string; color: string }>({
    initialValues: { handle: '', color: '#89a3ff' },
    validationSchema: AddParticipantSchema,
    onSubmit: (values, helpers) => {
      const h = values.handle.trim();
      if (!h) return;
      if (!participants.includes(h)) form.setFieldValue('participants', [...participants, h], true);
      form.setFieldValue('participantColors', { ...colors, [h]: values.color }, true);
      helpers.resetForm();
    },
  });

  const removeParticipant = (h: string) => {
    if (!participants.includes(h)) return;
    form.setFieldValue('participants', participants.filter((x) => x !== h), true);
    const next = { ...colors }; delete next[h];
    form.setFieldValue('participantColors', next, true);
    if (uiMainHandle === h) setUiMainHandle(null);
  };

  const globalTagOptions = React.useMemo(() => Object.keys(byName).sort(), [byName]);

  return (
    <Collapsible title="Config">
      <Stack spacing={1.5}>
        <TextField
          size="small"
          label="Conversation title"
          value={form.values.title ?? ''}
          onChange={(e) => form.setFieldValue('title', e.target.value)}
        />

        <FormControlLabel
          control={<Switch checked={showTimestamps} onChange={(e) => setShowTimestamps(e.target.checked)} />}
          label="Show timestamps"
        />

        <Autocomplete
          size="small"
          options={participants}
          value={uiMainHandle ?? null}
          onChange={(_, v) => setUiMainHandle(v ?? null)}
          renderInput={(params) => <TextField {...params} label="Main participant (UI only)" />}
        />

        {/* Tags with suggestions from Global Tags */}
        <Autocomplete
          multiple
          freeSolo
          size="small"
          options={globalTagOptions}
          value={tags}
          onChange={(_, v) => form.setFieldValue('tags', v)}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} key={option} />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Tags" placeholder="Add tag (suggested from global)" />}
        />

        <Divider sx={{ opacity: 0.5 }} />

        {/* Participants header with “search” styling */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 'auto' }}>Participants</Typography>
          <form onSubmit={search.handleSubmit}>
            <TextField
              size="small"
              name="q"
              value={search.values.q}
              onChange={search.handleChange}
              placeholder="Quick search"
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
              sx={{ minWidth: 180 }}
            />
          </form>
        </Stack>

        {/* Participants list */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {participants.length === 0 && <Typography color="text.secondary">No participants yet.</Typography>}
          {participants
            .filter((h) => !search.values.q || h.toLowerCase().includes(search.values.q.toLowerCase()))
            .map((h) => {
              const color = colors[h] ?? '#89a3ff';
              return (
                <Box key={h} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={h} onDelete={() => removeParticipant(h)} variant="outlined" sx={{ borderColor: color }} />
                  <input
                    aria-label={`Color for ${h}`} type="color" value={color}
                    onChange={(e) => form.setFieldValue('participantColors', { ...colors, [h]: e.target.value }, true)}
                    style={{ width: 28, height: 28, border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                  />
                </Box>
              );
            })}
        </Box>

        {/* Add participant row visually harmonized with search */}
        <form onSubmit={addForm.handleSubmit}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <TextField
              size="small"
              label="New participant handle"
              name="handle"
              value={addForm.values.handle}
              onChange={addForm.handleChange}
              onBlur={addForm.handleBlur}
              error={addForm.touched.handle && Boolean(addForm.errors.handle)}
              helperText={addForm.touched.handle && addForm.errors.handle}
              sx={{ minWidth: 220 }}
            />
            <input
              name="color"
              type="color"
              value={addForm.values.color}
              onChange={(e) => addForm.setFieldValue('color', e.target.value)}
              style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
            <Tooltip title="Add">
              <IconButton color="primary" type="submit"><AddIcon /></IconButton>
            </Tooltip>
            <Button type="submit" variant="outlined" size="small" startIcon={<AddIcon />} sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
              Add
            </Button>
          </Stack>
        </form>
        <Divider sx={{ opacity: 0.5 }} />
        <Typography variant="body2" color="text.secondary">Hackers</Typography>

        {/* List hackers */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: 1 }}>
          {(form.values.hackers ?? []).length === 0 && <Typography color="text.secondary">No hackers yet.</Typography>}
          {form.values.hackers.map((h) => {
            const color = form.values.hackerColors?.[h] ?? '#ff6b6b';
            return (
              <Box key={h} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  icon={<SecurityIcon sx={{ color: color }} />}
                  label={h}
                  onDelete={() => {
                    // Remove hacker; also clear any messages referring to them
                    form.setFieldValue('hackers', form.values.hackers.filter((x) => x !== h), true);
                    const nextColors = { ...(form.values.hackerColors ?? {}) }; delete nextColors[h];
                    form.setFieldValue('hackerColors', nextColors, true);
                    form.setFieldValue('messages', form.values.messages.map((m) => m.hack?.by === h ? { ...m, hack: null } : m));
                  }}
                  variant="outlined"
                  sx={{ borderColor: color }}
                />
                <input
                  aria-label={`Color for hacker ${h}`} type="color" value={color}
                  onChange={(e) => form.setFieldValue('hackerColors', { ...(form.values.hackerColors ?? {}), [h]: e.target.value }, true)}
                  style={{ width: 28, height: 28, border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Add hacker row */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <TextField
            size="small"
            label="New hacker handle"
            value={(form as any).values.__newH ?? ''}
            onChange={(e) => (form as any).setFieldValue('__newH', e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SecurityIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 220 }}
          />
          <input
            type="color"
            value={(form as any).values.__newHCol ?? '#ff6b6b'}
            onChange={(e) => (form as any).setFieldValue('__newHCol', e.target.value)}
            style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}
          />
          <Tooltip title="Add hacker">
            <IconButton color="primary" onClick={() => {
              const h = String((form as any).values.__newH || '').trim();
              const c = (form as any).values.__newHCol || '#ff6b6b';
              if (!h) return;
              if (!(form.values.hackers ?? []).includes(h)) {
                form.setFieldValue('hackers', [...(form.values.hackers ?? []), h], true);
              }
              form.setFieldValue('hackerColors', { ...(form.values.hackerColors ?? {}), [h]: c }, true);
              (form as any).setFieldValue('__newH', '');
            }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Collapsible>
  );
}
