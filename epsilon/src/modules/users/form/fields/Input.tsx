import React, { useCallback, useMemo } from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import { UserFormValues } from '@/modules/users/form/types';
import { useParams } from 'next/navigation';

type StyledProps = {
  $hasError: boolean;
  $disabled: boolean;
  $loading: boolean;
  $changed: boolean;
};

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['$hasError', '$disabled', '$loading', '$changed'].includes(
      prop as string
    ),
})<StyledProps>(({ theme, $hasError, $disabled, $loading, $changed }) => {
  const normal = theme.palette.primary.main;
  const changedC = theme.palette.secondary.main;
  const loadingC = theme.palette.info?.main ?? '#60a5fa';
  const errorC = theme.palette.error.main;
  const disabledC = alpha(theme.palette.text.primary, 0.35);

  let main = normal;
  if ($hasError) main = errorC;
  else if ($disabled) main = disabledC;
  else if ($loading) main = loadingC;
  else if ($changed) main = changedC;

  const hover =
    $hasError
      ? errorC
      : $disabled
        ? disabledC
        : $loading
          ? alpha(loadingC, 0.9)
          : $changed
            ? alpha(changedC, 0.9)
            : alpha(normal, 0.9);

  const focusShadow =
    $hasError ? alpha(errorC, 0.18) : $disabled ? 'transparent' : alpha(main, 0.18);

  return {
    '& .MuiInputLabel-root': {
      color: $disabled ? disabledC : $hasError ? errorC : main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: alpha(main, $disabled ? 0.35 : 0.45) },
      '&:hover fieldset': { borderColor: hover },
      '&.Mui-focused fieldset': {
        borderColor: alpha(main, 0.35),
        boxShadow: focusShadow ? `0 0 0 3px ${focusShadow}` : undefined,
      },
      '&.Mui-disabled .MuiInputBase-input': {
        WebkitTextFillColor: alpha(theme.palette.text.primary, 0.5),
      },
    },
    '& .MuiFormHelperText-root': {
      color: $hasError ? errorC : $disabled ? disabledC : main,
    },
  };
});

interface InputProps {
  onlyCreate?: boolean;
  name: string;
  label: string;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
  flex?: number;
}

function Input({ onlyCreate, name, label, disabled, multiline, minRows, flex }: InputProps) {
  const [field, meta, helpers] = useField<string>(name);
  const { submitForm, isSubmitting, setFieldValue } = useFormikContext<UserFormValues>();
  const { userHandle } = useParams();
  const forceDisable = (onlyCreate ? !!userHandle : false) || disabled;

  const changed = useMemo(() => {
    if (!userHandle) return false;
    return meta.value !== meta.initialValue
  }, [meta.value, meta.initialValue, userHandle]);
  const hasError = useMemo(() => meta.touched && meta.error, [meta.touched, meta.error]);

  const resetField = useCallback(() => {
    helpers.setValue(meta.initialValue as string, false);
    helpers.setTouched(false, false);
  }, [helpers, meta.initialValue]);

  const submit = useCallback(async () => {
    await setFieldValue('submitting', name, false);
    await submitForm();
    await setFieldValue('submitting', null, false);
  }, [setFieldValue, submitForm, name]);

  const endAdornment = useMemo(() => {
    if (!userHandle) return;

    return (
      <InputAdornment position="end" sx={{ mr: 0.25 }}>

        { changed && <Tooltip title="Discard changes">
          <IconButton size="small" color="error" onClick={ resetField } edge="end">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip> }

        <Tooltip title="Save">
        <span>
          <IconButton edge="end" color="primary" size="small" onClick={ submit } disabled={ forceDisable || hasError || isSubmitting || !changed }>
            <SaveIcon fontSize="small" />
          </IconButton>
        </span>
        </Tooltip>

      </InputAdornment>
    );
  }, [changed, userHandle, resetField, submit, hasError, isSubmitting]);

  return (
    <StyledTextField
      {...field} fullWidth size="small" margin="dense"
      sx={{ flex: flex ?? undefined }}
      autoComplete="off"
      label={ userHandle ? label : `${onlyCreate ? '* ' : ``}${label}` } multiline={ multiline } minRows={ minRows } disabled={ forceDisable ?? disabled }
      error={hasError}
      helperText={meta.touched ? meta.error : ''}
      FormHelperTextProps={{ sx: { mt: '2px', ml: 0 } }}
      InputProps={{ endAdornment }}
      $hasError={ hasError }
      $disabled={ forceDisable ?? disabled }
      $loading={ isSubmitting }
      $changed={ changed }
    />
  );
}

export default Input;
