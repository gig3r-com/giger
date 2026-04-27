import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Stack } from '@mui/material';
import Input from '../Fields/Input';
import Select from '../Fields/Select';
import {
  USER_SKILL_OPTIONS,
  USER_TYPE_OPTIONS,
  USER_CYBERWARE_OPTIONS,
} from '@/components/modules/users/components/Form/enums';

function Profile() {
  return (
    <SectionCard title="Profile">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>
        <Input label="Name" name="name" />
        <Input label="Surname" name="surname" />
        <Input label="Handle" name="handle" />
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Type (Actual)" name="typeActual" options={ USER_TYPE_OPTIONS } />
          <Select label="Type (Public)" name="typePublic" options={ USER_TYPE_OPTIONS } />
        </Stack>
        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select label="Combat skill" name="combatSkill" options={ USER_SKILL_OPTIONS } />
          <Select label="Cyberware level" name="cyberwareLevel" options={ USER_CYBERWARE_OPTIONS } />
        </Stack>
      </Stack>
    </SectionCard>
  );
}

export default Profile;