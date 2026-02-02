'use client';

import * as React from 'react';
import {
  Stack, TextField, IconButton, Tooltip, Divider, Typography, Chip, Box, InputAdornment, Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SecurityIcon from '@mui/icons-material/Security';
import Collapsible from '@/components/common/Collapsible';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';

export default function HackersConfig() {
  const form = useConversationForm();

  // local UI state for add/search
  const [q, setQ] = React.useState('');
  const [newH, setNewH] = React.useState('');
  const [newCol, setNewCol] = React.useState('#ff6b6b');

  const hackers = form.values.hackers ?? [];
  const colors = form.values.hackerColors ?? {};

  const filtered = React.useMemo(
    () => hackers.filter(h => !q || h.toLowerCase().includes(q.toLowerCase())),
    [hackers, q]
  );

  const addHacker = () => {
    const h = newH.trim();
    if (!h) return;
    if (!hackers.includes(h)) form.setFieldValue('hackers', [...hackers, h], true);
    form.setFieldValue('hackerColors', { ...colors, [h]: newCol || '#ff6b6b' }, true);
    setNewH('');
  };

  const removeHacker = (h: string) => {
    form.setFieldValue('hackers', hackers.filter(x => x !== h), true);
    const next = { ...colors }; delete next[h];
    form.setFieldValue('hackerColors', next, true);
    // clear any messages that referenced this hacker
    form.setFieldValue('messages', form.values.messages.map(m => (m.hack?.by === h ? { ...m, hack: null } : m)));
  };

  return (
    <Collapsible title="Hackers">
      <Stack spacing={1.25}>
        {/* Search + Add row */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <TextField
            size="small"
            label="Search hackers"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 220 }}
          />
          <TextField
            size="small"
            label="New hacker handle"
            value={newH}
            onChange={(e)=>setNewH(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SecurityIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 240 }}
          />
          <input
            type="color"
            value={newCol}
            onChange={(e)=>setNewCol(e.target.value)}
            style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}
            aria-label="Hacker color"
          />
          <Tooltip title="Add hacker">
            <span>
              <IconButton color="primary" onClick={addHacker} disabled={!newH.trim()}>
                <AddIcon />
              </IconButton>
            </span>
          </Tooltip>
          {hackers.length > 0 && (
            <Button
              size="small"
              onClick={()=>{
                // Quick assign: add all hackers as tags prefixed if desired – here we do nothing special, just a helper you may repurpose
              }}
              sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }}
            >
              Helpers…
            </Button>
          )}
        </Stack>

        <Divider sx={{ opacity: 0.5 }} />

        {/* List */}
        {filtered.length === 0 ? (
          <Typography color="text.secondary">No hackers yet.</Typography>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filtered.map(h => {
              const c = colors[h] ?? '#ff6b6b';
              return (
                <Box key={h} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    icon={<SecurityIcon sx={{ color: c }} />}
                    label={h}
                    variant="outlined"
                    sx={{ borderColor: c }}
                    onDelete={() => removeHacker(h)}
                    deleteIcon={<DeleteOutlineIcon />}
                  />
                  <input
                    type="color"
                    value={c}
                    onChange={(e)=>form.setFieldValue('hackerColors', { ...colors, [h]: e.target.value }, true)}
                    style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer' }}
                    aria-label={`Color for ${h}`}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Stack>
    </Collapsible>
  );
}
