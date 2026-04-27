import React, { memo, useState, useCallback, useMemo } from 'react';
import {
  Box,
  Chip,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useField } from 'formik';

function InputHacker() {
  const [field, meta, helpers] = useField<string[]>('hackers');
  const [draft, setDraft] = useState('');

  const values = useMemo(() => field.value ?? [], [field.value]);

  const addOne = useCallback(() => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) return; // no duplicates
    helpers.setValue([...values, trimmed]);
    setDraft('');
  }, [draft, values, helpers]);

  const removeOne = useCallback(
    (toRemove: string) => {
      helpers.setValue(values.filter((v) => v !== toRemove));
    },
    [values, helpers],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addOne();
    }
  };

  const showError = Boolean(meta.touched && meta.error);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1, }}>
      <Typography variant="subtitle1" fontWeight={600}>
        Hackers
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {values.length === 0 && (
          <Typography color="text.secondary">No hackers yet.</Typography>
        )}
        {values.map((handle) => (
          <Chip
            key={handle}
            label={handle}
            onDelete={() => removeOne(handle)}
            variant="outlined"
          />
        ))}
      </Box>

      <TextField
        size="small"
        fullWidth
        label="Add hacker"
        placeholder="Type a name and press Enter"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => helpers.setTouched(true)}
        error={showError}
        helperText={showError ? meta.error : ' '}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={addOne} disabled={!draft.trim()}>
                <AddIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default memo(InputHacker);
