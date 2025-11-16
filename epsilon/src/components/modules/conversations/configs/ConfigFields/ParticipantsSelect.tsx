'use client';
import React, { memo, useMemo } from 'react';
import {
  Autocomplete,
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useField } from 'formik';
import { useUsers } from '@/components/modules/users';

interface Option {
  handle: string;
  name?: string;
  avatarUrl?: string;
}

export interface ParticipantsSelectProps {
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ParticipantsSelect({
                              name = 'participants',
                              label = 'Participants',
                              placeholder = 'Search and select participants…',
                              disabled,
                            }: ParticipantsSelectProps) {
  const [field, meta, helpers] = useField<string[]>({ name });
  const { usersByHandle } = useUsers(); // { [handle]: User }

  const options: Option[] = useMemo(() => {
    if (!usersByHandle) return [];
    return Object.entries(usersByHandle)
      .map(([handle, u]: any) => ({
        handle,
        name: u?.name || u?.displayName || handle,
        avatarUrl: u?.avatarUrl || u?.avatar || undefined,
      }))
      .sort((a, b) => (a.name || a.handle).localeCompare(b.name || b.handle));
  }, [usersByHandle]);

  // map current string[] (handles) -> Option[]
  const value: Option[] = useMemo(() => {
    const set = new Set(field.value || []);
    return options.filter((o) => set.has(o.handle));
  }, [field.value, options]);

  const showError = Boolean(meta.touched && meta.error);

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={value}
      onChange={(_, selected) => {
        helpers.setValue(selected.map((o) => o.handle));
        if (!meta.touched) helpers.setTouched(true);
      }}
      getOptionLabel={(o) => o.name ?? o.handle}
      isOptionEqualToValue={(o, v) => o.handle === v.handle}
      filterSelectedOptions
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          size="small"
          error={showError}
          helperText={showError ? meta.error : ' '}
          onBlur={() => helpers.setTouched(true)}
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.handle}
            avatar={
              option.avatarUrl ? (
                <Avatar src={option.avatarUrl} alt={option.name} />
              ) : (
                <Avatar>{(option.name || option.handle)[0]?.toUpperCase()}</Avatar>
              )
            }
            label={`${option.name ?? option.handle} (@${option.handle})`}
            variant="outlined"
          />
        ))
      }
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.handle}>
          {selected ? checkedIcon : icon}
          <ListItemAvatar sx={{ minWidth: 40, ml: 1, mr: 1 }}>
            {option.avatarUrl ? (
              <Avatar src={option.avatarUrl} alt={option.name} />
            ) : (
              <Avatar>{(option.name ?? option.handle)[0]?.toUpperCase()}</Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={option.name ?? option.handle}
            secondary={`@${option.handle}`}
            primaryTypographyProps={{ noWrap: true }}
            secondaryTypographyProps={{ noWrap: true }}
          />
        </li>
      )}
    />
  );
}

export default memo(ParticipantsSelect);
