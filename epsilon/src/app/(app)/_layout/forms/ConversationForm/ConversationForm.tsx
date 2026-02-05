'use client';

import React from 'react';
import { Form, Formik, } from 'formik';
import { conversationSchema } from './schema';
import AllTabs from './tabs/AllTabs';
import { FormController } from '../FormController';

export function ConversationForm({ initialValues, tabCode }: { initialValues: any, tabCode: string }) {
    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ conversationSchema }
            onSubmit={ (values) => {
                console.log('SUBMIT', values);
                alert('Submitted! Check console for output.');
            } }
            validateOnBlur
            validateOnChange
            enableReinitialize
        >
            <Form noValidate>
                <FormController tabCode={ tabCode }/>
                <AllTabs/>
            </Form>
        </Formik>
    );
}

export default ConversationForm;