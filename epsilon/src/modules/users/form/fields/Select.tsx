import React, { useMemo, useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import { useParams } from 'next/navigation';
import type { UserFormValues } from '@/modules/users/form/types';

/* ===== Styles (same precedence/colors as Input.tsx) ===== */
type StyledProps = {
  $hasError: boolean;
  $disabled: boolean;
  $loading: boolean;
  $changed: boolean;
};

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) =>
    !['$hasError', '$disabled', '$loading', '$changed'].includes(prop as string),
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
        borderColor: main,
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

/* ===== Component ===== */
interface SelectProps {
  onlyCreate?: boolean;
  name: string;
  label: string;
  options: string[];
  mappedOptions?: React.ReactElement[]; // optional custom <MenuItem>s
  disabled?: boolean;
  flex?: number;
}

const NoopIcon = () => null; // remove dropdown triangle

function Select({ onlyCreate, name, label, options, mappedOptions, disabled, flex }: SelectProps) {
  const [field, meta, helpers] = useField<string>(name);
  const { isSubmitting, submitForm, setFieldValue } = useFormikContext<UserFormValues>();
  const { userHandle } = useParams();
  const forceDisable = onlyCreate ? !!userHandle : false;

  const changed = useMemo(() => !!userHandle && meta.value !== meta.initialValue, [
    meta.value,
    meta.initialValue,
    userHandle,
  ]);
  const hasError = !!(meta.touched && meta.error);

  const resetField = useCallback(() => {
    helpers.setValue(meta.initialValue as string, false);
    helpers.setTouched(false, false);
  }, [helpers, meta.initialValue]);

  const submit = useCallback(async () => {
    setFieldValue('submitting', name, false);
    await submitForm();
    setFieldValue('submitting', null, false);
  }, [setFieldValue, submitForm, name]);

  const items = useMemo(
    () =>
      mappedOptions ??
      options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      )),
    [options, mappedOptions]
  );

  // Match Input's adornment spacing exactly:
  // - hide default icon (IconComponent)
  // - remove Select's reserved right padding
  // - give OutlinedInput a tiny right padding (pr: 0.5) same as Input
  // - ensure clicks on buttons don’t open the menu
  const endAdornment =
    userHandle && (
      <InputAdornment position="end" sx={{ mr: 0.25 }}>
        {changed && (
          <Tooltip title="Discard changes">
            <IconButton
              size="small"
              color="error"
              edge="end"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                resetField();
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Save">
          <span>
            <IconButton
              size="small"
              color="primary"
              edge="end"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                submit();
              }}
              disabled={ forceDisable || hasError || isSubmitting || !changed }
            >
              <SaveIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </InputAdornment>
    );

  return (
    <StyledFormControl
      fullWidth
      size="small"
      sx={{ flex: flex ?? undefined }}
      error={hasError}
      disabled={forceDisable ?? disabled}
      $hasError={hasError}
      $disabled={forceDisable ?? disabled}
      $loading={isSubmitting}
      $changed={changed}
    >
      <InputLabel>{userHandle ? label : `${onlyCreate ? '* ' : ``}${label}`}</InputLabel>

      <MuiSelect
        {...field}
        label={ userHandle ? label : `${onlyCreate ? '* ' : ``}${label}` }
        // remove the little triangle
        IconComponent={NoopIcon}
        // kill the extra right padding MUI reserves for the icon
        sx={{
          '& .MuiSelect-icon': { display: 'none' }, // just in case
          '& .MuiSelect-select': { paddingRight: 8 }, // align with TextField + our pr:0.5 on input
        }}
        // make OutlinedInput host our endAdornment & keep right padding consistent with Input
        input={
          <OutlinedInput
            label={ userHandle ? label : `${onlyCreate ? '* ' : ``}${label}` }
            endAdornment={endAdornment}
            sx={{ pr: 0.5 }}
          />
        }
        value={field.value ?? ''}
        onChange={(e) => helpers.setValue(e.target.value)}
      >
        {items}
      </MuiSelect>

      <FormHelperText>{meta.touched ? meta.error : ''}</FormHelperText>
    </StyledFormControl>
  );
}

export default Select;
