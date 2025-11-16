import React from 'react';
import { Stack } from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import Input from '../../fields/Input';
import Select from '../../fields/Select';
import {
  USER_TYPE_OPTIONS,
  USER_COMBAT_SKILL_OPTIONS,
  USER_CYBERWARE_LVL_OPTIONS,
  USER_BOOL_OPTIONS,
  USER_WEALTH_OPTIONS,
} from '../../enums';

function Profile() {
  return (
    <Collapsible title="Profile">
      <Stack sx={{ mt: 2, width: '100%' }} spacing={ 2 }>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Input onlyCreate label="Handle" name="handle" flex={ 2 } />
          <Select label="Active" name="active" options={ USER_BOOL_OPTIONS } flex={ 1 } />
        </Stack>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Input label="Name" name="name" />
          <Input label="Surname" name="surname" />
        </Stack>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select onlyCreate label="Type (Actual)" name="typeActual" options={ USER_TYPE_OPTIONS } />
          <Select label="Type (Public)" name="typePublic" options={ USER_TYPE_OPTIONS } />
        </Stack>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select onlyCreate label="Combat skill" name="combatSkill" options={ USER_COMBAT_SKILL_OPTIONS } />
          <Select onlyCreate label="Cyberware level" name="cyberwareLevel" options={ USER_CYBERWARE_LVL_OPTIONS } />
        </Stack>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select onlyCreate label="Wealth level" name="wealthLevel" options={ USER_WEALTH_OPTIONS } />
          <Input onlyCreate label="Insured amount" name="insuredAmount" />
        </Stack>

        <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
          <Select onlyCreate label="Has platinum pass" name="hasPlatinumPass" options={ USER_BOOL_OPTIONS } />
          <Select onlyCreate label="High security" name="highSecurity" options={ USER_BOOL_OPTIONS } />
        </Stack>

      </Stack>
    </Collapsible>
  );
}

export default Profile;