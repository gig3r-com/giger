import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Input from '../Fields/Input';
import Select from '../Fields/Select';
import {
  USER_BOOL_OPTIONS,
  USER_WEALTH_OPTIONS,
} from '@/components/modules/users/components/Form/enums';

function Wealth() {
  return (
    <SectionCard title="Wealth">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Wealth" name="wealthLevel" options={ USER_WEALTH_OPTIONS } />
          <Input label="Insured Amound" name="insuredAmount" />
        </Stack>
        <Input label="Reputation note" name="reputationDescription" />
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Platinum Pass" name="highSecurity" options={ USER_BOOL_OPTIONS } />
          <Select label="High Security" name="hasPlatinumPass" options={ USER_BOOL_OPTIONS } />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default Wealth;