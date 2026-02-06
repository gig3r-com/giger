import React, { memo, useState, type ChangeEvent, useRef, useCallback, useEffect } from 'react';
import { useField } from 'formik';
import { IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export interface MessageNoteProps {
  index: number,
}

function MessageNote({ index }: MessageNoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [note, , noteHelpers] = useField(`messages[${index}].note`);
  const [value, setValue] = useState<string>(note.value as string ?? '');
  const timerRef = useRef<number | null>(null);
  const toggleNote = useCallback(() => setIsOpen(open => !open), []);

  useEffect(() => {
    setValue(note.value as string ?? '');
  }, [note.value]);

  const commitDebounced = useCallback(
    (v: string, shouldValidate: boolean) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        noteHelpers.setValue(v, shouldValidate);
      }, 500);
    },
    [noteHelpers]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
      commitDebounced(e.target.value, false);
    },
    [commitDebounced]
  );

  const onBlur = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    noteHelpers.setValue(value, true);
    noteHelpers.setTouched(true, true);
  }, [noteHelpers, value]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tooltip title={isOpen ? 'Hide note' : 'Add/View note'}>
          <IconButton size="small" onClick={toggleNote}>
            {isOpen ? <CloseIcon fontSize="small" /> : <NoteAddIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        { note && !isOpen ? (
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            { value.length > 60 ? `${value.slice(0, 60)}…` : value }
          </Typography>
        ) : null }
      </Stack>

      { isOpen ? (
        <TextField
          label="Note"
          value={ value }
          fullWidth
          multiline
          minRows={2}
          variant="outlined"
          size="small"
          onChange={ onChange }
          onBlur={ onBlur }
        />
      ) : null }
    </>
  );
}

MessageNote.displayName = 'MessageNote';

export default memo(MessageNote);
