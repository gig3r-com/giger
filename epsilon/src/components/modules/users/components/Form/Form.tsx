'use client'

import React, { useCallback, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import { schema, initialValues } from './schema';
import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ProfileTab from './tabs/ProfileTab';
import BankingTab from './tabs/BankingTab';
import ConversationsTab from './tabs/ConversationsTab';
import GigsTab from './tabs/GigsTab';
import GoalTab from './tabs/GoalTab';
import EventsTab from './tabs/EventsTab';
import MetaTab from './tabs/MetaTab';
import PrivateRecordsTab from './tabs/PrivateRecordsTab';
import RelationsTab from './tabs/RelationsTab';
import TabsUI from '@/components/common/Tabs';
import FormControl from './configs/FormControl';
import { useNetwork } from '@/components/modules/networks';
import mapUserToApi from '@/components/modules/users/components/Form/mapToApi';
import mapUserToForm from '@/components/modules/users/components/Form/mapToForm';
import { UserList, useUsers } from '@/components/modules/users';

function MyForm() {
  const [tab, setTab] = useState(0);
  const { networksByName } = useNetwork();
  const { selected } = useUsers();

  const isEditing = Boolean(selected);

  const init = useMemo(
    () => (isEditing ? mapUserToForm(selected) : initialValues ),
    [isEditing, selected]
  );

  const tabs = useMemo(() => {
    if (!isEditing) {
      return [
        { label: 'Profile', component: <ProfileTab />, }
      ];
    }

    return [
      { label: 'Profile', component: <ProfileTab />, },
      { label: 'Private records', disabled: !isEditing, component: <PrivateRecordsTab />, },
      { label: 'Meta', disabled: !isEditing, component: <MetaTab />, },
      { label: 'Goals', disabled: !isEditing, component: <GoalTab />, },
      { label: 'Relations', disabled: !isEditing, component: <RelationsTab />, },
      { label: 'Events', disabled: !isEditing, component: <EventsTab />, },
      { label: 'Banking', disabled: !isEditing, component: <BankingTab />, },
      { label: 'Conversations', disabled: !isEditing, component: <ConversationsTab />, },
      { label: 'Gigs', disabled: !isEditing, component: <GigsTab />, },
    ];
  }, [isEditing])

  return (
    <Formik key={ selected?.handle ?? 'new' } enableReinitialize initialValues={ init } validationSchema={ schema } onSubmit={
      async (values, { setSubmitting, setStatus }) => {
        try {
          const res = isEditing ?
            await fetch(`/api/users/${values.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mapUserToApi(values, networksByName)),
            })
            :
            await fetch(`/api/users/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mapUserToApi(values, networksByName)),
            });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.error || `Request failed (${res.status})`);
          }

          const data = await res.json();
          setStatus({ ok: true, message: 'Saved!' });
          // do whatever with `data` (toast, redirect, etc.)
        } catch (e: any) {
          setStatus({ ok: false, message: e.message });
        } finally {
          setSubmitting(false);
        }
      }
    }>
      { () => (
        <Form id='profile-form'>
          <LocalizationProvider dateAdapter={ AdapterDayjs }>
            <Stack direction="row" spacing={ 2 } alignItems="flex-start" sx={{ width: '100%', maxWidth: '100%' }}>
              <Stack spacing={ 2 } sx={{ width: 200, flexShrink: 0 }}>
                <FormControl />
                <UserList />
              </Stack>
              <Stack spacing={ 2 } sx={{ width: "calc(100% - 224px)", maxWidth: "calc(100% - 224px)", flex: 1, }}>
                <TabsUI value={ tab } onChange={ (_, v) => setTab(v) } tabs={ tabs } />
              </Stack>
            </Stack>
          </LocalizationProvider>
        </Form>
      ) }
    </Formik>
  );
}

export default MyForm;
