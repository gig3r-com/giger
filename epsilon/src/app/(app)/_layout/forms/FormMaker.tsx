'use client';

import React, { useMemo, } from 'react';
import { TabType, useFormsStore } from '@/store/formsStore';
import { mapUserToForm, UserForm } from './UserForm';
import { ConversationForm, mapConversationToForm } from './ConversationForm';

type FormMakerProps = {
    tab: TabType
}

export function FormMaker({ tab }: FormMakerProps) {
    const { activeTab, } = useFormsStore();
    const { code, formData, type, data } = tab;

    const { initialValues, Form } = useMemo(() => {
        let initialValues = {};
        let Form = null;

        if (!tab) return { initialValues, Form };
        if (activeTab !== code) return { initialValues, Form };

        if (type === 'user') {
            initialValues = formData ? formData : mapUserToForm(data as User);
            console.log({ initialValues, data })
            Form = UserForm;
        }

        if (type === 'conversation') {
            initialValues = formData ? formData : mapConversationToForm(data as Conversation);
            Form = ConversationForm;
        }

        return { initialValues, Form };
    }, [tab, activeTab]);

    if (!Form) return null;

    return (
        <Form initialValues={ initialValues } tabCode={code} />
    );
}

export default FormMaker;
