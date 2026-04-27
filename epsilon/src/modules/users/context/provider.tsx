'use client';

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from 'next/navigation';
import { Formik } from 'formik';
import { schema, initialValues } from '../form/schema';
import { mapUserToForm } from '../form/mapToForm';
import submit from '../form/submit';
import { UserFormValues } from '../form/types';
import Overlay from '@/components/common/Overlay';
import { useUsers } from '@/components/modules/users';
import { User } from '@/types';

export default function UserModuleContextProvider({ children }: { children: ReactNode }) {
  const [formUser, setFormUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { userHandle } = useParams();
  const { usersByHandle, fetch, isLoading } = useUsers();

  useEffect(() => {
    if (!userHandle){
      setFormUser(null);
    } else if (!usersByHandle[userHandle]) {
      setLoading(true);
      fetch()
        .then((data) => data)
        .catch((error) => { throw new Error(error as string); })
        .finally(() => setLoading( false));
    } else {
      setFormUser(usersByHandle[userHandle] as User);
    }
  }, [fetch, userHandle, usersByHandle]);

  const key = useMemo(() => {
    if (!formUser) return 'new';
    return formUser.handle;
  }, [formUser]);

  const formValues = useMemo(() => {
    if (!formUser) return initialValues;
    return mapUserToForm(formUser);
  }, [formUser]);
  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs }>
      <Formik<UserFormValues> key={ key } initialValues={ formValues } enableReinitialize validationSchema={ schema } onSubmit={ submit }>
        {
          () =>  (
            <>
              { (loading || isLoading) && <Overlay /> }
              { children }
            </>
          )
        }
      </Formik>
    </LocalizationProvider>
  )
}