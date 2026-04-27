'use client';

import * as React from 'react';
import {
  Stack, TextField, IconButton, Tooltip, List, ListItem, ListItemText, Button, Divider, InputAdornment, Typography, Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Collapsible from '@/components/common/Collapsible';
import { useParticipants } from '@/contexts/participants';
import { useConversations } from '@/contexts/conversations';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function GlobalParticipantConfig() {
  const { byHandle, upsert, remove, setColor, importMany, exportAll } = useParticipants();
  const { selected, addParticipant, setParticipantColor } = useConversations();

  const search = useFormik({ initialValues: { q: '' }, onSubmit: () => {} });

  const addForm = useFormik<{ handle: string; color: string }>({
    initialValues: { handle: '', color: '#89a3ff' },
    validationSchema: Yup.object({
      handle: Yup.string().trim().min(1, 'Required').required('Required'),
      color: Yup.string().matches(/^#([0-9A-Fa-f]{6})$/, 'Hex color like #89a3ff').required('Required'),
    }),
    onSubmit: (values, helpers) => { upsert({ handle: values.handle.trim(), color: values.color }); helpers.resetForm(); },
  });

  const filtered = React.useMemo(() => {
    const q = search.values.q.trim().toLowerCase();
    const arr = Object.values(byHandle);
    return !q ? arr : arr.filter((p) => p.handle.toLowerCase().includes(q));
  }, [byHandle, search.values.q]);

  const addToCurrentConv = (h: string) => {
    if (!selected) return;
    addParticipant(selected.id, h);
    const c = byHandle[h]?.color || '#89a3ff';
    setParticipantColor(selected.id, h, c);
  };

  const doExport = () => {
    const blob = new Blob([JSON.stringify(exportAll(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'participants.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  const fileRef = React.useRef<HTMLInputElement>(null);
  const doImport = () => fileRef.current?.click();
  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const arr = JSON.parse(String(reader.result) || '[]'); if (Array.isArray(arr)) importMany(arr); } catch {} };
    reader.readAsText(f);
    e.currentTarget.value = '';
  };

  return (
    <Collapsible title="Global Participants">
      <Stack spacing={1.25}>
        {/* Unified “search + add” row styling */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <form onSubmit={search.handleSubmit}>
            <TextField
              size="small"
              label="Search handle"
              name="q"
              value={search.values.q}
              onChange={search.handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
              sx={{ minWidth: 220 }}
            />
          </form>

          <form onSubmit={addForm.handleSubmit}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                size="small"
                label="Handle"
                name="handle"
                value={addForm.values.handle}
                onChange={addForm.handleChange}
                onBlur={addForm.handleBlur}
                error={addForm.touched.handle && Boolean(addForm.errors.handle)}
                helperText={addForm.touched.handle && addForm.errors.handle}
                sx={{ minWidth: 180 }}
              />
              <input
                name="color"
                type="color"
                value={addForm.values.color}
                onChange={(e) => addForm.setFieldValue('color', e.target.value)}
                style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
              <Tooltip title="Add / Update">
                <IconButton color="primary" type="submit"><AddIcon /></IconButton>
              </Tooltip>
            </Stack>
          </form>
        </Stack>

        <Divider sx={{ opacity: 0.5 }} />

        {/* List */}
        {filtered.length === 0 ? (
          <Typography color="text.secondary">No participants match your search.</Typography>
        ) : (
          <List dense sx={{ maxHeight: 260, overflow: 'auto' }}>
            {filtered.map((p) => (
              <ListItemText
                key={p.handle}
                primaryTypographyProps={{ component: 'span' }}
                secondaryTypographyProps={{ component: 'span' }}
                primary={p.handle}
                secondary={
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>Color</span>
                      <input
                        type="color"
                        value={p.color || '#89a3ff'}
                        onChange={(e) => setColor(p.handle, e.target.value)}
                        style={{ width: 20, height: 20, border: 'none', background: 'transparent', cursor: 'pointer' }}
                      />
                      <Button
                        size="small"
                        startIcon={<SwapHorizIcon fontSize="small" />}
                        onClick={() => addToCurrentConv(p.handle)}
                      >
                        Add to current
                      </Button>
                    </Stack>
                  </Box>
                }
              />
            ))}
          </List>
        )}

        {/* Import/Export */}
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadIcon />} onClick={doExport}>Export</Button>
          <Button variant="outlined" size="small" startIcon={<FileUploadIcon />} onClick={doImport}>Import</Button>
          <input type="file" hidden ref={fileRef} accept="application/json" onChange={onImportFile} />
        </Stack>
      </Stack>
    </Collapsible>
  );
}
