import React from 'react';
import { Form, Formik } from 'formik';
import { Box } from '@mui/material';
import { Input, Segment } from '../inputs';
import { initialValues } from './initialValues';
import { plotSchema } from './schema';

export function PlotForm() {
    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ plotSchema }
            onSubmit={ (values) => {
                console.log('SUBMIT', values);
                alert('Submitted! Check console for output.');
            } }
            validateOnBlur
            validateOnChange
            enableReinitialize
        >
            <Form>
                <PlotFormContent />
            </Form>
        </Formik>
    );
}

function PlotFormContent() {
    return (
        <Segment>
            <Input name="name" label="Name" />
            <Input name="description" label="Description" multiline minRows={ 10 } />
            <Input name="users" label="Users" />
        </Segment>
    )
}

export default PlotForm;