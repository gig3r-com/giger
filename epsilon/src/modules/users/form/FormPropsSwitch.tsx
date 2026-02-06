import { useEffect } from 'react';
import { useFormikContext } from 'formik';

interface FormPropsSwitchProps { loading: boolean }

function FormPropsSwitch({ loading }: FormPropsSwitchProps) {
  const { isSubmitting, setSubmitting } = useFormikContext();

  useEffect(() => {
    const next = Boolean(loading || isSubmitting);
    if (next !== isSubmitting) setSubmitting(next);
  }, [loading, isSubmitting, setSubmitting]);

  return null;
}

export default FormPropsSwitch;
