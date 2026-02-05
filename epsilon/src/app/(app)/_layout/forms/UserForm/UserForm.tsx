'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { userSchema } from './schema';
import { VerticalTabs } from '../../components';
import Profile from './tabs/profileTab';
import RecordsTab from './tabs/recordsTab';
import { FormController } from '../FormController';

export function UserForm({ initialValues, tabCode }: { initialValues: any, tabCode: string }) {

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ userSchema }
            onSubmit={ (values) => {
                console.log('SUBMIT', values);
                alert('Submitted! Check console for output.');
            } }
            validateOnBlur
            validateOnChange
            enableReinitialize
        >
            <Form noValidate>
                <FormController tabCode={tabCode} />
                <VerticalTabs
                    tabs={ [
                        { label: 'Main', content: <Profile/>, dividerAfter: true, },
                        { label: 'Private Files', content: <RecordsTab/>, sectionComment: 'Hard Records' },
                        { label: 'Criminal Records', content: <Profile/>, },
                        { label: 'Medical Records', content: <Profile/>, dividerAfter: true, },
                        { label: 'Memories', content: <Profile/>, sectionComment: 'Mind Records' },
                        { label: 'Goals', content: <Profile/>, },
                        { label: 'Relations', content: <Profile/>, dividerAfter: true, },
                        { label: 'Goals', content: <Profile/>, sectionComment: 'Meta' },
                        { label: 'Rules', content: <Profile/>, },
                    ] }
                />
            </Form>
        </Formik>
    );
}

export default UserForm;