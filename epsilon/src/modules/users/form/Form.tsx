'use client'

import React, { useCallback, useMemo } from 'react';
import { Form, useField } from 'formik';
import { Stack } from '@mui/material';
import MainTab from './tabs/MainTab';
import PrivateRecordsTab from './tabs/PrivateRecordsTab';
import GoalsTab from './tabs/GoalsTab';
import MetaTab from './tabs/MetaTab';
import RelationsTab from './tabs/RelationsTab';
import TabsUI from '@/components/common/Tabs';
import { useParams } from 'next/navigation';
import MedicalEventsTab from '@/modules/users/form/tabs/MedicalEventsTab';
import CriminalEventsTab from '@/modules/users/form/tabs/CriminalEventsTab';

function UsersForm() {
  const [tabField, meta, helpers] = useField('tab');
  const { userHandle } = useParams();
  const changeTab = useCallback((_, v) => helpers.setValue(v as number), [helpers]);
  const tabs = useMemo(() => {
    const activeTabs = [ { key: 'profile', label: 'Profile', component: <MainTab />, } ];

    if (userHandle) activeTabs.push({ key: 'privateRecords', label: 'Private records', component: <PrivateRecordsTab />, });
    if (userHandle) activeTabs.push({ key: 'medicalEvents', label: 'Medical', component: <MedicalEventsTab />, });
    if (userHandle) activeTabs.push({ key: 'criminalEvents', label: 'Criminal', component: <CriminalEventsTab />, });
    if (userHandle) activeTabs.push({ key: 'goals', label: 'Goals', component: <GoalsTab />, });
    if (userHandle) activeTabs.push({ key: 'meta', label: 'Meta', component: <MetaTab />, });
    if (userHandle) activeTabs.push({ key: 'relations', label: 'Relations', component: <RelationsTab />, });

    return activeTabs;
  }, [userHandle])

  return (
    <Form id='profile-form' style={{ width: '100%' }}>
      <Stack spacing={ 2 } sx={{ width: '100%', flex: 1, }}>
        <TabsUI value={ tabField.value as string } onChange={ changeTab } tabs={ tabs } />
      </Stack>
    </Form>
  );
}

export default UsersForm;
