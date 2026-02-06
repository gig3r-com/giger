import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { EnhancedConversationSchema } from './schema';
import { EnhancedConversationType } from '@/types';

export const blankConversation: EnhancedConversationType = {
  id: '',
  title: '',
  participants: [],
  messages: [],
  anonymizedUsers: [],
  gigConversation: false,
}

export default function ConversationFormProvider({ children }: { children: (formik: FormikProps<EnhancedConversationType>) => React.ReactNode }) {
  return (
    <Formik<EnhancedConversationType>
      enableReinitialize
      initialValues={ blankConversation }
      validationSchema={ EnhancedConversationSchema }
      onSubmit={ () => { console.log('Submit') } }
      validateOnChange
    >
      { children }
    </Formik>
  );
}