import React, { useCallback, useMemo, memo } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, FormHelperText } from '@mui/material';
import { useConversations } from '@/components/modules/conversations/context';
import { useField } from 'formik';

function SelectMainHandle() {
  const { uiMainHandle, setUiMainHandle } = useConversations();
  const [field] = useField<string[]>('participants');

  const changeMainHandle = useCallback(
    (e: SelectChangeEvent<string>) => {
      setUiMainHandle(e.target.value || null);
    },
    [setUiMainHandle],
  );

  const parsedParticipants = useMemo(
    () =>
      field.value?.map((participant) => (
        <MenuItem key={participant} value={participant}>
          {participant}
        </MenuItem>
      )) ?? [],
    [field.value],
  );

  return (
    <Box flex={2}>
      <FormControl fullWidth>
        <InputLabel>Main user</InputLabel>
        <Select
          value={uiMainHandle ?? ' '}
          onChange={changeMainHandle}
          size="small"
          label="Main user"
          helperText=" "
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value=" ">(none)</MenuItem>
          {parsedParticipants}
        </Select>
        <FormHelperText>{ ` ` }</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default memo(SelectMainHandle);
