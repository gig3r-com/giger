import React, { useMemo } from 'react';
import { useField } from 'formik';
import Event from './Event';
import { Button, Box, Stack } from '@mui/material';

const empty = () => ({
  id: crypto.randomUUID(),
  title: '',
  description: '',
});

function Events({ addLabel, name, types,  }: { addLabel: string, name: string, }) {
  const [field, , helpers] = useField(name);
  const list = Array.isArray(field.value) ? field.value : [];

  const addNewEvent = () => {
    helpers.setValue([empty(), ...list]);
  };

  const removeEvent = (id) => {
    helpers.setValue(list.filter((item) => item.id !== id));
  };

  const sortedList = useMemo(
    () => list
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((event, index) => (
          <Event
            key={event.id}
            name={`${name}[${index}]`}
            remove={() => removeEvent(event.id)}
          />
        )),
    [name, removeEvent, list]
  );


  return (
    <div>
      <Button variant='outlined' fullWidth onClick={addNewEvent}>
        { addLabel }
      </Button>

      <Stack direction="column" spacing={ 2 } sx={{ mt: 2 }}>
        { sortedList }
      </Stack>
    </div>
  );
}

export default Events;
