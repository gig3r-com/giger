import * as Yup from 'yup';
import { UserFormValues } from './types';

export const initialValues: UserFormValues = {
  submitting: null,
  submittingRecord: null,

  id: crypto.randomUUID(),

  // Profile
  handle: '',
  name: '',
}

export const schema = Yup.object({
  // Profile
  handle: Yup.string().trim().required('Handle is required'),
  name: Yup.string().trim(),
});
