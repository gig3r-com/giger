import React, { useCallback, useMemo } from 'react';
import { useField, useFormikContext } from 'formik';
import isEqual from 'fast-deep-equal';
import { Button, Box, ButtonGroup } from '@mui/material';
import Record from './Record';
import Event from './Event';

const empty = () => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
});

interface RecordsProps {
  name: string;
  events?: boolean;
}

function Records({ name, events }: RecordsProps) {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue, submitForm } = useFormikContext();
  const isChanged = useMemo(() => {
    return !isEqual(meta.value.filter(r => !r?._removed), meta.initialValue);
  }, [meta.value, meta.initialValue]);

  const add = useCallback(() => {
    helpers.setValue([...(field.value ?? []), empty()])
      .then(() => null)
      .catch(() => { throw new Error(`Error adding new record in ${name}`); });
  }, [name, helpers, field.value]);

  const removeRecord = useCallback((index: number) => {
    const newList = [ ...field.value ];
    newList[index]._removed = true;
    helpers.setValue(newList)
      .then(() => null)
      .catch(() => { throw new Error(`Error removing record ${index} in ${name}`); });
  }, [name, helpers, field.value]);

  const reAddRecord = useCallback((index: number) => {
    const newList = [ ...field.value ];
    newList[index]._removed = false;
    helpers.setValue(newList)
      .then(() => null)
      .catch(() => { throw new Error(`Error re-adding record ${index} in ${name}`); });
  }, [name, helpers, field.value]);

  const reset = useCallback(() => {
    helpers.setValue(meta.initialValue ?? [])
      .then(() => null)
      .catch((e) => { throw new Error(`Error resetting records ${name}: ${e?.msg ?? ''}`); });
  }, [name, helpers, meta.initialValue]);

  const save = useCallback(() => {
    setFieldValue('submitting', name, false)
      .then(() => submitForm())
      .catch(() => { throw new Error(`Error submitting ${name}`); });
  }, [name, setFieldValue, submitForm]);

  return (
    <>
      <ButtonGroup fullWidth>
        <Button variant="outlined" onClick={ add }>
          Add
        </Button>
        <Button variant="outlined" onClick={ reset } disabled={ !isChanged }>
          Reset
        </Button>
        <Button color="info" variant="outlined" onClick={ save } disabled={ !isChanged }>
          Save
        </Button>
      </ButtonGroup>

      <Box sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 6, }}>
        { field.value?.map((_, index) => {
          if (events) return (
            <Event key={ _.id } name={ `${name}[${index}]` } onRemove={ () => removeRecord(index) } onReAdd={ () => reAddRecord(index) } />
          ); else return (
            <Record key={ _.id } name={ `${name}[${index}]` } onRemove={ () => removeRecord(index) } onReAdd={ () => reAddRecord(index) } />
          )}) }
      </Box>
    </>
  );
}

export default Records;