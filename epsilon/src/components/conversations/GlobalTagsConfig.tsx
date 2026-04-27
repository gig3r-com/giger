'use client';

import * as React from 'react';
import { Stack, TextField, IconButton, Tooltip, List, ListItem, ListItemText, Button, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Collapsible from '@/components/common/Collapsible';
import { useTags } from '@/contexts/tags';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function GlobalTagsConfig() {
  const { byName, upsert, remove, importMany, exportAll } = useTags();
  const form = useConversationForm();

  // Search form
  const search = useFormik<{ q: string }>({ initialValues: { q: '' }, onSubmit: () => {} });

  // Add / update form
  const addForm = useFormik<{ name: string }>({
    initialValues: { name: '' },
    validationSchema: Yup.object({ name: Yup.string().trim().min(1, 'Required').required('Required') }),
    onSubmit: (values, helpers) => { upsert({ name: values.name.trim() }); helpers.resetForm(); },
  });

  const filtered = React.useMemo(() => {
    const q = search.values.q.trim().toLowerCase();
    const arr = Object.keys(byName).sort();
    return !q ? arr : arr.filter((n) => n.toLowerCase().includes(q));
  }, [byName, search.values.q]);

  const doExport = () => {
    const blob = new Blob([JSON.stringify(exportAll(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'tags.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  const fileRef = React.useRef<HTMLInputElement>(null);
  const doImport = () => fileRef.current?.click();
  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { const arr = JSON.parse(String(reader.result) || '[]'); if (Array.isArray(arr)) importMany(arr); }
      catch {}
    };
    reader.readAsText(f);
    e.currentTarget.value = '';
  };

  const addToConversation = (name: string) => {
    const tags = form.values.tags ?? [];
    if (!tags.includes(name)) form.setFieldValue('tags', [...tags, name]);
  };

  const addAllSuggested = () => {
    const all = Object.keys(byName);
    const current = new Set(form.values.tags ?? []);
    const merged = Array.from(new Set([...current, ...all]));
    form.setFieldValue('tags', merged);
  };

  return (
    <Collapsible title="Global Tags">
      <Stack spacing={1.25}>
        {/* Search + Import/Export row */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <form onSubmit={search.handleSubmit}>
            <TextField
              size="small"
              label="Search tag"
              name="q"
              value={search.values.q}
              onChange={search.handleChange}
              sx={{ minWidth: 200 }}
            />
          </form>
          <Button variant="outlined" size="small" startIcon={<FileDownloadIcon />} onClick={doExport}>Export</Button>
          <Button variant="outlined" size="small" startIcon={<FileUploadIcon />} onClick={doImport}>Import</Button>
          <input type="file" hidden ref={fileRef} accept="application/json" onChange={onImportFile} />
          <Button variant="outlined" size="small" startIcon={<AddCircleOutlineIcon />} onClick={addAllSuggested}>
            Add all to conversation
          </Button>
        </Stack>

        {/* Add form */}
        <form onSubmit={addForm.handleSubmit}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              label="New tag"
              name="name"
              value={addForm.values.name}
              onChange={addForm.handleChange}
              onBlur={addForm.handleBlur}
              error={addForm.touched.name && Boolean(addForm.errors.name)}
              helperText={addForm.touched.name && addForm.errors.name}
              sx={{ minWidth: 200 }}
            />
            <Tooltip title="Add / Update">
              <IconButton color="primary" type="submit"><AddIcon /></IconButton>
            </Tooltip>
          </Stack>
        </form>

        <Divider sx={{ opacity: 0.5 }} />

        {/* List */}
        {filtered.length === 0 ? (
          <Typography color="text.secondary">No tags match your search.</Typography>
        ) : (
          <List dense sx={{ maxHeight: 260, overflow: 'auto' }}>
            {filtered.map((name) => (
              <ListItemText
                primaryTypographyProps={{ component: 'span' }}
                secondaryTypographyProps={{ component: 'span' }}
                primary={name}
                secondary={
                  <Box component="span" sx={{ display: 'inline-flex' }}>
                    <Button size="small" onClick={() => addToConversation(name)}>
                      Add to conversation
                    </Button>
                  </Box>
                }
              />

            ))}
          </List>
        )}
      </Stack>
    </Collapsible>
  );
}
