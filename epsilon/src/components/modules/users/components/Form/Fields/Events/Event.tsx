import React from 'react';
import { Box, IconButton, Stack, Tooltip, Divider, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Input from '../Input';
import Select from '../Select';
import SectionCard from '@/components/common/SectionCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EventDatePicker from '@/components/modules/users/components/Form/Fields/Events/EventDatePicker';

function Event({ name, remove }: { name: string, remove: () => void, }) {
  return (
    <SectionCard right={
      <>
        <Box sx={{ width: '100%', mr: 2 }} onClick={ e => e.stopPropagation() }>
          <Input label="Title" name={ `${name}.title` } />
        </Box>
        <Tooltip title='Remove'>
          <IconButton onClick={remove}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </>
    }>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography sx={{ flex: 1, paddingLeft: '8px' }}>Age: 14</Typography>
        <Box>
          <EventDatePicker label="Data" name={`${name}.timestamp`} />
        </Box>
      </Stack>
      {/*<Divider />*/}
      <Stack direction="row" spacing={ 2 }>
        <Select label="Status" name={ `${name}.status` } options={ [] } />
        <Select label="Status" name={ `${name}.status` } options={ [] } />
        {/*status*/}
        {/*type*/}
      </Stack>
      {/*<Divider />*/}
      <Input label="Description" name={ `${name}.description` } minRows={ 5 } multiline />
    </SectionCard>
  );
}

export default Event;