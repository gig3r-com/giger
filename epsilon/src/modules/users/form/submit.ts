import { FormikHelpers } from 'formik';
import { UserFormValues } from './types';

type SubmitTarget = UserFormValues['submitting'];

export default async function submit(
  values: UserFormValues,
  helpers: FormikHelpers<UserFormValues>
) {
  const { setSubmitting, setFieldError, resetForm, setFieldTouched, setFieldValue } = helpers;
  const { submitting, id } = values;
  if (!submitting || !id) return;
  setSubmitting(true);

  try {
    switch (submitting as SubmitTarget) {
      case 'name': return makeSubmitField('name');
      case 'surname': return makeSubmitField('surname');
      case 'typePublic': return makeSubmitField('userTypes', 'typePublic');
      case 'factionRankActual': return makeSubmitField('factionRank', 'factionRankActual');
      case 'privateRecords': return makeSubmitRecords('privateRecords', mapPrivateRecord);
    }
  } catch (err: { message: string }) {
    const message = err?.message ?? 'Failed to save';
    if (submitting === 'name') setFieldError('name', message);
    throw err;
  } finally {
    setFieldValue('submitting', null, false)
      .then(() => { setSubmitting(false); })
      .catch(() => { throw new Error(`Error resetting after submitting`); });

  }

  async function makeSubmitField(apiName: string, formName?: string) {
    const fieldName = formName ?? apiName;
    await fetch(`/api/users/${id}/${apiName}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values[fieldName] ?? ''),
    });
    resetForm({ values: { ...values, submitting: null, }, });
    setFieldTouched(fieldName, false, false)
      .then(() => { setSubmitting(false); })
      .catch(() => { throw new Error(`Error resetting after submitting ${fieldName}`); });
  }

  async function makeSubmitRecords(fieldName: string, mapper) {
    const records = values[fieldName] ?? [];
    await fetch(`/api/users/${id}/${fieldName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(records.filter(r => !r._removed).map(mapper)),
    });
    resetForm({ values: { ...values, submitting: null, }, });
    setFieldTouched(fieldName, false, false)
      .then(() => { setSubmitting(false); })
      .catch(() => { throw new Error(`Error resetting after submitting ${fieldName}`); });
  }
}

function mapPrivateRecord(record) {
  return {
    id: record.id,
    isRevealed: true,
    description: record.description,
    title: record.title,
    recordType: 'PRIVATE_RECORD',
  }
}